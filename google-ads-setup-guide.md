# Google Ads — Complete Setup Guide
**Account:** lg-puricare.com.my · **Launch:** 2026-05-07 · **Budget:** MYR 5,000/mo · **Channels:** Google Search (5 campaigns) + later PMax

This is the only doc you need. Follow it top to bottom. Estimated total time: **~90 minutes**.

---

## Phase 0 — Pre-flight verification (DO THIS FIRST)

### Step 0.1 — Verify WhatsApp 1 conversion fires

**Why first:** Every bidding decision in this plan assumes conversions are being tracked. If they're not, you're flying blind. This takes 5 minutes.

1. Open `https://www.lg-puricare.com.my` in a Chrome **incognito** window (mobile or desktop)
2. Scroll to any WhatsApp button (floating button at bottom-right, or any "Chat on WhatsApp" CTA)
3. **Click it once** — you don't need to actually send a message, just trigger the click event
4. Wait 30 minutes
5. Open Google Ads → **Tools** (wrench icon, top right) → **Conversions** → click on **WhatsApp 1**
6. Look at the **All conv. (last 7 days)** column — if it incremented by 1, you're good

**If the count did NOT increment:** STOP. Do not launch tomorrow. The conversion tag isn't firing. Likely fixes are in your Google Tag Manager container `GTM-K7G8ZKWJ` — the WhatsApp click trigger may need adjustment. Reply with a screenshot of the Conversions page and we'll debug.

### Step 0.2 — Confirm GA4 is also firing

We installed GA4 (`G-0Y7P3Y7VMW`) into the site code earlier. While testing the WhatsApp click in Step 0.1, also verify GA4:

