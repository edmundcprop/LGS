# Google Ads Launch Checklist — LG Subscribe

Operational checklist that complements the privacy/tracking work already shipped in code. Items below are configured **inside the Google Ads / GA4 / GTM admin UI**, not in this codebase.

Account: `AW-11230310270` · GA4: `G-0Y7P3Y7VMW` · GTM: `GTM-K7G8ZKWJ`

## 1. Conversions in Google Ads

### 1.1 WhatsApp click conversion (already wired in code)

- **Status:** code fires `gtag('event','conversion',{send_to:'AW-11230310270/sTKZCNrD6qUZEP7eg-sp'})` from every WhatsApp anchor and from the enquire form submit.
- **Verify in Ads UI:** Tools → Conversions → "Whatsapp 1" → status should flip from "No recent conversions" to "Recording conversions" within ~3 hours of first click.
- **Settings to confirm:**
  - Category: `Submit lead form`
  - Count: `One` (one per click, not every click)
  - Click-through window: 30 days
  - View-through window: 1 day
  - Attribution model: `Data-driven` (default for new accounts)

### 1.2 Form-submit conversion (item #8 in original list)

The `/enquire` form pushes `generate_lead` to GTM dataLayer on submit. To turn this into a Google Ads conversion:

1. **Google Ads** → Tools → Conversions → New conversion → Website → "Add conversion manually using code".
2. Name: `Form Submit — Enquire`. Category: `Submit lead form`. Value: leave blank or use dynamic value if needed.
3. Copy the conversion label (format `AW-11230310270/XXXX`).
4. **GTM** → Tags → New →
   - Type: `Google Ads Conversion Tracking`
   - Conversion ID: `11230310270`
   - Conversion Label: paste label from step 3
   - Trigger: New trigger → `Custom Event` → Event name: `generate_lead` → All Custom Events
5. Submit + publish the GTM container.
6. Test on `/enquire` — submit a test lead, then in Google Ads → Tools → Conversions → verify it shows "Recording conversions".

### 1.3 Phone-click conversion (item #9 in original list)

Code now pushes `phone_click` to dataLayer (any `tel:` link site-wide). To turn into a Google Ads conversion, repeat the steps from 1.2 with:
- Name: `Phone Click`. Category: `Phone calls`.
- GTM trigger: Custom Event → Event name: `phone_click`.

### 1.4 Engaged session as secondary conversion (item #10)

1. **GA4** → Admin → Events → ensure `session_start` and `user_engagement` exist (default).
2. GA4 → Admin → Conversions → mark `user_engagement` as a conversion (if available; in GA4 this is now `Key event`).
3. GA4 → Admin → Google Ads links → confirm Ads account `1230310270` is linked.
4. **Google Ads** → Tools → Conversions → New conversion → Import → GA4 → import `user_engagement` as a conversion.
5. Set as **Secondary** in step 2.

## 2. Conversion goal hierarchy (item #11)

Google Ads → Tools → Conversions → Settings → Conversion goals:

| Goal | Type | Examples |
|---|---|---|
| **Primary** (used for bidding) | WhatsApp click + Form submit | "Whatsapp 1", "Form Submit — Enquire" |
| **Secondary** (observation only) | Phone click + Engaged session | "Phone Click", `user_engagement` |

Smart Bidding will only optimise toward Primary goals. Keep Secondary as observation-only.

## 3. Consent verification (item #5)

- **Already correct in code:** `components/ConsentBanner.tsx:30` calls `gtag('consent','update', { ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' })` when user accepts.
- **Manual verification:**
  1. Open https://lgsubscribe.co in Chrome incognito with DevTools → Network → filter `collect|conversion|googleads`.
  2. Pre-accept: you should see only cookieless pings (with `gcs=G100` in the URL = consent denied).
  3. Click Accept on banner.
  4. Click any WhatsApp button → expect a request to `googleads.g.doubleclick.net/pagead/viewthroughconversion/11230310270` with `gcs=G111` (full consent).

## 4. Account safety

### 4.1 Negative keyword lists (item #21)

1. Google Ads → Tools → Shared library → Negative keyword lists → Create list `LG Subscribe Lead Quality Negatives 2026`.
2. Bulk import from `docs/google-search-negative-keywords.txt`.
3. Apply to all Search campaigns (the script `google-ads-setup.js` already references this list name — Google Ads Scripts cannot create lists, only apply them).

### 4.2 Search Partners + Display OFF (item #24)

For each Search campaign:
- Settings → Networks → uncheck **"Include Google search partners"**
- Settings → Networks → uncheck **"Include Google Display Network"**

Why: Display traffic on Search budgets is the single most common cause of wasted RM50–RM100/day on small accounts.

### 4.3 Daily budget overspend alert (item #23)

Google Ads → Tools → Notifications → Custom rule:
- Condition: `Daily cost > 1.5 × daily budget`
- Frequency: every hour
- Action: Email `brandnical@gmail.com`

Or simpler: Google Ads → Reports → Custom alert → "Cost above expected" with threshold 150%.

### 4.4 LG trademark approval (item #25)

Action item — confirm in writing with LG Electronics (Malaysia) Sdn Bhd that authorised reseller status covers:
- Bidding on the keyword `lg` and brand variants (`lg subscribe`, `lg puricare`, `lg aircond`, etc.)
- Using "LG" in headlines and descriptions

Without written confirmation, ads referencing "LG" may be disapproved by Google Ads policy review (trademark complaints from LG Corp.).

## 5. Landing page (items #15, #16, #19)

| Item | Status |
|---|---|
| #15 — `/enquire` pushes `generate_lead` on submit | ✅ verified — `app/enquire/page.tsx:253` |
| #16 — Mobile LCP < 2.5s | ✅ warm-cache TTFB 60–200ms; cold-cache TTFB up to 5s on rare misses. Run https://pagespeed.web.dev/ on `/`, `/products/televisions/`, `/enquire/` for full LCP confirmation |
| #19 — All 4 Sheet 4 final URLs return 200 | ✅ all 200 after CSV updated to use trailing slash (skips Netlify 308 redirect) |

## 6. Privacy / policy compliance (item #18)

- ✅ `/privacy` shipped — PDPA-compliant, identifies Brandnical Home Marketing Enterprise as data controller, lists Google + Meta + LG Electronics (Malaysia) Sdn Bhd as recipients, covers Consent Mode v2 disclosure.
- ✅ `/terms` shipped — governs use of Site, IP, liability cap, Malaysian governing law.
- ✅ Footer links added on every page.
- Google Ads policy review specifically requires: (a) physical/contact address for the advertiser, (b) clear refund/cancellation terms if transactional. We satisfy (a) via email; (b) is N/A because this is a lead-gen site, not a transactional storefront.
