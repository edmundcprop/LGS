import { getStore } from "@netlify/blobs";

const STORE = "whatsapp-clicks";

export type WhatsAppCartItem = {
  id?: string;
  name?: string;
  category?: string;
  tenure?: string;
  careTier?: string;
  price?: number;
};

export type WhatsAppClickEntry = {
  /** ISO timestamp set server-side */
  ts: string;
  /** "anchor" (any wa.me link) | "form" (enquire submit) | future sources */
  source: string;
  pathname: string;
  pageUrl: string;
  /** The text that was prefilled into WhatsApp */
  message: string;
  productName?: string;
  cart?: WhatsAppCartItem[];
  value?: number;
  hasEmail?: boolean;
  hasLocation?: boolean;
  /** Form-only: contact details when user submitted /enquire */
  email?: string;
  name?: string;
  phone?: string;
  location?: string;
  userAgent?: string;
  referer?: string;
  gclid?: string;
};

export type AppendResult = {
  wrote: boolean;
  key?: string;
  readBack?: boolean;
  error?: string;
};

export async function appendClick(
  entry: WhatsAppClickEntry,
): Promise<AppendResult> {
  // getStore throws synchronously if Blobs context is unavailable (local
  // `next dev` without `netlify dev`). In production Functions/Next runtime
  // the SDK auto-discovers credentials, so we don't need an env-var gate.
  let store;
  try {
    store = getStore(STORE);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("[whatsapp-log] Blobs unavailable, skipping write:", message);
    return { wrote: false, error: message };
  }

  try {
    const random = Math.random().toString(36).slice(2, 8);
    const key = `${entry.ts}-${random}`;
    await store.setJSON(key, entry);
    return { wrote: true, key };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[whatsapp-log] setJSON failed:", message);
    return { wrote: false, error: message };
  }
}

export async function listRecent(limit = 100): Promise<WhatsAppClickEntry[]> {
  let store;
  try {
    store = getStore(STORE);
  } catch {
    return [];
  }

  try {
    const { blobs } = await store.list();
    const recent = blobs
      .sort((a, b) => b.key.localeCompare(a.key))
      .slice(0, limit);
    const entries = await Promise.all(
      recent.map(
        async (b) =>
          (await store.get(b.key, { type: "json" })) as
            | WhatsAppClickEntry
            | null,
      ),
    );
    return entries.filter((e): e is WhatsAppClickEntry => Boolean(e));
  } catch (err) {
    console.error("[whatsapp-log] list failed:", err);
    return [];
  }
}
