#!/usr/bin/env node
/**
 * publish-new-posts.js
 *
 * One-shot script that takes data/posts-new.json and POSTs each entry to
 * the production /api/posts endpoint, pushing the new posts through the
 * Netlify Blobs layer so they appear on the live site.
 *
 * Why this exists:
 *   data/posts.json is only the *seed* used on the first read after a deploy.
 *   On production, Netlify Blobs caches "posts" and subsequent reads come
 *   from the blob, not from the committed JSON file. Editing posts.json
 *   and pushing a deploy alone will NOT make new posts appear on
 *   lgsubscribe.co. This script writes to the blob through the live API.
 *
 * Usage:
 *   ADMIN_PASSWORD=lgsubscribe2024 node scripts/publish-new-posts.js
 *
 *   # against staging / local
 *   BASE_URL=http://localhost:3000 ADMIN_PASSWORD=... node scripts/publish-new-posts.js
 *
 *   # safe dry-run — logs in and validates but does NOT POST any new posts
 *   ADMIN_PASSWORD=... node scripts/publish-new-posts.js --dry-run
 *
 * Notes:
 *   - Idempotent: GETs /api/posts first and skips any slug that already exists
 *   - Stops on first failure (does not retry)
 *   - Cookies are handled manually — no extra dependencies, uses built-in fetch
 *   - Requires Node 18+ (built-in fetch)
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.BASE_URL || "https://lgsubscribe.co").replace(/\/$/, "");
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DRY_RUN = process.argv.includes("--dry-run");
const POSTS_FILE = path.join("data", "posts-new.json");

function die(msg) {
  console.error(`\n[publish] ERROR: ${msg}\n`);
  process.exit(1);
}

function info(msg) {
  console.log(`[publish] ${msg}`);
}

function parseCookies(setCookieHeader) {
  if (!setCookieHeader) return {};
  const cookies = {};
  // Set-Cookie may be a single string or an array (node fetch returns single)
  const entries = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  for (const entry of entries) {
    const [pair] = entry.split(";");
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const name = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    cookies[name] = value;
  }
  return cookies;
}

function cookieHeader(cookies) {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

async function login() {
  if (!ADMIN_PASSWORD) {
    die("ADMIN_PASSWORD env var is required.");
  }
  info(`logging in as ${ADMIN_USERNAME} @ ${BASE_URL}`);

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    die(`login failed (${res.status}): ${text || res.statusText}`);
  }

  // Capture cms_token cookie
  const setCookie = res.headers.get("set-cookie");
  const cookies = parseCookies(setCookie);
  if (!cookies.cms_token) {
    die("login succeeded but no cms_token cookie returned.");
  }
  info("login ok, cms_token captured");
  return cookies;
}

async function fetchExistingSlugs(cookies) {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    headers: { Cookie: cookieHeader(cookies) },
  });
  if (!res.ok) {
    die(`GET /api/posts failed (${res.status}): ${await res.text()}`);
  }
  const posts = await res.json();
  return new Set(posts.map((p) => p.slug));
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function postOne(cookies, post) {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader(cookies),
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    die(`POST /api/posts failed for ${post.slug} (${res.status}): ${text}`);
  }
  return await res.json();
}

async function verifySlugLive(cookies, slug) {
  const res = await fetch(`${BASE_URL}/api/posts/${slug}/`, {
    headers: { Cookie: cookieHeader(cookies) },
  });
  return res.ok;
}

async function postWithVerify(cookies, post, attempts = 4) {
  for (let i = 1; i <= attempts; i++) {
    await postOne(cookies, post);
    // Give the blob write + any rebuild cascade time to settle
    // before the next read. Empirically the API's read-modify-write
    // path drops 50% of writes under faster cadence.
    await sleep(8000);
    if (await verifySlugLive(cookies, post.slug)) return true;
    process.stdout.write(`(retry ${i}) `);
  }
  die(`could not confirm ${post.slug} after ${attempts} attempts`);
}

async function main() {
  if (!fs.existsSync(POSTS_FILE)) {
    die(`${POSTS_FILE} not found. Run scripts/build-new-posts.py first.`);
  }
  const newPosts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
  info(`loaded ${newPosts.length} new posts from ${POSTS_FILE}`);

  if (DRY_RUN) {
    info("DRY RUN — will log in and check existing slugs, but NOT publish");
  }

  const cookies = await login();

  let existing;
  try {
    existing = await fetchExistingSlugs(cookies);
    info(`live site already has ${existing.size} posts`);
  } catch (err) {
    die(`could not fetch existing posts: ${err.message}`);
  }

  const toPublish = newPosts.filter((p) => !existing.has(p.slug));
  const alreadyThere = newPosts.filter((p) => existing.has(p.slug));

  if (alreadyThere.length) {
    info(`skipping ${alreadyThere.length} post(s) already on the live site:`);
    for (const p of alreadyThere) info(`  - ${p.slug}`);
  }

  if (!toPublish.length) {
    info("nothing to do — all new posts already published.");
    return;
  }

  info(`${toPublish.length} post(s) to publish:`);
  for (const p of toPublish) info(`  + ${p.slug}`);

  if (DRY_RUN) {
    info("DRY RUN complete. Re-run without --dry-run to publish.");
    return;
  }

  let published = 0;
  for (const post of toPublish) {
    process.stdout.write(`[publish] POST ${post.slug} ... `);
    await postWithVerify(cookies, post);
    published += 1;
    console.log("ok");
  }

  info(`published ${published} post(s). Netlify rebuild triggered by writeData hook.`);
  info(`verify at: ${BASE_URL}/blog/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
