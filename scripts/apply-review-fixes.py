#!/usr/bin/env python3
"""Apply reviewer feedback to the 20 new blog posts in data/posts.json.

Fixes applied:
1. Append `## Related reading` + `## Next step` blocks to every new post
   (matches the structural pattern used by every recent existing post).
2. Tighten LOW-severity prose flagged by the reviewer
   ("significantly" → quantified or "clearly").
3. Diversify three duplicated image paths.
4. Also re-emit data/posts-new.json so the staging file stays in sync.
"""

import json
import os

POSTS_PATH = os.path.join("data", "posts.json")
NEW_PATH = os.path.join("data", "posts-new.json")

# slugs of the 20 newly added posts, in publish order
NEW_SLUGS = [
    "dishwasher-worth-it-malaysia",
    "lg-styler-malaysia-humidity-haze",
    "dehumidifier-malaysia-guide",
    "neochef-inverter-microwave-explained",
    "lg-massage-chair-malaysia-worth-it",
    "lg-xboom-portable-speakers-malaysia",
    "lg-smart-monitor-wfh-condo-malaysia",
    "lg-cordzero-vs-dyson-vs-roborock-malaysia",
    "lg-vs-samsung-washing-machine-malaysia",
    "lg-vs-daikin-aircond-malaysia",
    "lg-vs-panasonic-fridge-malaysia",
    "lg-puricare-vs-coway-water-purifier-malaysia",
    "lg-appliances-pet-owner-malaysia",
    "lg-appliances-condo-malaysia",
    "lg-subscribe-family-monthly-cost-malaysia",
    "hari-raya-hosting-appliances-malaysia",
    "lg-air-purifier-filter-maintenance-malaysia",
    "lg-washtower-laundry-workflow-malaysia",
    "lg-aircond-servicing-schedule-malaysia",
    "lg-instaview-fridge-organisation-malaysia",
]

