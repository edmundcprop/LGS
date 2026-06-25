# LG Subscribe — Category Popularity Audit

**Date:** 2026-06-25
**Status:** Pre-launch (site not yet live on lgsubscribe.co; DNS propagating)
**GA4 property:** `G-KJDZCLBFYG`
**GTM container:** `GTM-K7G8ZKWJ`
**Tracking allowed hosts:** `lgsubscribe.co`, `www.lgsubscribe.co` (localhost/dev hosts intentionally do NOT fire events — see [lib/tracking.ts](../lib/tracking.ts:5))

## Executive Summary

**There is no GA4 historical data to rank categories against today.** The site has not yet served real users. Ranking categories now would be guesswork dressed up as data.

What this audit delivers instead:

1. A **clean GA4 event schema** for category/product engagement
2. **Implementation of the four missing events** (`category_click`, `product_card_click`, `product_detail_view`, `lead_form_submit`)
3. A **"New on LG Subscribe" framework** so new categories (Soundbars) don't get pushed to the top blindly
4. A **ranking table template** to be re-run weekly once data accumulates

## Current Category Ranking (Baseline)

| # | Category | Slug | Position | Source of Ranking |
|---|---|---|---|---|
| 1 | Televisions | `televisions` | 1 | LG MY catalog order (placeholder — no GA data) |
| 2 | Washer & Dryers | `washer-dryers` | 2 | LG MY catalog order |
| 3 | Refrigerators | `refrigerators` | 3 | LG MY catalog order |
| 4 | Dishwashers | `dishwashers` | 4 | LG MY catalog order |
| 5 | Water Purifiers | `water-purifiers` | 5 | LG MY catalog order |
| 6 | Air Purifiers | `air-purifiers` | 6 | LG MY catalog order |
| 7 | Air Conditioners | `air-conditioners` | 7 | LG MY catalog order |
| 8 | Dehumidifiers | `dehumidifiers` | 8 | LG MY catalog order |
| 9 | Vacuum Cleaners | `vacuums` | 9 | LG MY catalog order |
| 10 | Microwaves | `microwaves` | 10 | LG MY catalog order |
| 11 | Styler | `styler` | 11 | LG MY catalog order |
| 12 | Monitors | `monitors` | 12 | LG MY catalog order |
| 13 | Audio (XBOOM) | `audio` | 13 | LG MY catalog order |
| 14 | Massage Chairs | `massage-chairs` | 14 | LG MY catalog order |
| 🆕 | **Soundbars** | `soundbars` | New section (bottom) | `isNew: true` — held out of main ranking |

## Tracking Gaps Found

| Event | Status Before | Status After | Wired Into |
|---|---|---|---|
| `page_view` | ✅ Implemented | ✅ Unchanged | All pages via `fireGa4PageView` |
| `whatsapp_lgsubscribe_click` | ✅ Implemented | ✅ Unchanged | WhatsApp FAB, enquire form |
| `generate_lead` | ✅ Implemented | ✅ Unchanged | Enquire form submit |
| **`category_click`** | ❌ Missing | ✅ Added | Homepage category grid via `TrackedLink` |
| **`product_card_click`** | ❌ Missing | ✅ Added | Homepage featured products via `TrackedLink` |
| **`product_detail_view`** | ❌ Missing | ✅ Added | Product detail page via `ProductDetailViewTracker` |
| **`lead_form_submit`** | ❌ Missing | ✅ Added | Enquire form (fires alongside `generate_lead`) |

## Event Schema

### `category_click`
```
{
  category_name: string,
  category_slug: string,
  source_page: "home" | "products" | "header",
  cta_location: "home_category_grid" | "products_filter_bar" | ...
}
```

### `product_card_click`
```
{
  product_name: string,
  model_number: string,
  category_slug: string,
  page_path: string,
  cta_location: "home_featured" | "products_grid" | "related_products",
  subscription_price: number | undefined
}
```

### `product_detail_view`
```
{
  product_name: string,
  model_number: string,
  category_slug: string,
  page_path: string,
  subscription_price: number | undefined
}
```

### `lead_form_submit`
```
{
  item_count: number,
  value_monthly: number,
  value_outright: number,
  currency: "MYR",
  categories: string,   // comma-separated category slugs
  source_page: "enquire"
}
```

## Ranking Algorithm (to apply once data exists)

```
Priority Score =
    (category_click count)        × 1
  + (product_detail_view count)   × 2
  + (whatsapp_click count)        × 5
  + (lead_form_submit count)      × 8
```

