export const DEFAULT_GTM_ID = "GTM-K7G8ZKWJ";
export const DEFAULT_GA4_ID = "G-0Y7P3Y7VMW";
export const GOOGLE_ADS_ID = "AW-11230310270";
export const LG_SUBSCRIBE_WHATSAPP_EVENT = "whatsapp_lgsubscribe_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingEnv = {
  [key: string]: string | undefined;
};

type LeadItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  item_variant: string;
  care_tier: string;
  price: number;
};

type GenerateLeadEventInput = {
  monthlyValue: number;
  outrightValue: number;
  items: LeadItem[];
  hasEmail: boolean;
  hasLocation: boolean;
};

export function getGtmId(env: TrackingEnv = process.env): string {
  const configuredId = env.NEXT_PUBLIC_GTM_ID?.trim();
  return configuredId || DEFAULT_GTM_ID;
}

export function getGa4Id(env: TrackingEnv = process.env): string {
  const configuredId = env.NEXT_PUBLIC_GA4_ID?.trim();
  return configuredId || DEFAULT_GA4_ID;
}

export function fireWhatsAppConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", LG_SUBSCRIBE_WHATSAPP_EVENT, {
    event_category: "lead",
    event_label: "whatsapp",
  });
}

type WhatsAppLogPayload = {
  source: "anchor" | "form" | string;
  pathname?: string;
  message?: string;
  productName?: string;
  email?: string;
  name?: string;
  phone?: string;
  location?: string;
  cart?: Array<{
    id?: string;
    name?: string;
    category?: string;
    tenure?: string;
    careTier?: string;
    price?: number;
  }>;
  value?: number;
  hasEmail?: boolean;
  hasLocation?: boolean;
};

/**
 * Best-effort POST of a WhatsApp click/intent record to /api/whatsapp-log.
 * Uses sendBeacon so the request survives the page transition that opens
 * WhatsApp; falls back to keepalive fetch.
 */
export function logWhatsAppClick(payload: WhatsAppLogPayload): void {
  if (typeof window === "undefined") return;
  const enriched = {
    ...payload,
    pathname: payload.pathname ?? window.location.pathname,
    pageUrl: window.location.href,
    gclid:
      new URLSearchParams(window.location.search).get("gclid") ?? undefined,
  };
  const body = JSON.stringify(enriched);
  // Trailing slash matches next.config.mjs trailingSlash:true to avoid the
  // 308 redirect on POST (some browsers/sendBeacon implementations drop the
  // body on redirect).
  const url = "/api/whatsapp-log/";

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch {
    // sendBeacon unavailable or threw — fall through to fetch
  }

  try {
    void fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    });
  } catch {
    // best-effort only
  }
}

export function buildGenerateLeadEvent({
  monthlyValue,
  outrightValue,
  items,
  hasEmail,
  hasLocation,
}: GenerateLeadEventInput) {
  return {
    event: "generate_lead",
    lead_method: "whatsapp",
    lead_destination: "whatsapp",
    currency: "MYR",
    value: monthlyValue + outrightValue,
    value_monthly: monthlyValue,
    value_outright: outrightValue,
    items,
    item_count: items.length,
    has_email: hasEmail,
    has_location: hasLocation,
  };
}