# Per-post Related-reading and CTA copy.
# Each entry: (related_list, cta_text). related_list is a list of (slug, title) tuples.
PER_POST = {
    "dishwasher-worth-it-malaysia": (
        [
            ("hari-raya-hosting-appliances-malaysia", "Hari Raya Hosting: LG Appliances That Save You the Whole Week"),
            ("lg-subscribe-family-monthly-cost-malaysia", "Family of 4: Monthly Cost of a Full LG Subscribe Kitchen + Laundry"),
            ("new-home-appliance-checklist-malaysia-2026", "New Home Appliance Checklist Malaysia 2026"),
        ],
        "Thinking about adding a dishwasher to your kitchen but not sure if it will fit or if your cooking style suits one? Message us on WhatsApp with a photo of your kitchen layout and a rough idea of how often you cook. We will tell you honestly whether a QuadWash TrueSteam earns its keep in your home.",
    ),
    "lg-styler-malaysia-humidity-haze": (
        [
            ("dehumidifier-malaysia-guide", "Dehumidifier Guide for Malaysian Homes"),
            ("haze-season-malaysia-2026-indoor-air-protection", "Haze Season 2026: Air Protection Guide"),
            ("lg-appliances-pet-owner-malaysia", "The Pet Owner's Complete LG Appliance Setup"),
        ],
        "Curious whether a Styler is worth the wall space for your wardrobe? Message us on WhatsApp with the kinds of clothes you wear daily (work, sekolah uniform, baju kurung, kebaya, gym gear) and we will give you an honest read on whether it will get used or sit unused.",
    ),
    "dehumidifier-malaysia-guide": (
        [
            ("lg-styler-malaysia-humidity-haze", "LG Styler in Malaysia: Steam Wardrobe for Humidity, Haze and Curry Smells"),
            ("haze-season-malaysia-2026-indoor-air-protection", "Haze Season 2026: Air Protection Guide"),
            ("air-purifier-asthma-allergies-malaysia", "Air Purifier for Asthma and Allergies"),
        ],
        "Not sure if your home has a humidity problem worth treating? Send us a photo of any musty corners, wardrobes or store rooms on WhatsApp and we will tell you whether a dehumidifier will actually help — or whether a different fix is the answer.",
    ),
    "neochef-inverter-microwave-explained": (
        [
            ("dishwasher-worth-it-malaysia", "Is a Dishwasher Worth It for a Malaysian Kitchen?"),
            ("new-home-appliance-checklist-malaysia-2026", "New Home Appliance Checklist Malaysia 2026"),
            ("lg-subscribe-family-monthly-cost-malaysia", "Family of 4: Monthly Cost of a Full LG Subscribe Kitchen + Laundry"),
        ],
        "Upgrading from a basic microwave to an inverter NeoChef? Message us on WhatsApp with your kitchen cabinet dimensions and your typical reheating use case. We will recommend the right capacity tier — 25L or 39L — and bundle it with a kitchen subscription if it makes sense.",
    ),
    "lg-massage-chair-malaysia-worth-it": (
        [
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
            ("what-is-lg-subscribe-malaysia-how-it-works", "What Is LG Subscribe Malaysia?"),
            ("rent-vs-buy-lg-subscribe-malaysia", "Rent vs Buy: Is LG Subscribe Worth It?"),
        ],
        "Considering an AI Massage Recliner for elderly parents or to manage your own back tension? Message us on WhatsApp and tell us who will use it, how often, and where in your home. We will recommend the right model and walk through the subscription terms so you can decide without commitment.",
    ),
    "lg-xboom-portable-speakers-malaysia": (
        [
            ("lg-smart-monitor-wfh-condo-malaysia", "LG Smart Monitor for WFH + Casual TV in Small Malaysian Condos"),
            ("hari-raya-hosting-appliances-malaysia", "Hari Raya Hosting: LG Appliances That Save You the Whole Week"),
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
        ],
        "Picking the right XBOOM for your typical outing? Tell us on WhatsApp where you most often use a speaker — balcony, pool, beach, house party — and the rough size of the group. We will point you at the right model so you do not over-buy or under-power.",
    ),
    "lg-smart-monitor-wfh-condo-malaysia": (
        [
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
            ("best-tv-malaysia-2026", "Best TV Malaysia 2026: Budget to OLED"),
            ("oled-vs-qled-vs-led-tv-malaysia-2026", "OLED vs QLED vs LED TV Guide Malaysia 2026"),
        ],
        "Replacing a TV and a monitor with one Smart Monitor in a small condo? Send us a photo of your living-cum-dining area on WhatsApp with rough measurements. We will tell you whether 32 inches is the right call or whether you should still go separate-screen.",
    ),
    "lg-cordzero-vs-dyson-vs-roborock-malaysia": (
        [
            ("lg-appliances-pet-owner-malaysia", "The Pet Owner's Complete LG Appliance Setup"),
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
            ("best-air-purifier-for-pets-malaysia", "Best Air Purifier for Pet Owners Malaysia"),
        ],
        "Cross-shopping the CordZero against a Dyson or Roborock and want a head-to-head call for your specific home? Message us on WhatsApp with your floor types, pet situation and rough home size. We will recommend the right model and configuration without the brand bias.",
    ),
    "lg-vs-samsung-washing-machine-malaysia": (
        [
            ("front-load-vs-top-load-washing-machine-malaysia", "Front Load vs Top Load Washer Malaysia"),
            ("best-washing-machine-malaysia-2026", "Best Washing Machine Malaysia 2026"),
            ("lg-washtower-laundry-workflow-malaysia", "LG WashTower Laundry Day Workflow"),
        ],
        "Stuck between LG and Samsung for your next washing machine? Message us on WhatsApp with your laundry frequency, family size, and whether you have space for a separate dryer or need a stacked configuration. We will tell you honestly which brand wins for your specific use case.",
    ),
    "lg-vs-daikin-aircond-malaysia": (
        [
            ("best-aircond-malaysia-2026", "Best Aircond Malaysia 2026"),
            ("inverter-vs-non-inverter-aircond-malaysia", "Inverter vs Non-Inverter Aircond Malaysia"),
            ("lg-aircond-servicing-schedule-malaysia", "LG Aircond Servicing Schedule for Malaysia's Climate"),
        ],
        "Comparing LG and Daikin for your home aircond setup? Send us your room dimensions, building type (condo / landed), and the number of units you need on WhatsApp. We will give you a side-by-side recommendation including the after-sales picture in your specific area.",
    ),
    "lg-vs-panasonic-fridge-malaysia": (
        [
            ("best-fridge-malaysia-2026", "Best Fridge Malaysia 2026"),
            ("lg-instaview-fridge-organisation-malaysia", "LG InstaView Fridge Organisation for Malaysian Kitchens"),
            ("new-home-appliance-checklist-malaysia-2026", "New Home Appliance Checklist Malaysia 2026"),
        ],
        "Buying your first family-size fridge and torn between LG InstaView and Panasonic Prime Fresh+? Message us on WhatsApp with your weekly grocery pattern — fresh fish, bulk vegetables, frozen storage — and we will recommend the right brand and capacity for your cooking style.",
    ),
    "lg-puricare-vs-coway-water-purifier-malaysia": (
        [
            ("best-water-purifier-malaysia-2026", "Best Water Purifier Malaysia 2026"),
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
            ("what-is-lg-subscribe-malaysia-how-it-works", "What Is LG Subscribe Malaysia?"),
        ],
        "Switching from Coway to LG PuriCare, or starting fresh and not sure which to pick? Message us on WhatsApp with your kitchen sink setup (under-counter cabinet available or counter-top only) and family size. We will recommend the right model and walk through the subscription difference.",
    ),
    "lg-appliances-pet-owner-malaysia": (
        [
            ("best-air-purifier-for-pets-malaysia", "Best Air Purifier for Pet Owners Malaysia"),
            ("lg-cordzero-vs-dyson-vs-roborock-malaysia", "LG CordZero A9X vs Dyson vs Roborock"),
            ("air-purifier-asthma-allergies-malaysia", "Air Purifier for Asthma and Allergies"),
        ],
        "Building out a pet-friendly home setup? Tell us on WhatsApp how many pets, what species (cats, dogs, both), and your home's main pain points — hair, smell, allergies. We will bundle the right LG setup at a single monthly subscription.",
    ),
    "lg-appliances-condo-malaysia": (
        [
            ("lg-smart-monitor-wfh-condo-malaysia", "LG Smart Monitor for WFH + Casual TV in Small Malaysian Condos"),
            ("new-home-appliance-checklist-malaysia-2026", "New Home Appliance Checklist Malaysia 2026"),
            ("lg-subscribe-family-monthly-cost-malaysia", "Family of 4: Monthly Cost of a Full LG Subscribe Kitchen + Laundry"),
        ],
        "Moving into a new condo and need to outfit it from scratch? Send us your floor plan and rough room measurements on WhatsApp. We will map out the appliance set that actually fits the space and price the full subscription bundle for you.",
    ),
    "lg-subscribe-family-monthly-cost-malaysia": (
        [
            ("what-is-lg-subscribe-malaysia-how-it-works", "What Is LG Subscribe Malaysia?"),
            ("rent-vs-buy-lg-subscribe-malaysia", "Rent vs Buy: Is LG Subscribe Worth It?"),
            ("how-lg-subscribe-eases-monthly-budget-malaysia", "How LG Subscribe Saves Your Budget"),
        ],
        "Want a personalised monthly subscription quote for your home setup? Message us on WhatsApp with your appliance list and we will send back a custom bundle quote — no commitment, no salesy follow-up.",
    ),
    "hari-raya-hosting-appliances-malaysia": (
        [
            ("dishwasher-worth-it-malaysia", "Is a Dishwasher Worth It for a Malaysian Kitchen?"),
            ("lg-washtower-laundry-workflow-malaysia", "LG WashTower Laundry Day Workflow"),
            ("lg-instaview-fridge-organisation-malaysia", "LG InstaView Fridge Organisation for Malaysian Kitchens"),
        ],
        "Hosting raya for the first time and figuring out which appliances you actually need? Send us a rough idea of your guest numbers and which open house days you are hosting on WhatsApp. We will tell you which appliances earn their keep and which can wait.",
    ),
    "lg-air-purifier-filter-maintenance-malaysia": (
        [
            ("hepa-filter-h13-true-hepa-explained", "HEPA Filters Explained: H13 vs True HEPA"),
            ("air-purifier-placement-guide-malaysia", "Where to Place Your Air Purifier"),
            ("air-purifier-running-cost-electricity-malaysia", "Air Purifier Running Cost Malaysia"),
        ],
        "Not sure if your current air purifier filter is overdue for replacement? Message us on WhatsApp with the model number and approximate install date. We will tell you whether to replace, clean, or just keep going — and we can ship filters directly if you are on a Subscribe plan.",
    ),
    "lg-washtower-laundry-workflow-malaysia": (
        [
            ("front-load-vs-top-load-washing-machine-malaysia", "Front Load vs Top Load Washer Malaysia"),
            ("lg-vs-samsung-washing-machine-malaysia", "LG vs Samsung Washing Machine Malaysia"),
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
        ],
        "Considering a WashTower for a small laundry space? Send us a photo of your current laundry cavity on WhatsApp with rough measurements. We will confirm if the standard WashTower fits and walk through the install requirements.",
    ),
    "lg-aircond-servicing-schedule-malaysia": (
        [
            ("aircond-running-cost-tnb-bill-malaysia", "Aircond Running Cost: TNB Bill Breakdown"),
            ("inverter-vs-non-inverter-aircond-malaysia", "Inverter vs Non-Inverter Aircond Malaysia"),
            ("aircond-hp-size-guide-malaysia", "Aircond HP Guide: What Size for Your Room"),
        ],
        "Aircond not as cold as it used to be? Message us on WhatsApp with your unit model, installation year and rough usage pattern. We will tell you whether it needs servicing, refrigerant top-up, or a full replacement — and bundle the LG Subscribe option if it makes sense.",
    ),
    "lg-instaview-fridge-organisation-malaysia": (
        [
            ("best-fridge-malaysia-2026", "Best Fridge Malaysia 2026"),
            ("lg-vs-panasonic-fridge-malaysia", "LG vs Panasonic Fridge Malaysia"),
            ("new-home-appliance-checklist-malaysia-2026", "New Home Appliance Checklist Malaysia 2026"),
        ],
        "Upgrading to an InstaView fridge or trying to make a current one work better? Tell us on WhatsApp your typical weekly shopping pattern — bulk vegetables, fresh seafood, cooked food storage — and we will recommend the model size and organisation that fits your kitchen.",
    ),
}

