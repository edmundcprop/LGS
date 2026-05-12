import fs from "fs";
import path from "path";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "cms";

// Known CMS dataset keys. Each maps to data/<key>.json in the repo.
export type StoreKey =
  | "posts"
  | "products"
  | "comparisons"
  | "categories"
  | "homepage"
  | "site"
  | "users";

type BlobStore = ReturnType<typeof getStore>;

// getStore throws synchronously if Blobs context is unavailable (local
// `next dev` without `netlify dev`). In Netlify Functions / Next runtime
// the SDK auto-discovers credentials, so a successful call here is the
// reliable signal that we are running on Netlify. The previous
// `process.env.NETLIFY === "true"` gate was unreliable in the Next.js
// adapter runtime and caused writes to fall back to `fs.writeFileSync`
// on the read-only Lambda filesystem, returning 500 for every admin write.
function tryGetStore(): BlobStore | null {
  try {
    return getStore(STORE_NAME);
  } catch {
    return null;
  }
}

function localPath(key: StoreKey): string {
  return path.join(process.cwd(), "data", `${key}.json`);
}

function readLocal<T>(key: StoreKey): T {
  return JSON.parse(fs.readFileSync(localPath(key), "utf-8")) as T;
}

function writeLocal<T>(key: StoreKey, data: T): void {
  fs.writeFileSync(localPath(key), JSON.stringify(data, null, 2), "utf-8");
}

export async function readData<T>(key: StoreKey): Promise<T> {
  const store = tryGetStore();
  if (!store) return readLocal<T>(key);

  const existing = (await store.get(key, { type: "json" })) as T | null;
  if (existing !== null && existing !== undefined) return existing;

  // First read after deploy: seed blob from the committed JSON.
  const seed = readLocal<T>(key);
  await store.setJSON(key, seed);
  return seed;
}

export async function writeData<T>(key: StoreKey, data: T): Promise<void> {
  const store = tryGetStore();
  if (!store) {
    writeLocal<T>(key, data);
    return;
  }

  await store.setJSON(key, data);
  // Await the rebuild trigger so the request doesn't finish before the
  // POST to the build hook completes. Netlify functions can terminate
  // immediately on response, which would drop a fire-and-forget fetch.
  await triggerRebuild();
}

async function triggerRebuild(): Promise<void> {
  const url = process.env.NETLIFY_BUILD_HOOK_URL;
  if (!url) return;
  try {
    await fetch(url, { method: "POST" });
  } catch (err) {
    console.error("Build hook trigger failed:", err);
  }
}
