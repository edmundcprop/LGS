import { NextResponse } from "next/server";
import {
  appendClick,
  listRecent,
  type WhatsAppCartItem,
  type WhatsAppClickEntry,
} from "@/lib/whatsappLog";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

function clipString(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.slice(0, max);
}

function clipCart(value: unknown): WhatsAppCartItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.slice(0, 50).map((raw) => {
    const item = raw as Partial<WhatsAppCartItem>;
    return {
      id: clipString(item.id, 200),
      name: clipString(item.name, 200),
      category: clipString(item.category, 100),
      tenure: clipString(item.tenure, 50),
      careTier: clipString(item.careTier, 50),
      price: typeof item.price === "number" ? item.price : undefined,
    };
  });
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
  const data = (raw ?? {}) as Record<string, unknown>;

  const pathname = clipString(data.pathname, 500);
  if (!pathname) {
    return NextResponse.json({ error: "pathname required" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  const entry: WhatsAppClickEntry = {
    ts: new Date().toISOString(),
    source: clipString(data.source, 32) ?? "unknown",
    pathname,
    pageUrl: clipString(data.pageUrl, 1000) ?? "",
    message: clipString(data.message, 2000) ?? "",
    productName: clipString(data.productName, 200),
    cart: clipCart(data.cart),
    value: typeof data.value === "number" ? data.value : undefined,
    hasEmail: typeof data.hasEmail === "boolean" ? data.hasEmail : undefined,
    hasLocation:
      typeof data.hasLocation === "boolean" ? data.hasLocation : undefined,
    email: clipString(data.email, 200),
    name: clipString(data.name, 200),
    phone: clipString(data.phone, 50),
    location: clipString(data.location, 200),
    gclid: clipString(data.gclid, 200),
    userAgent: userAgent.slice(0, 500),
    referer: referer.slice(0, 1000),
  };

  await appendClick(entry);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;

  const url = new URL(req.url);
  const limitParam = parseInt(url.searchParams.get("limit") ?? "200", 10);
  const limit = Math.min(Number.isFinite(limitParam) ? limitParam : 200, 500);
  const entries = await listRecent(limit);
  return NextResponse.json({ entries });
}
