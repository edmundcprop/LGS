# LG Subscribe — Google Ads Re-Strategy v2
**Date:** 2026-05-06 · **Launch:** 2026-05-07 · **Budget:** MYR 5,000/mo (~MYR 165/day) · **Channels:** Google Search + Performance Max (phased)

---

## What's different from v1

| Dimension | v1 plan | v2 plan |
|---|---|---|
| Monthly budget | MYR 3,000 (~100/day) | **MYR 5,000 (~165/day)** |
| Channels | Search only | **Search + PMax (phased)** |
| Campaign count | 3 (consolidated) | **5 (keep your existing structure)** |
| Geo targeting | "Malaysia, Presence" only | **Tiered by city with bid adjustments** |
| PMax | Paused indefinitely | **Re-enabled at week 3, fed with conversion data** |

Everything else — the keywords, the responsive search ads, the negative keyword list, the Mon-Sun 09:00–18:00 schedule, the WhatsApp 1 conversion as the primary KPI — carries forward unchanged.

---

## 1. Campaign Overview

**Campaign name:** *LG Subscribe Search + PMax Relaunch — May 2026*

**Summary:** Reactivate 5 search campaigns at higher budget, layered with tiered geo bidding (premium urban areas bid up, rural bid down), then re-introduce Performance Max in week 3 once Search has produced 30+ conversions to feed PMax with real audience signals.

**Primary objective:** **80–120 WhatsApp lead conversions** in 30 days at a target cost-per-lead of **MYR 35–55**.

**Sub-targets:**
- Week 1: 15+ conversions (Search only, learning phase)
- Week 2: 30+ cumulative conversions (Search only, smart bidding kicks in)
- Week 3–4: 50+ additional conversions (Search + PMax fed with conversion data)

---

## 2. Channel Strategy & Budget Split

### Phase 1 — Search-only learning (Week 1, 2026-05-07 to 2026-05-13)

| Campaign | Daily | Monthly equivalent | Why |
|---|---|---|---|
| LG Subscribe Brand | MYR 25 | MYR 750 | Branded, lowest CPA |
| Water Purifier Subscribe | MYR 60 | MYR 1,800 | Highest expected ROI |
| Air Purifier And Haze | MYR 25 | MYR 750 | Seasonal demand (haze, allergies) |
| Air Conditioner Subscribe | MYR 25 | MYR 750 | Big-ticket, qualifies leads well |
| Appliance Subscription Malaysia | MYR 30 | MYR 900 | Catch-all for washing machine, TV |
| **Search total** | **MYR 165/day** | **MYR 4,950/mo** | All daily budget on Search until learning baseline is real |

### Phase 2 — Search + PMax (Week 3 onward, from 2026-05-21)

Trigger condition for entering Phase 2: **at least 30 cumulative WhatsApp conversions** confirmed in Google Ads Conversions report. If we hit it earlier, advance early. If we hit week 3 with fewer, hold Phase 1 another week.

| Campaign | Daily | Monthly | Notes |
|---|---|---|---|
| LG Subscribe Brand | MYR 20 | 600 | -5/day vs Phase 1 |
| Water Purifier Subscribe | MYR 45 | 1,350 | Slightly trimmed |
| Air Purifier And Haze | MYR 18 | 540 | Trimmed |
| Air Conditioner Subscribe | MYR 18 | 540 | Trimmed |
| Appliance Subscription Malaysia | MYR 22 | 660 | Trimmed |
| **Search subtotal** | MYR 123/day | 3,690 | |
| Performance Max — LG Subscribe | MYR 42 | 1,260 | Re-enabled, with audience signals |
| **Total** | **MYR 165/day** | **MYR 4,950/mo** | Same total spend, redistributed |

### PMax setup spec (when re-enabled in Week 3)

