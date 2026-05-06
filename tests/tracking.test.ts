import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_GTM_ID,
  buildGenerateLeadEvent,
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
