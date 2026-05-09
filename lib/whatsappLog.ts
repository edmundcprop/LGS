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

function onNetlify(): boolean {
  return process.env.NETLIFY === "true";
}

export async function appendClick(entry: WhatsAppClickEntry): Promise<void> {
  if (!onNetlify()) {
    console.log("[whatsapp-log dev]", entry);
    return;
  }
  const store = getStore(STORE);
  const random = Math.random().toString(36).slice(2, 8);
  const key = `${entry.ts}-${random}`;
  await store.setJSON(key, entry);
}

export async function listRecent(limit = 100): Promise<WhatsAppClickEntry[]> {
  if (!onNetlify()) return [];
  const store = getStore(STORE);
  const { blobs } = await store.list();
  // Keys begin with ISO timestamps so lexicographic desc = newest first.
  const recent = blobs
    .sort((a, b) => b.key.localeCompare(a.key))
    .slice(0, limit);
  const entries = await Promise.all(
    recent.map(
      async (b) =>
        (await store.get(b.key, { type: "json" })) as WhatsAppClickEntry | null,
    ),
  );
  return entries.filter((e): e is WhatsAppClickEntry => Boolean(e));
}