1. Open [analytics.google.com](https://analytics.google.com) → your LG Subscribe property → **Reports** → **Realtime**
2. You should see your incognito session as 1 active user
3. The "Event count by event name" panel should show events like `page_view`, `session_start`, and ideally a custom WhatsApp click event

**If no Realtime data:** GA4 isn't installed correctly. Check that the changes to `app/layout.tsx` and `lib/tracking.ts` were committed and Netlify has deployed.

---

## Phase 1 — Account-level one-time setup (~25 minutes)

These are configured once and apply across all campaigns. Do them before touching individual campaigns.

### Step 1.1 — Set a value on the WhatsApp 1 conversion

1. Tools → **Conversions** → click **WhatsApp 1**
2. Click **Edit settings**
3. Find **Value** section → choose **"Use the same value for each conversion"**
4. Enter `400` (Malaysian ringgit — this is a conservative estimate for the lifetime value of a converting WhatsApp lead)
5. Save

This single change unlocks value-based Smart Bidding later.

### Step 1.2 — Build/update the shared negative keyword list

Apply once, propagate to all 5 campaigns.

1. Tools → **Shared library** → **Exclusion lists** → click **Negative keyword lists**
2. If a list named `LG Subscribe Lead Quality Negatives 2026` already exists, click into it. Otherwise click **+** to create one with that name
3. Click **Add negative keywords** → paste this entire block, **set match type to Phrase match for the whole batch**:

```
agent commission
career
job
internship
vacancy
hiring
salary
manual
user manual
pdf
download
how to fix
troubleshooting
error code
remote control
filter replacement only
spare part
parts
repair
service center
warranty claim
hotline
complaint
customer service
contact number
head office
free
used
second hand
cheap used
car
phone
review
youtube
specification
price list
coway
cuckoo
wells
pureit
unilever pureit
bibo
diamond
panasonic water purifier
philips water purifier
mitsubishi water purifier
joven water purifier
aircond service
aircond review
aircond promotion
water purifier review
water purifier comparison
```

4. Save
5. Click **Apply to campaigns** → check all 5 campaigns (LG Subscribe Brand, Water Purifier Subscribe, Air Purifier And Haze, Air Conditioner Subscribe, Appliance Subscription Malaysia) → Save

This applies once and saves you adding 47 negatives × 5 campaigns = 235 manual entries.

### Step 1.3 — Build account-level ad extensions (also called "Assets")

Set these at the **account level** so all 5 campaigns automatically inherit them. ~15 minutes.

#### Sitelinks (4 total)

Tools → **Shared library** → **Account-level assets** → **Sitelinks** → **+**

| Sitelink text | Description line 1 | Description line 2 | Final URL |
|---|---|---|---|
| Water Purifier Plans | Hot, cold, tankless | WhatsApp for advice | `https://www.lg-puricare.com.my/water-purifier/` |
| Air Purifier | For haze, allergies | Bedroom, family, pets | `https://www.lg-puricare.com.my/air-purifier/` |
| Air Conditioner | Inverter LG | 1HP, 1.5HP, 2HP plans | `https://www.lg-puricare.com.my/air-conditioner/` |
| How LG Subscribe Works | No upfront payment | Maintenance included | `https://www.lg-puricare.com.my/how-it-works/` |

(If `/how-it-works/` doesn't exist on your site, point it to `/lg-subscribe/` instead.)

#### Callouts (8 total)

Tools → **Shared library** → **Account-level assets** → **Callouts** → **+**, paste each on a new line:

```
No Upfront Payment
Maintenance Included
5-7 Year Coverage
WhatsApp Consultation
Malaysia Service Team
Own After Contract
Premium LG Quality
Flexible Monthly Plans
```

#### Structured snippets (1 set)

Tools → **Shared library** → **Account-level assets** → **Structured snippets** → **+**

- Header: **Brands**
- Values: `ATOM U, ATOM V, PuriCare 360, Aero Tower, ArtCool, InstaView`

#### Call extension (1)

Tools → **Shared library** → **Account-level assets** → **Calls** → **+**

- Country: Malaysia
- Phone number: your WhatsApp business number in international format (e.g., `+60 12 345 6789`)
- Show on: **Mobile only**
- Schedule: same hours as your campaign schedule (see Step 2.5 below)

---

## Phase 2 — Per-campaign setup (~50 minutes total, ~10 min per campaign × 5)

Do this for **each** of your 5 existing campaigns. The walkthrough below uses **LG Subscribe Brand** as the example — repeat with the values from the reference table further down for the other 4.

### Step 2.0 — Pause the campaign before editing

In your Campaigns view, click the green status circle next to the campaign name → **Pause**. Editing a paused campaign is faster — Google Ads doesn't try to validate every change in real time.

### Step 2.1 — Set the daily budget

1. Click into the campaign → **Settings**
2. Expand **Budget**
3. Set **Daily budget** to the value from the reference table (e.g., MYR 25 for Brand)
4. Save

### Step 2.2 — Set bidding strategy

Still in Settings:

1. Expand **Bidding**
2. "What do you want to focus on?" → **Clicks**
3. Sub-option: **Maximize clicks**
4. **Set a maximum CPC bid limit** → leave UNCHECKED for the first 7 days
5. Save

(After Week 1 if you have ≥10 conversions in this campaign, switch to **Maximize Conversions**. After Week 3 with 50+ total account conversions, switch to **Target CPA** at MYR 35.)

### Step 2.3 — Set locations (geo targeting)

1. Expand **Locations**
2. **Remove** any existing locations (including just "Malaysia")
3. Click **Enter another location** and add each of these as separate targets:

**Tier A (target):**
```
Kuala Lumpur, Malaysia
Petaling Jaya, Selangor, Malaysia
Subang Jaya, Selangor, Malaysia
Shah Alam, Selangor, Malaysia
Bangsar, Kuala Lumpur, Malaysia
Mont Kiara, Kuala Lumpur, Malaysia
Cheras, Kuala Lumpur, Malaysia
Puchong, Selangor, Malaysia
Damansara, Selangor, Malaysia
Putrajaya, Malaysia
Cyberjaya, Selangor, Malaysia
Penang Island, Penang, Malaysia
George Town, Penang, Malaysia
Bayan Lepas, Penang, Malaysia
Johor Bahru, Johor, Malaysia
Iskandar Puteri, Johor, Malaysia
```

**Tier B (target — broader Malaysia, one entry):**
```
Malaysia
```

(Adding both keeps Malaysia coverage broad while letting us see Tier A performance separately in the Locations report.)

4. **Excluded locations** — click "Enter location to exclude":
```
Kelantan, Malaysia
Terengganu, Malaysia
```

5. **Location options** (small link below the location list):
   - Target: **Presence: People in or regularly in your targeted locations** ✓
   - Exclude: **Presence: People in or regularly in your excluded locations** ✓
   - This stops you paying for clicks from overseas IPs

6. **Bid adjustments:** Leave at 0% for now (per v3 — adjust after 14 days of data, not on launch day)
7. Save

### Step 2.4 — Set languages

1. Expand **Languages**
2. Add: **English**, **Malay (Bahasa Melayu)**, **Chinese (simplified)**, **Chinese (traditional)**
3. Save

### Step 2.5 — Set ad schedule

1. Expand **Ad schedule**
2. Click **+** to add schedule entries. Suggested baseline (adjust if your team hours differ):
   - **Monday** — 09:00 to 18:00
   - **Tuesday** — 09:00 to 18:00
   - **Wednesday** — 09:00 to 18:00
   - **Thursday** — 09:00 to 18:00
   - **Friday** — 09:00 to 18:00
   - **Saturday** — 09:00 to 14:00
   - **Sunday** — paused (no entry = no serving)
3. Save

If your WhatsApp team genuinely answers 24/7 across the week, just add 7 entries 09:00–18:00 Mon-Sun. The principle is: **ads should only serve when someone can respond to a WhatsApp message**.

### Step 2.6 — Set start date

1. Expand **Additional settings** → **Start and end dates**
2. Start date: **2026-05-07**
3. End date: leave empty
4. Save

### Step 2.7 — Verify the ad group, keywords, and ad

Click **Ad groups** in the left submenu inside the campaign.

You should see ONE ad group with the name from the reference table below (e.g., "LG Subscribe Brand"). If you see additional ad groups (like Google's auto-created "Ad group 1"), click their status circle → **Pause**. Don't try to delete — pause is sufficient.

Click into the correct ad group:

**Keywords tab** → **Search keywords** → make sure you see the keyword list from the reference table. If empty or missing, click **+** and paste the keyword block from the table.

**Ads & assets** → **Ads** → make sure you see one **Responsive search ad** with status Enabled. If missing, click **+** → **Responsive search ad** and create one using the headlines, descriptions, and final URL from the reference table.

### Step 2.8 — Apply the negative keyword list

1. Back at campaign level, click **Audiences, keywords, and content** in the left submenu → **Negative keywords**
2. Click **+** → switch to **Use negative keyword list** → check **`LG Subscribe Lead Quality Negatives 2026`** → Save

(If you did Step 1.2 correctly with "Apply to campaigns", this is already done — confirm by viewing the negatives list.)

### Step 2.9 — Re-enable the campaign

Back to campaigns view, click the status circle → **Enable**. The campaign won't actually serve until **2026-05-07** (your start date), so it's safe to enable now.

---

## Reference table — values for each of 5 campaigns

Repeat Steps 2.0–2.9 for each campaign using these values:

### Campaign 1: LG Subscribe Brand

- **Daily budget:** MYR 25
- **Ad group name:** `LG Subscribe Brand`
- **Final URL:** `https://www.lg-puricare.com.my/lg-subscribe/`
- **Keywords (phrase + exact):**
  ```
  [lg subscribe]
  [lg puricare]
  "lg subscribe malaysia"
  "lg subscribe plan"
  "lg puricare subscription"
  "lg appliance subscription"
  "lg rent up"
  "lg rent up malaysia"
  ```
- **RSA Headlines (12):** LG Subscribe Malaysia · No Upfront Payment · Monthly LG Plans · Own LG After Contract · Maintenance Included · Premium LG For Your Home · WhatsApp For Plan Advice · Subscribe To LG Appliances · 5-7 Year Coverage · Upgrade Your Home · LG Appliances Monthly Plan · Ask About Eligibility
- **RSA Descriptions (4):**
  - Enjoy premium LG appliances monthly with no heavy upfront payment.
  - Ask our Malaysia team which LG Subscribe plan fits your home, product needs, and budget.
  - From clean water to cooling and laundry, upgrade your home with LG Subscribe.
  - WhatsApp us for model advice, monthly plan guidance, and next steps.

### Campaign 2: Water Purifier Subscribe

- **Daily budget:** MYR 60
- **Ad group name:** `LG Water Purifier`
- **Final URL:** `https://www.lg-puricare.com.my/water-purifier/`
- **Keywords:**
  ```
  "lg water purifier subscription"
  "water purifier subscription malaysia"
  "water filter subscription malaysia"
  "water purifier monthly plan"
  "hot cold water purifier subscription"
  "tankless water purifier malaysia"
  [lg atom u water purifier]
  [lg atom v water purifier]
  "lg water purifier price"
  "water purifier rental malaysia"
  "water purifier installment malaysia"
  ```
- **RSA Headlines:** LG Water Purifier Plans · Clean Water Monthly Plan · Tankless Water Purifier · No Heavy Upfront Cost · For Malaysian Kitchens · WhatsApp For Best Model · Filter Care Support · Subscribe To LG Water · Hot And Cold Options · Condo And Family Homes · Ask About LG Subscribe · Clean Water Made Simple
- **RSA Descriptions:**
  - Choose an LG water purifier for condo, landed home, or office pantry.
  - Get clean water convenience with LG Subscribe. WhatsApp us for model and plan guidance.
  - Enjoy LG water purifier comfort without a heavy upfront payment.
  - Ask which model suits your kitchen space, family size, and usage.

### Campaign 3: Air Purifier And Haze

- **Daily budget:** MYR 25
- **Ad group name:** `Air Purifier Subscribe`
- **Final URL:** `https://www.lg-puricare.com.my/air-purifier/`
- **Keywords:**
  ```
  "lg air purifier malaysia"
  "air purifier subscription malaysia"
  "air purifier monthly plan"
  "air purifier for haze"
  "air purifier for allergy malaysia"
  "air purifier for bedroom"
  "air purifier for pet hair"
  [lg puricare 360]
  ```
- **RSA Headlines:** LG Air Purifier Subscribe · Cleaner Air At Home · For Haze And Allergies · Bedroom Air Purifier · Pet-Friendly Home Air · Monthly LG Plans · WhatsApp For Advice · Breathe Better Indoors · No Heavy Upfront Cost · For Malaysian Homes · Allergy-Sensitive Homes · Subscribe To Cleaner Air
- **RSA Descriptions:**
  - Make indoor air more comfortable for bedrooms, families, pets, and haze.
  - Subscribe to LG air purifiers with monthly plans and simple WhatsApp guidance.
  - Ask us which LG air purifier suits your room size and lifestyle.
  - A practical upgrade for Malaysian homes concerned about haze, dust, pets, and allergies.

### Campaign 4: Air Conditioner Subscribe

- **Daily budget:** MYR 25
- **Ad group name:** `Air Conditioner Subscribe`
- **Final URL:** `https://www.lg-puricare.com.my/air-conditioner/`
- **Keywords (20 total — phrase + exact mix):**
  ```
  # Long-tail subscription/rental intent (phrase)
  "lg air conditioner subscription"
  "aircon subscription malaysia"
  "air conditioner monthly plan"
  "lg inverter air conditioner malaysia"
  "1hp air conditioner subscription"
  "1.5hp air conditioner subscription"
  "aircond rental malaysia"
  "aircond installment malaysia"

  # Short brand — EXACT match (controlled, no broad expansion)
  [lg aircond]
  [lg aircon]

  # HP-specific shorter — EXACT match
  [1hp aircond]
  [1.5hp aircond]
  [2hp aircond]

  # Inverter & malaysia intent (phrase)
  "lg inverter aircond"
  "lg aircond malaysia"

  # Bahasa Malaysia (most competitors don't target these — local edge)
  "aircond ansuran"
  "ansuran aircond"
  "aircond cicil"
  "sewa aircond"
  "rent aircond"
  ```
- **RSA Headlines:** LG Air Cond Subscription · Cool Rooms Monthly Plan · No Heavy Upfront Cost · WhatsApp For HP Advice · Inverter Air Conditioner · Site Evaluation Guidance · Cool Your Malaysian Home · Subscribe To LG Air Cond · 1HP And 1.5HP Advice · Monthly LG Cooling Plans · Ask About Installation · Comfort Without Big Upfront
- **RSA Descriptions:**
  - Not sure which HP fits your room? WhatsApp us for LG air cond advice.
  - Enjoy a cooler Malaysian home with LG Subscribe monthly plans and installation guidance.
  - Ask about room size, horsepower, installation, and monthly plan options.
  - Upgrade your room cooling without a heavy upfront purchase.

### Campaign 5: Appliance Subscription Malaysia

- **Daily budget:** MYR 30
- **Ad group name:** `Appliance Subscription`
- **Final URL:** `https://www.lg-puricare.com.my/lg-subscribe/`
- **Keywords:**
  ```
  "appliance subscription malaysia"
  "home appliance subscription"
  "electrical appliance subscription"
  "monthly appliance plan"
  "washing machine subscription malaysia"
  "tv subscription malaysia"
  "washer dryer subscription"
  ```
- **RSA Headlines:** Appliance Subscription MY · LG Appliances Monthly Plan · No Heavy Upfront Payment · Subscribe To Home Appliances · Own At End Of Contract · Maintenance Support · WhatsApp For Plan Advice · Upgrade Your Home With LG · Water Air Cooling Laundry · Built For Malaysian Homes · Ask About Eligibility · LG Subscribe Made Simple
- **RSA Descriptions:**
  - Choose LG appliances monthly with support and no heavy upfront.
  - From clean water to cooling, LG Subscribe helps Malaysian homes upgrade.
  - WhatsApp us to compare products, plans, contract duration, and eligibility.
  - A smarter way to enjoy premium LG appliances without buying everything upfront.

---

## Phase 3 — Optional remarketing campaign (~10 min)

Adds MYR 10/day. Highly recommended given last month's 104k engagements. Skip if budget is strict.

### Step 3.1 — Build the audience

1. Tools → **Audience manager** → **Segments** → **+**
2. Type: **Website visitors**
3. Name: `Site visitors no conv 30d`
4. Membership: **Visited any page** AND `Did not match: Conversion = WhatsApp 1` (this requires the "advanced" filter)
5. Duration: **30 days**
6. Save

### Step 3.2 — Create the campaign

1. Campaigns → **+ New campaign** → goal: **Sales** → type: **Display**
2. Name: `LG Subscribe — Remarketing`
3. Locations: same Tier A as Search campaigns
4. Languages: English, Malay, Chinese
5. Daily budget: MYR 10
6. Bidding: **Maximize Conversions**
7. Audience: select `Site visitors no conv 30d`
8. Devices: All
9. Ad creation: re-use any 5–8 strong headlines and 4 descriptions from the LG Subscribe Brand RSA. Add at least 5 images if you have them (LG product photos, lifestyle shots).
10. Final URL: `https://www.lg-puricare.com.my/lg-subscribe/`
11. Set start date: 2026-05-07
12. Save and pause until launch day

---

## Phase 4 — Final pre-launch checklist (~5 min)

Before bed tonight, do these in order:

1. ✅ WhatsApp 1 conversion verified to fire (Step 0.1)
2. ✅ GA4 verified to fire (Step 0.2)
3. ✅ Conversion value set to MYR 400 (Step 1.1)
4. ✅ Negative keyword list contains 47 entries including competitor brands (Step 1.2)
5. ✅ Sitelinks, callouts, structured snippet, call extension all set up at account level (Step 1.3)
6. ✅ All 5 campaigns: budget set, geo targeting set, schedule set, start date 2026-05-07, status Enabled
7. ✅ Each campaign has the correct ad group with keywords + RSA + negative list applied
8. ✅ PMax stays paused (calendar reminder set for 2026-05-21)
9. ✅ (Optional) Remarketing campaign created and paused, ready to launch with main campaigns

---

## Phase 5 — Post-launch routine

### Day 1 (Thu 2026-05-07)
- 11:00 — Spot-check that all 5 campaigns are accruing impressions
- 13:00 — Spot-check WhatsApp 1 conversions counter — first one should appear by lunch if click volume is real
- EOD — Confirm spend is roughly proportional to budget across the 5 campaigns

### Day 2 (Fri 2026-05-08)
- EOD — First Search Terms review. Pull report. Add 2-5 new negatives for any obvious junk (e.g., if you see "lg dishwasher subscription" pulling clicks but you don't sell it as subscription, exclude it)

### Day 5 (Mon 2026-05-11)
- First real performance read. Per-campaign cost-per-conversion. Anything obviously off?

### Day 7 (Wed 2026-05-13)
- For any campaign with ≥10 conversions, switch bidding from Maximize Clicks → Maximize Conversions

### Day 14 (Wed 2026-05-20)
- **PMax decision point.** If trailing-30-day conversion total is ≥50, set up PMax (separate guide if we get there). If <50, hold another week
- Apply geo bid adjustments based on the Locations report

### Day 30 (Sat 2026-06-06)
- Full monthly review. Decide June budget

---

## If something goes wrong

**Campaign showing "Not eligible"** — usually means missing keywords, missing ad, or status mismatch. Click into the campaign → Diagnostics → it tells you exactly which condition is failing.

**Spend much higher than expected on day 1** — pause everything and check Search Terms. Almost always means a phrase-match keyword is matching too broadly. Add aggressive negatives.

**Zero conversions by day 3** — Almost certainly a tracking issue, not an audience issue. Re-do Step 0.1 verification.

**Ads disapproved** — Click the disapproval reason. Most common in Malaysia: trademark issues with "LG" if you don't have written authorization on file with Google. Email Google Ads support with a letter/email from LG Malaysia confirming you're an authorized partner. Until resolved, the campaigns can still serve the unaffected ads.

**Need help?** Save the log/screenshot and ask. Don't try to fix it under time pressure with the campaigns running — pause, fix, resume.