- **Single campaign:** "LG Subscribe — PMax (audience-signal seeded)"
- **Conversion goal:** WhatsApp 1 (only — don't add secondary goals that dilute optimization)
- **Final URL expansion:** ON (let it pick best landing page from your domain)
- **Audience signals:** seed with your **converting search terms from Week 1–2** (export the Search Terms report, take the terms with ≥1 WhatsApp conversion, feed them as keyword signals)
- **Asset groups:** 2 — one focused on water purifier, one on general appliance subscription
- **Brand exclusions:** add competitor brand terms (Coway, Cuckoo, Wells, Unilever Pureit) to brand exclusions so PMax doesn't poach competitor searchers cheaply
- **Geo targeting:** same tiered structure as Search (see Section 3)

---

## 3. Geo Targeting Strategy (NEW)

Last month, every ringgit was spent at the same bid regardless of location. With MYR 165/day, we have enough room to bid up where conversion intent is highest and bid down where it isn't.

### Tier A — Bid +25% (premium metro)

These are condo-dense, higher-income areas where LG Subscribe pricing fits and where you can install/service quickly.

- Kuala Lumpur (all neighborhoods)
- Selangor — Petaling Jaya, Subang Jaya, Shah Alam, Damansara, Bangsar, Mont Kiara, Cheras, Ampang, Puchong, Kajang
- Putrajaya
- Cyberjaya
- Penang Island — Georgetown, Bayan Lepas, Tanjung Tokong, Gelugor
- Johor Bahru — Iskandar Puteri, Skudai, Permas Jaya, Mount Austin

### Tier B — Bid +0% (standard)

Solid markets, average bid.

- Selangor — Klang, Kuala Selangor, Hulu Langat (rest)
- Negeri Sembilan — Seremban, Nilai
- Melaka — Melaka City, Ayer Keroh
- Perak — Ipoh
- Penang — mainland Penang (Butterworth, Bukit Mertajam)
- Sabah — Kota Kinabalu (city only)
- Sarawak — Kuching (city only)

### Tier C — Bid −40% or exclude entirely

Either rural (low subscription intent) or you can't service well from KL.

- All of Kelantan and Terengganu (pause/exclude — religious/cultural reasons aside, conversion rates on subscription products are historically low here)
- East Malaysia outside KK/Kuching cities
- Pahang — Kuantan only at standard bid; rest of Pahang excluded
- Kedah, Perlis — Tier B with bid −20% (lower urgency)

### How to set this up in Google Ads UI

For each campaign:
1. Open the campaign → **Settings** → **Locations**
2. Remove the existing "Malaysia" target
3. Click "Enter another location" and add each Tier A city individually — these become specific geo targets
4. Add Tier B cities individually as well
5. After saving, go to **Locations** in the left menu inside the campaign
6. For each Tier A city row, click the bid adjustment column → set **+25%**
7. For Tier C cities you want to keep but limit, set **−40%**
8. For excluded areas (Kelantan, Terengganu, etc.), use **Excluded locations** — type each state name and click "Exclude"

---

## 4. Updated Success Metrics

Higher budget = higher absolute targets. Cost-per-lead should not get worse just because budget went up.

| Metric | v1 target | v2 target | Source |
|---|---|---|---|
| WhatsApp conversions (30 days) | 60–100 | **80–120** | Google Ads Conversions |
| Cost per WhatsApp lead | MYR 25–40 | **MYR 35–55** | Conv / Spend (slightly higher band given PMax noise) |
| Avg CTR per Search campaign | ≥8% | ≥8% | Campaigns view |
| Brand campaign CPA | ≤MYR 15 | ≤MYR 18 | Filter conv by Brand campaign |
| Tier A geo conversion rate | n/a | ≥1.8× Tier B baseline | Locations report |
| PMax conversions (Week 3–4 only) | n/a | 20+ in 14 days | Once enabled |
| Search Lost IS (budget) on Brand | <30% | **<15%** | Auction Insights (with bigger budget, Brand should never be capped) |

**Reporting cadence:** daily 5-min check on Conversions during Week 1, weekly Monday review thereafter, full monthly review on the 1st.

---

## 5. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **PMax cannibalizes Brand at low CPA** — PMax steals branded traffic Search would have won cheaply | Add brand keywords as "brand exclusions" in PMax campaign settings (locks PMax out of brand terms) |
| **Tier A geo bid +25% drives CPC above value** | After 7 days, check Tier A actual CPA vs Tier B. If Tier A CPA is more than 1.4× Tier B CPA, drop the bid adjustment to +10% |
| **Higher daily budget burns faster on bad search terms** | Aggressive Search Terms review on day 1 and day 3 of Phase 1 — add negatives same-day |
| **PMax re-enabled too early** before 30 conv banked → repeats last month's MYR 1,928 leak | Hard gate: do NOT enable PMax until Conversions report shows 30+ in last 30 days. No exceptions |
| **East Malaysia exclusion misses real demand** | Run a test: at end of Week 2, temporarily un-exclude Sabah/Sarawak for 3 days and check actual conversion rate. If positive, add KK and Kuching back as Tier B |

---

## 6. Implementation — Today's Action List

In order, with time estimates:

**(1) Pause-and-fix the 5 existing campaigns ~ 30 min.** Open each campaign in Google Ads. For each: keep paused for now → Settings → Locations → remove "Malaysia" → add Tier A and Tier B cities individually → save. Don't set bid adjustments yet (we'll do that after a baseline week).