Override rules:

- A category flagged `isNew: true` is **never** ranked above categories with ≥ 30 days of data, regardless of score. It sits in a "New on LG Subscribe" tray at the bottom of the homepage grid.
- A category with high clicks but lead-form-submit rate < 0.5% gets flagged "UX review needed" instead of being ranked first — high traffic with no conversion signals a fit problem.
- A category with low clicks but lead-form-submit rate > 5% is flagged "promote" — small audience converting well deserves more featured slots.

## Ranking Table Template (to fill in weekly)

| Category | URL | Pos (now) | `category_click` | `product_card_click` | `product_detail_view` | `whatsapp_click` | `lead_form_submit` | Conv. Rate | Priority Score | Pos (proposed) | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Televisions | `/products/televisions` | 1 | — | — | — | — | — | — | — | — | No data yet |
| Washer & Dryers | `/products/washer-dryers` | 2 | — | — | — | — | — | — | — | — | No data yet |
| Refrigerators | `/products/refrigerators` | 3 | — | — | — | — | — | — | — | — | No data yet |
| Dishwashers | `/products/dishwashers` | 4 | — | — | — | — | — | — | — | — | No data yet |
| Water Purifiers | `/products/water-purifiers` | 5 | — | — | — | — | — | — | — | — | No data yet |
| Air Purifiers | `/products/air-purifiers` | 6 | — | — | — | — | — | — | — | — | No data yet |
| Air Conditioners | `/products/air-conditioners` | 7 | — | — | — | — | — | — | — | — | No data yet |
| Dehumidifiers | `/products/dehumidifiers` | 8 | — | — | — | — | — | — | — | — | No data yet |
| Vacuum Cleaners | `/products/vacuums` | 9 | — | — | — | — | — | — | — | — | No data yet |
| Microwaves | `/products/microwaves` | 10 | — | — | — | — | — | — | — | — | No data yet |
| Styler | `/products/styler` | 11 | — | — | — | — | — | — | — | — | No data yet |
| Monitors | `/products/monitors` | 12 | — | — | — | — | — | — | — | — | No data yet |
| Audio | `/products/audio` | 13 | — | — | — | — | — | — | — | — | No data yet |
| Massage Chairs | `/products/massage-chairs` | 14 | — | — | — | — | — | — | — | — | No data yet |
| **Soundbars** | `/products/soundbars` | New | — | — | — | — | — | — | — | Held in "New" tray | **`isNew: true`** — exclude from main ranking until 30 days of data |

## Categories Currently Flagged as "New"

| Category | Reason | Position Rule |
|---|---|---|
| Soundbars | Added 2026-06-25 from LG MY scan, no traffic yet | Held in "New on LG Subscribe" tray at bottom of homepage grid until 30 days of GA data |

## Recommended Next Steps

1. **Launch site on lgsubscribe.co** (DNS propagation completes)
2. **Verify events in GA4 DebugView** — open homepage on the live domain with `?gtm_debug=1` and confirm `category_click`, `product_card_click`, `product_detail_view`, `lead_form_submit` fire with correct parameters
3. **Mark events as "Conversions"** in GA4 Admin → Events: `lead_form_submit`, `whatsapp_lgsubscribe_click` should be flagged conversions
4. **Wait 30 days** for meaningful sample, then re-run this audit with real numbers and apply the priority-score reorder via `data/categories.json`
5. **Wire `category_click` into the `/products` page filter bar and the header menu** (currently only homepage grid is wired — out of scope this round)

## Files Touched This Round

- [lib/tracking.ts](../lib/tracking.ts) — added `fireCategoryClick`, `fireProductCardClick`, `fireProductDetailView`, `fireLeadFormSubmit`
- [components/TrackedLink.tsx](../components/TrackedLink.tsx) — new client wrapper
- [components/ProductDetailViewTracker.tsx](../components/ProductDetailViewTracker.tsx) — new client mount-effect tracker
- [app/page.tsx](../app/page.tsx) — homepage category grid + featured products use `TrackedLink`; "New" badge + sort-to-bottom for `isNew` categories
- [app/products/[category]/[slug]/page.tsx](../app/products/[category]/[slug]/page.tsx) — mounts `ProductDetailViewTracker`
- [app/enquire/page.tsx](../app/enquire/page.tsx) — fires `lead_form_submit` alongside `generate_lead`
- [data/categories.json](../data/categories.json) — added `soundbars` with `isNew: true`
- [lib/products.ts](../lib/products.ts) — `Category` type gains optional `isNew`
