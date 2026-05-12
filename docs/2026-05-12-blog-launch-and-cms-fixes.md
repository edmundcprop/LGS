# 2026-05-12 — Blog launch + CMS bug fixes

Session record of the 20-post blog launch and the production CMS bugs uncovered along the way.

## Headline

- 20 new blog posts published to https://lgsubscribe.co/blog/ (28 → 48 total).
- 3 production bugs found and fixed: a broken Netlify env gate that silently killed every admin write, a non-idempotent POST that accumulated duplicates under retry, and an API auth bypass that left the entire CMS open to anyone with a forged cookie.
- Existing posts cross-linked to the new ones to compound SEO value.

## Commits (in order)

| SHA | Message |
|---|---|
| `24fce31` | fix(store): drop NETLIFY env gate, let Blobs SDK auto-detect runtime |
| `cee9de2` | fix(api/posts): make POST upsert by slug (idempotent) |
| `c72442a` | feat(blog): add 20 LG product-relevant posts |
| `a283d86` | chore(google-ads): launch plan, setup docs, 2026-05 campaign drafts |
| `89becff` | fix(api): require valid JWT on all protected route handlers |
| `4ef2298` | chore: gitignore noise, fix Hari Raya date, backlinks + pricing fix |

## Content shipped

20 posts filling coverage gaps the existing 28 posts left behind. Grouped by intent:

**Category-fill (under-covered products):**
- `dishwasher-worth-it-malaysia`
- `lg-styler-malaysia-humidity-haze`
- `dehumidifier-malaysia-guide`
- `neochef-inverter-microwave-explained`
- `lg-massage-chair-malaysia-worth-it`
- `lg-xboom-portable-speakers-malaysia`
- `lg-smart-monitor-wfh-condo-malaysia`
- `lg-cordzero-vs-dyson-vs-roborock-malaysia`

**Brand comparisons (high commercial intent):**
- `lg-vs-samsung-washing-machine-malaysia`
- `lg-vs-daikin-aircond-malaysia`
- `lg-vs-panasonic-fridge-malaysia`
- `lg-puricare-vs-coway-water-purifier-malaysia`

**Use case / lifestyle:**
- `lg-appliances-pet-owner-malaysia`
- `lg-appliances-condo-malaysia`
- `lg-subscribe-family-monthly-cost-malaysia`
- `hari-raya-hosting-appliances-malaysia`

**How-to / maintenance:**
- `lg-air-purifier-filter-maintenance-malaysia`
- `lg-washtower-laundry-workflow-malaysia`
- `lg-aircond-servicing-schedule-malaysia`
- `lg-instaview-fridge-organisation-malaysia`

All 20 use the standard post schema (`slug, title, description, date, readingTime, category, image, excerpt, body`), match the existing voice (tight declarative sentences, TNB 2026 numbers, Malaysia-local references), and end with the standard `## Related reading` + `## Next step` (WhatsApp CTA) blocks.

Body lengths: median ~5,900 chars (≈950 words). Total content: ~19,000 words across 20 bodies.

## Reviewer pass

`general-purpose` agent reviewed all 20 against voice, AI-tells, Malaysia-local accuracy, schema. Verdict: `APPROVE_WITH_MINOR_FIXES`. All HIGH/MEDIUM items fixed:

- HIGH: appended missing `## Related reading` + `## Next step` blocks (matches existing post structure).
- LOW: quantified vague "significantly" / "measurable" claims with numbers.
- LOW: diversified 3 reused product images.
- MEDIUM: subscription pricing table verified against live product API and corrected (see Pricing section below).

## Production bugs found and fixed

### Bug 1: Broken Netlify env gate (`lib/store.ts`)

`onNetlify()` returned `process.env.NETLIFY === "true"`. In the Next.js Functions runtime on Netlify, `process.env.NETLIFY` is not reliably `"true"`, so `writeData` fell back to `fs.writeFileSync` against the read-only Lambda filesystem and every admin write returned 500.

**Impact:** the admin UI's save buttons had been silently broken on production for an unknown period. No admin edits to posts, products, categories, comparisons, homepage, settings, or users actually persisted.

**Fix:** removed the env gate. Probe `getStore()` — successful construction is the reliable runtime signal. Mirrors the recent `fix(whatsapp-log)` commit that fixed the same bug in `lib/whatsappLog.ts`.

### Bug 2: Non-idempotent POST (`app/api/posts/route.ts`)

`POST` handler used `posts.push(body)` unconditionally. Combined with Netlify Blobs read-after-write lag during the `triggerRebuild()` cascade, client retries (necessary because of the lag) caused the same slug to be appended twice.

**Symptoms in the wild:** during the publish run, exactly 50% of posts appeared "missing" on first POST despite returning 201. Subsequent retries created duplicates that then required cleanup via DELETE, which had the same lag issue and over-deleted.

**Fix:** POST is now upsert by slug — `const deduped = posts.filter(p => p.slug !== body.slug); deduped.push(body)`. Self-healing for any historical duplicates the next time a slug is POSTed.

### Bug 3: API auth bypass (`middleware.ts` + every route handler)