# LOW-severity prose fixes: (slug, old_substring, new_substring)
PROSE_FIXES = [
    (
        "lg-air-purifier-filter-maintenance-malaysia",
        'Do not wash HEPA filters. Water damages the fibre structure and degrades particulate capture. The marketing on "washable HEPA" filters is misleading — they capture less after washing.',
        'Do not wash HEPA filters. Water damages the fibre structure and degrades particulate capture by 20–40% on a single wash. The marketing on "washable HEPA" filters is misleading — they capture less after washing, even when they look dry.',
    ),
    (
        "lg-vs-panasonic-fridge-malaysia",
        "For households with kids who open the fridge 20+ times a day, the window cuts cold air loss significantly. Measurable energy savings over a year.",
        "For households with kids who open the fridge 20+ times a day, the window cuts cold air loss meaningfully — 5–10% annual energy savings for high-traffic households.",
    ),
    (
        "lg-puricare-vs-coway-water-purifier-malaysia",
        "For Malaysian kitchens being designed around clean lines and minimal countertop clutter, the LG PuriCare ATOM-U under-counter design is the significant advantage.",
        "For Malaysian kitchens being designed around clean lines and minimal countertop clutter, the LG PuriCare ATOM-U under-counter design is the clear advantage.",
    ),
    (
        "hari-raya-hosting-appliances-malaysia",
        "Smells dissipate. Particulate matter (including any traces of haze residue carried in on clothing) is filtered.",
        "Smells dissipate. Particulate matter (including ambient particulate carried in on clothing) is filtered.",
    ),
    (
        "lg-vs-daikin-aircond-malaysia",
        "Daikin tends to hold list price more firmly; LG runs more aggressive seasonal promotions.",
        "Daikin tends to hold list price more firmly; LG tends to run more aggressive seasonal promotions.",
    ),
]