**(2) Update budgets per Phase 1 table above ~ 5 min.** For each campaign: Settings → Budget → set the new daily amount (25, 60, 25, 25, 30).

**(3) Verify the 5 campaigns are structurally complete ~ 15 min.** For each campaign, confirm: at least one ad group, ad group has the keywords from your manual setup doc, ad group has at least one enabled RSA, campaign has the negative keyword list attached. If any of these are missing, fix them in the UI before Step 4. *Don't run the script again — manual is faster at this point.*

**(4) Verify WhatsApp 1 conversion fires ~ 5 min.** Open `https://www.lg-puricare.com.my` in incognito → click any WhatsApp button → wait 30 min → check Google Ads → Tools → Conversions → WhatsApp 1 row should show count incremented.

**(5) Enable all 5 campaigns ~ 2 min.** Click each green status circle to Active. Confirm start date is 2026-05-07.

**(6) PMax stays paused.** Don't touch PMax this week. Calendar reminder for 2026-05-21 to revisit.

**Total time today: ~1 hour.**

---

## 7. Decision Calendar

| Date | Decision |
|---|---|
| **2026-05-07 11:00** | Quick spot-check: all 5 campaigns getting impressions? |
| **2026-05-08 EOD** | Search Terms review #1 — add negatives |
| **2026-05-11** | Week 1 read — which campaign has the best cost-per-lead? |
| **2026-05-13** | If any campaign has ≥10 conversions, switch IT to Maximize Conversions bidding |
| **2026-05-14** | Apply tiered geo bid adjustments (+25% Tier A, etc.) based on Locations report |
| **2026-05-20** | Phase 2 Go/No-Go: ≥30 cumulative conversions? If yes, set up PMax for next-day launch. If no, hold Phase 1 another week |
| **2026-05-21** | Phase 2 launch — PMax goes live with audience signals from Week 1–2 converting terms |
| **2026-06-01** | Full monthly review — full report, decide June budget |

---

## 8. What this plan deliberately does NOT do

To keep this focused (you said "rethink budget level" — not the whole approach):

- **Keywords stay phrase/exact only.** No reverting to broad match. The 12.78% Search CTR last month proved phrase/exact is finding the right people; we just couldn't measure it.
- **Ad copy stays as drafted.** Headlines and descriptions in your manual setup doc are unchanged.
- **No Meta, no TikTok, no YouTube ads.** You said "google ads only" — respected.
- **No new landing page work.** Existing `/lg-subscribe/`, `/water-purifier/`, `/air-purifier/`, `/air-conditioner/` URLs continue to be the destinations.
- **No ad scheduling change.** Mon-Sun 09:00–18:00 stays.
