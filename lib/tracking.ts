export const DEFAULT_GTM_ID = "GTM-K7G8ZKWJ";
export const DEFAULT_GA4_ID = "G-0Y7P3Y7VMW";
export const GOOGLE_ADS_ID = "AW-11230310270";
export const WHATSAPP_CONVERSION_LABEL = "AW-11230310270/sTKZCNrD6qUZEP7eg-sp";

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
  window.gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION_LABEL });
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
