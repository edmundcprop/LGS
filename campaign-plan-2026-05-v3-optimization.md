# LG Subscribe — v2 Plan Critique & v3 Optimization
**Date:** 2026-05-06 · Reviewing v2 plan against last 30 days data, industry benchmarks, and account state

---

## Executive summary

The v2 plan is directionally right on **budget level, channel mix, and gated PMax re-introduction**. But it has four issues that could undermine results — and roughly six high-impact optimizations that were missing entirely. Below, ordered by what would hurt most if ignored.

---

## Critical fixes (don't launch without these)

### 1. The whole plan rests on unverified conversion tracking

The v2 plan assumes WhatsApp 1 conversion fires correctly. You said it's "Active" but I haven't seen evidence it actually triggers when someone clicks the WhatsApp button on the live site. Every bidding decision, every gate condition (the 30-conversion PMax trigger), every cost-per-lead target — all of it is built on this single assumption.

**Fix:** Before pressing Enable on tomorrow's launch, do a real-world test. Open `lg-puricare.com.my` in an incognito Chrome window on your phone, click any WhatsApp button, then within 30 minutes check Google Ads → Tools → Conversions → WhatsApp 1. If the conversion count incremented by 1, you're safe to launch. If it didn't, **don't launch tomorrow** — fix the tag first, or you're paying for traffic you can't measure. This is non-negotiable.

### 2. Tier A geo bid +25% is a guess, not data

In v2 I assigned Klang Valley, Penang Island, and JB a +25% bid adjustment vs. other Malaysian areas. I have no evidence these areas convert 1.25x better than Tier B. I assumed it.

