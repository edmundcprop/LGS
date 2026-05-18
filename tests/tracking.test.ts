import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_GTM_ID,
  LG_SUBSCRIBE_WHATSAPP_EVENT,
  buildGenerateLeadEvent,
  fireGa4PageView,
  fireWhatsAppConversion,
  getGa4Id,
  getGtmId,
} from "../lib/tracking.ts";

test("getGtmId prefers NEXT_PUBLIC_GTM_ID when present", () => {
  const gtmId = getGtmId({ NEXT_PUBLIC_GTM_ID: "GTM-TEST123" });
  assert.equal(gtmId, "GTM-TEST123");
});

test("getGtmId falls back to the default GTM id", () => {
  const gtmId = getGtmId({});
  assert.equal(gtmId, DEFAULT_GTM_ID);
});

test("getGa4Id falls back to the default GA4 id", () => {
  const ga4Id = getGa4Id({});
  assert.equal(ga4Id, "G-0Y7P3Y7VMW");
});

test("buildGenerateLeadEvent includes a total value for Google Ads conversion tags", () => {
  const payload = buildGenerateLeadEvent({
    monthlyValue: 180,
    outrightValue: 3200,
    items: [
      {
        item_id: "atom-v-wd518an",
        item_name: "LG PuriCare ATOM-V",
        item_category: "water-purifiers",
        item_variant: "84",
        care_tier: "Self Service",
        price: 70,
      },
    ],
    hasEmail: true,
    hasLocation: false,
  });

  assert.deepEqual(payload, {
    event: "generate_lead",
    lead_method: "whatsapp",
    lead_destination: "whatsapp",
    currency: "MYR",
    value: 3380,
    value_monthly: 180,
    value_outright: 3200,
    items: [
      {
        item_id: "atom-v-wd518an",
        item_name: "LG PuriCare ATOM-V",
        item_category: "water-purifiers",
        item_variant: "84",
        care_tier: "Self Service",
        price: 70,
      },
    ],
    item_count: 1,
    has_email: true,
    has_location: false,
  });
});

test("fireWhatsAppConversion sends the lgsubscribe WhatsApp event", () => {
  const originalWindow = globalThis.window;
  const calls: unknown[][] = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      gtag: (...args: unknown[]) => calls.push(args),
    },
  });

  try {
    fireWhatsAppConversion();
  } finally {
    if (originalWindow === undefined) {
      Reflect.deleteProperty(globalThis, "window");
    } else {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  }

  assert.deepEqual(calls, [
    [
      "event",
      LG_SUBSCRIBE_WHATSAPP_EVENT,
      {
        event_category: "lead",
        event_label: "whatsapp",
      },
    ],
  ]);
});

test("fireGa4PageView sends an explicit GA4 page_view", () => {
  const originalWindow = globalThis.window;
  const calls: unknown[][] = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      gtag: (...args: unknown[]) => calls.push(args),
      location: {
        href: "https://lgsubscribe.co/products/?utm_source=google",
        pathname: "/products/",
        search: "?utm_source=google",
      },
      document: {
        title: "LG Subscribe Products",
      },
    },
  });

  try {
    fireGa4PageView();
  } finally {
    if (originalWindow === undefined) {
      Reflect.deleteProperty(globalThis, "window");
    } else {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  }

  assert.deepEqual(calls, [
    [
      "event",
      "page_view",
      {
        send_to: "G-0Y7P3Y7VMW",
        page_location: "https://lgsubscribe.co/products/?utm_source=google",
        page_path: "/products/?utm_source=google",
        page_title: "LG Subscribe Products",
      },
    ],
  ]);
});