Edge middleware only checked that the `cms_token` cookie was present. None of the route handlers (`/api/posts/*`, `/api/products/*`, `/api/comparisons/*`, etc.) called `verifyToken`. So a forged cookie like `cms_token=anything` passed both layers and unlocked the entire CMS API for read and write.

**Fix:** new `requireAuth(req)` helper in `lib/auth.ts`. Applied to every protected handler. Public routes unchanged: `auth/login`, `auth/logout`, `uploads/[filename]`, `whatsapp-log POST` (visitor click logging).

Verified live after deploy:
- forged cookie → 401
- no cookie → 401
- valid JWT → 200
- public endpoints (whatsapp-log POST) → 200

## Data corrections

### Hari Raya post date

`hari-raya-hosting-appliances-malaysia` was originally dated `2026-09-17`. Hari Raya 2026 was ~March 20, so a September post about raya hosting is off-season. Re-dated to `2026-02-10` (pre-Raya prep window).

### Family-of-4 subscription pricing table

Audit against the live `/api/products/` endpoint found one significant error and two minor ones:

| Line | Original | Actual | Action |
|---|---|---|---|
| Air purifier 360° HIT | RM100–150 | RM50 | corrected to "from RM50" |
| WashTower combo top end | RM270 | RM280 (Objet 25/20kg) | range extended to RM210–280 |
| 1.5HP aircond floor | RM100 | RM90 (standard model) | range corrected to RM90–100 |

Total monthly range adjusted from `RM880–1,330` to `roughly RM900–1,200 depending on tier and exact model selection` with a stronger disclaimer to verify against current promotional rates.

## SEO backlinks

10 existing posts updated to link forward to relevant new posts. Builds an internal link graph that compounds the new content's SEO value:

| Existing post | New posts linked |
|---|---|
| `best-aircond-malaysia-2026` | `lg-vs-daikin-aircond-malaysia`, `lg-aircond-servicing-schedule-malaysia` |
| `best-washing-machine-malaysia-2026` | `lg-vs-samsung-washing-machine-malaysia`, `lg-washtower-laundry-workflow-malaysia` |
| `best-fridge-malaysia-2026` | `lg-vs-panasonic-fridge-malaysia`, `lg-instaview-fridge-organisation-malaysia` |
| `best-water-purifier-malaysia-2026` | `lg-puricare-vs-coway-water-purifier-malaysia` |
| `best-tv-malaysia-2026` | `lg-smart-monitor-wfh-condo-malaysia` |
| `best-air-purifier-malaysia-2026` | `lg-air-purifier-filter-maintenance-malaysia`, `lg-appliances-pet-owner-malaysia` |
| `new-home-appliance-checklist-malaysia-2026` | `lg-appliances-condo-malaysia`, `lg-subscribe-family-monthly-cost-malaysia` |
| `haze-season-malaysia-2026-indoor-air-protection` | `dehumidifier-malaysia-guide`, `lg-styler-malaysia-humidity-haze` |
| `air-purifier-asthma-allergies-malaysia` | `lg-air-purifier-filter-maintenance-malaysia` |
| `aircond-running-cost-tnb-bill-malaysia` | `lg-aircond-servicing-schedule-malaysia` |

## Toolchain (lives in `scripts/`)

| Script | Purpose |
|---|---|
| `build-new-posts.py` | Emit `data/posts-new.json` from inline post definitions |
| `apply-review-fixes.py` | Apply reviewer feedback to the new posts (CTA blocks, prose trims, image diversification) |
| `apply-auth-checks.py` | One-shot patcher that adds `requireAuth` to every protected route |
| `apply-backlinks.py` | Insert backlinks from existing posts to new posts, with verify-and-retry |
| `publish-new-posts.js` | Authenticate and POST each new post through `/api/posts` with verify-and-retry |

All scripts handle the Netlify Blobs read-after-write lag by verifying state after each write and retrying as needed.

## Operational notes for future bulk writes

The Netlify Blobs `setJSON` path has a measurable read-after-write window during `triggerRebuild()` cascades — sometimes 5–10 seconds before a write is visible to the next read on the same key. Symptoms:

- POST returns 201 but a follow-up GET shows the old state
- Per-request verify checks return stale data
- Naive sequential retries land twice → duplicates

If you ever build a new workflow that hits CMS write endpoints in bulk:

1. **Throttle** — at least 5–8 seconds between writes on the same key.
2. **Verify** — fetch the slug after each write before moving on.
3. **Rely on the upsert** — POST `/api/posts` is now idempotent by slug; PUTs are by definition. Duplicates from retries no longer accumulate.
4. **Copy the pattern** — `scripts/publish-new-posts.js::postWithVerify` is the reference implementation.

## Housekeeping

- `.gitignore` now excludes `.claude/settings.local.json` (per-machine Claude Code permission allowlist) and Office lockfile patterns (`.~lock.*#`, `~$*`).
- `data/posts.json` is the seed file that loads on the *first* read after a fresh deploy. Once the `posts` blob is populated, subsequent reads come from the blob, not the file. To make the seed authoritative again you would need to clear the blob.

## Left for follow-up

- `Google_Ads_Launch_Plan.xlsx` — currently has a LibreOffice lock; commit when closed.
- Consider deleting the `posts` Netlify Blob to re-seed from the updated `data/posts.json` for a clean slate (optional — current blob state is correct as of this session).