**Fix:** **Launch all geos at neutral bid (0% adjustment)**. Run for 14 days. Then look at the **Locations** report inside Google Ads — it shows actual conversion rate and cost-per-conversion by city. *Then* apply bid adjustments using real numbers (e.g., if Tier A actually shows 1.4x conversion rate, give it +30%; if it's only 1.1x, give it +5%). Don't optimize blind.

This is the bigger pattern: **set up the structure, then optimize from data**. The plan was trying to optimize before any data existed.

### 3. Last month's 12.78% CTR + 0 conversions is a warning sign, not validation

I framed 12.78% Search CTR as proof the ads were working. That's misleading. High CTR with zero conversions can mean:

- (a) Tracking was broken (most likely, but unconfirmed)
- (b) Clicks landed → bounced → landing page failure
- (c) Clicks reached WhatsApp but no human responded → operational failure
- (d) People clicked driven by curiosity, not intent → broad-match leakage problem

We genuinely don't know which until Week 1 runs with working tracking. If Week 1 produces 3,000 clicks and only 5 conversions, the problem isn't the ads — it's downstream (landing page or response time). The plan should treat Week 1 as a diagnostic, not a learning phase for bidding.

**Fix:** Add a Week 1 review checklist — *click-to-WhatsApp-message rate*. If it's <0.5%, the ads are getting clicks from the wrong people OR the landing page isn't converting them. Different fixes for each.

### 4. PMax 30-conversion gate is too low

PMax learning phase typically needs 50+ conversions in the trailing 30 days for stable optimization. At v2's projected 80–120 conversions in 30 days, hitting 30 by Week 3 is plausible but borderline.

**Fix:** Change the PMax gate to **50 conversions in trailing 30 days**, not 30. If we hit 30 by week 3 but only 50 by week 5, PMax launches week 5 instead. Patience here saves money — under-fed PMax is exactly what burned MYR 1,928 last month.

---

## High-impact optimizations missing from v2

### 5. Attach a monetary value to the WhatsApp 1 conversion

Currently it's a binary count — every WhatsApp click counts as 1, regardless of who's behind it. Smart Bidding with values is dramatically better than Smart Bidding with counts.

**Estimated lead value:** if your average subscription is ~MYR 100/month over a typical 5-year contract, that's MYR 6,000 lifetime revenue. If your WhatsApp lead → subscription close rate is, say, 15%, then average value per WhatsApp lead = ~MYR 900. Use a more conservative MYR 300–500 to start.

**Fix:** Google Ads → Tools → Conversions → WhatsApp 1 → Edit settings → set "Value" = "Use the same value for each conversion" → enter `MYR 400` (or your number). This single change makes Maximize Conversion Value a viable bidding option in Phase 2 and gives PMax much better signal.

### 6. Build a remarketing audience from last month's 104,051 engagements

That's a lot of warm traffic that didn't convert. Most paid plans ignore this gold mine.

**Fix:**
- Google Ads → Audience Manager → Create audience → "All visitors who haven't converted in last 30 days"
- Spin up a small Display retargeting campaign at MYR 10–15/day — separate from the 5 Search campaigns
- Same RSA copy. Final URLs land on `/lg-subscribe/` and `/water-purifier/`
- Outside the v2 budget — this is a +MYR 300/mo addition, but cost-per-conversion on retargeting is typically ¼ of cold Search. Worth it.

If you'd rather stay strict to MYR 5,000/mo, take the MYR 300 from Appliance Subscription Malaysia (the lowest-priority Search campaign).

### 7. Add ad assets (extensions) — 5–15% free CTR lift

V2 has none of these. They're free, take 20 minutes to set up, and Google rewards accounts that use them with better Ad Rank.

**Sitelinks** (4 per campaign, account-level if simpler):
- Water Purifier Plans → `/water-purifier/`
- Air Purifier → `/air-purifier/`
- Air Conditioner → `/air-conditioner/`
- How LG Subscribe Works → `/how-it-works/`

**Callouts** (8 — non-clickable, just reinforces):
- No Upfront Payment
- Maintenance Included
- 5-7 Year Coverage
- WhatsApp Consultation
- Malaysia Service Team
- Own After Contract
- Premium LG Quality
- Flexible Monthly Plans

**Structured snippets** (use "Brands" type):
- ATOM U, ATOM V, PuriCare 360, Aero Tower, ArtCool, InstaView

**Call extension:** Add your WhatsApp business number as a call extension (mobile only)

### 8. Add competitor brand exclusions

V2's negative list doesn't exclude competitor brand searches. Without this, your keyword `"water purifier subscription malaysia"` could match `"coway water purifier subscription malaysia"` and you'd pay for clicks from people searching for a specific competitor.

**Fix — add to your shared negative list (phrase match):**

```
coway
cuckoo
wells
pureit
unilever pureit
bibo
diamond
xeroxe
panasonic water purifier
philips water purifier
mitsubishi
```

These should be **phrase-match negatives** in the shared list, applied to all 5 Search campaigns AND added as **brand exclusions** in PMax when it launches.

### 9. Match ad scheduling to actual team availability, not arbitrary 09:00-18:00

If your WhatsApp response team isn't actually answering on Sunday morning, ads serving on Sunday morning produce clicks that go to dead air → reduced trust + wasted spend.

**Fix:** Tell me what hours you (or whoever responds to WhatsApp) actually staff. I'll redo the schedule to match exactly. As a starting hypothesis if you don't tell me:
- Mon–Fri: 09:00–18:00 (current)
- Sat: 09:00–14:00 (half day)
- Sun: paused entirely

If response is 24/7 across the week (auto-replies + return calls), keep current schedule.

### 10. Day-parting bid adjustments after Week 2

Once we have 14 days of data, the **Hour of day** report will show which hours produce conversions vs. just clicks. Common patterns:
- Lunch break (12:00-13:30) — high click volume, low conversion
- Evening (19:00-22:00) — lower click volume but higher conversion (people shopping at home)
- Late evening WhatsApp clicks but team is offline → low conversion attributed even when ad worked

Adjust bids accordingly. Reserve this optimization for Week 3+, post-data.

---

## Plan changes that are cosmetic, not impactful

### 11. The Tier A/B/C geo split was over-engineered

I listed 25+ specific cities across three tiers. The real signal in city-level reports is much sparser (you'll get conversions from KL, PJ, maybe JB; everything else will look like statistical noise). 

**Simpler:** Two tiers, not three.
- **Bid up:** KL + PJ + Subang + Bangsar + Mont Kiara + Penang Island + JB City
- **Bid neutral or down:** Everywhere else in Malaysia
- **Exclude:** Confirmed-no-service areas only (East Malaysia outside KK/Kuching, plus rural states if your team can't service them)

We'll probably learn the right granularity in 2-3 weeks of data anyway.

### 12. Phrase match isn't strict anymore — call it out

V2 is heavy on phrase match. Google has loosened phrase match significantly since 2021. `"water purifier subscription"` will match `"affordable subscription water purifier service near me"` — close enough — but also possibly `"water purifier maintenance subscription program"` (researchers, not buyers) or `"is water purifier subscription worth it"` (still researching).

**Fix:** Accept that phrase match will leak ~15-25%, which is why daily Search Terms reviews in Week 1 are non-negotiable. Don't pretend phrase match is the strict tool it was 3 years ago.

---

## Revised numbers (v3)

Pulling all this together, here's what changes vs. v2:

| Setting | v2 value | v3 value | Reason |
|---|---|---|---|
| Geo bid adjustments | +25% Tier A at launch | **0% at launch, adjust after 14 days** | Use real data, not guesses |
| PMax conversion gate | 30 in trailing 30d | **50 in trailing 30d** | Match PMax learning needs |
| WhatsApp 1 conversion value | Not set | **MYR 400 estimated** | Enables value-based bidding |
| Remarketing campaign | None | **MYR 10/day Display retargeting** | Recover bounced traffic |
| Ad extensions | None | **Sitelinks + callouts + structured + call** | 5-15% CTR lift, free |
| Competitor negatives | None | **11 brand terms added phrase-match** | Stop paying for competitor traffic |
| Geo tiering | Three tiers, 25+ cities | **Two tiers, simpler** | Avoid over-engineering |
| Ad scheduling | Mon-Sun 09-18 | **TBD — confirm team hours** | Match real response capacity |
| Total monthly budget | MYR 4,950 (Search only Phase 1) | **MYR 5,250** (+MYR 300 retargeting) | Or stay at 5,000 by trimming Appliance |

---

## Updated launch checklist (today)

In strict order — don't skip the verifications:

**(1) Verify WhatsApp 1 conversion fires.** Click WhatsApp button on live site → wait 30 min → confirm count incremented in Conversions report. **Hard gate. No proceed without this.**

**(2) Set conversion value.** Conversions → WhatsApp 1 → Edit → Value = MYR 400 (use as proxy until you know real LTV).

**(3) Build the shared negative list.** Add competitor brands (Coway, Cuckoo, Wells, etc.) in addition to existing 30 negatives. Apply to all 5 Search campaigns.

**(4) Set up ad extensions** (one time, account-level): 4 sitelinks, 8 callouts, 1 structured snippet set, 1 call extension.

**(5) Update budgets per Phase 1 table** in v2 (25 / 60 / 25 / 25 / 30).

**(6) Set geo to "Malaysia, Presence" with NO bid adjustments yet.** Exclude only East Malaysia outside KK + Kuching + Kelantan + Terengganu. Will tier later from data.

**(7) Confirm ad scheduling matches your team hours.** Adjust if needed.

**(8) Do NOT enable PMax.** Calendar reminder for 2026-05-21 to evaluate Phase 2 trigger (50 conv).

**(9) Enable all 5 Search campaigns. Optionally add the retargeting Display campaign at MYR 10/day.**

**Total time today: ~90 minutes** (vs. v2's 60 min — extensions and verification add ~30).

---

## What I'd skip from v2 entirely

- The +25% Tier A bid adjustment at launch (replaced with neutral bids + Week 2 data-driven adjustment)
- The detailed Tier B/C city-by-city breakdown (replaced with simpler two-tier approach)
- The 30-conversion PMax gate (replaced with 50)
- The framing of last month's 12.78% CTR as validation (replaced with "diagnostic, not validation")

What I'd keep from v2 unchanged:
- 5 campaign structure with stated daily budgets per campaign
- Phase 1 / Phase 2 split
- Maximize Clicks → Maximize Conversions bid strategy progression
- Mon-Sun 09:00-18:00 schedule (pending your team hours confirmation)
- Negative keyword list (with the competitor additions above)