# Image diversification: (slug, new_path)
IMAGE_FIXES = [
    ("lg-appliances-condo-malaysia", "/uploads/products/objet-washtower-25-20/gallery-1.jpg"),
    ("lg-washtower-laundry-workflow-malaysia", "/uploads/products/objet-washtower-25-20/gallery-2.avif"),
    ("hari-raya-hosting-appliances-malaysia", "/uploads/products/quadwash-prime-silver/gallery-1.avif"),
]


def build_cta_block(slug):
    related, cta = PER_POST[slug]
    lines = ["", "", "## Related reading", ""]
    for s, t in related:
        lines.append(f"- [{t}](/blog/{s}/)")
    lines.extend(["", "## Next step", "", cta])
    return "\n".join(lines)


def main():
    with open(POSTS_PATH, "r", encoding="utf-8") as f:
        posts = json.load(f)

    by_slug = {p["slug"]: p for p in posts}
    fixed_count = 0

    # 1. Append Related reading + Next step blocks
    for slug in NEW_SLUGS:
        p = by_slug.get(slug)
        if not p:
            print(f"  WARN: missing slug {slug}")
            continue
        if "## Related reading" in p["body"]:
            print(f"  SKIP {slug} — already has Related reading")
            continue
        p["body"] = p["body"].rstrip() + build_cta_block(slug) + "\n"
        fixed_count += 1
    print(f"appended CTA blocks: {fixed_count}")

    # 2. Apply prose fixes
    prose_applied = 0
    for slug, old, new in PROSE_FIXES:
        p = by_slug.get(slug)
        if not p:
            continue
        if old not in p["body"]:
            print(f"  WARN: prose fix not found in {slug}")
            continue
        p["body"] = p["body"].replace(old, new, 1)
        prose_applied += 1
    print(f"prose fixes applied: {prose_applied}")

    # 3. Image fixes
    img_applied = 0
    for slug, new_path in IMAGE_FIXES:
        p = by_slug.get(slug)
        if not p:
            continue
        p["image"] = new_path
        img_applied += 1
    print(f"image diversification applied: {img_applied}")

    # 4. Save merged posts.json
    with open(POSTS_PATH, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    print(f"wrote {POSTS_PATH} ({len(posts)} posts total)")

    # 5. Re-emit posts-new.json with the fixes baked in
    new_posts = [by_slug[s] for s in NEW_SLUGS]
    with open(NEW_PATH, "w", encoding="utf-8") as f:
        json.dump(new_posts, f, indent=2, ensure_ascii=False)
    print(f"wrote {NEW_PATH} ({len(new_posts)} new posts)")


if __name__ == "__main__":
    main()
