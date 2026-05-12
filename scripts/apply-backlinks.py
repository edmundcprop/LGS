#!/usr/bin/env python3
"""Add SEO backlinks from key existing posts to the relevant new posts.

For each (existing_slug, [new_slug…]) pair, append the new related-reading
bullet(s) at the BOTTOM of the existing post's `## Related reading` section
(just before `## Next step`). The existing post keeps its current 3 links
and gains 1–2 fresh ones at the end.

Runs locally on data/posts.json + data/posts-new.json sync, then publishes
each modified existing post through the live API.
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error

POSTS_PATH = os.path.join("data", "posts.json")

# (existing_slug, [(new_slug, new_title)])
BACKLINKS = [
    (
        "best-aircond-malaysia-2026",
        [
            ("lg-vs-daikin-aircond-malaysia", "LG vs Daikin Aircond Malaysia"),
            ("lg-aircond-servicing-schedule-malaysia", "LG Aircond Servicing Schedule for Malaysia's Climate"),
        ],
    ),
    (
        "best-washing-machine-malaysia-2026",
        [
            ("lg-vs-samsung-washing-machine-malaysia", "LG vs Samsung Washing Machine Malaysia"),
            ("lg-washtower-laundry-workflow-malaysia", "LG WashTower Laundry Day Workflow"),
        ],
    ),
    (
        "best-fridge-malaysia-2026",
        [
            ("lg-vs-panasonic-fridge-malaysia", "LG vs Panasonic Fridge Malaysia"),
            ("lg-instaview-fridge-organisation-malaysia", "LG InstaView Fridge Organisation for Malaysian Kitchens"),
        ],
    ),
    (
        "best-water-purifier-malaysia-2026",
        [
            ("lg-puricare-vs-coway-water-purifier-malaysia", "LG PuriCare vs Coway Water Purifier Malaysia"),
        ],
    ),
    (
        "best-tv-malaysia-2026",
        [
            ("lg-smart-monitor-wfh-condo-malaysia", "LG Smart Monitor for WFH + Casual TV in Small Malaysian Condos"),
        ],
    ),
    (
        "best-air-purifier-malaysia-2026",
        [
            ("lg-air-purifier-filter-maintenance-malaysia", "How to Clean & Maintain LG Air Purifier Filters in Malaysia"),
            ("lg-appliances-pet-owner-malaysia", "The Pet Owner's Complete LG Appliance Setup"),
        ],
    ),
    (
        "new-home-appliance-checklist-malaysia-2026",
        [
            ("lg-appliances-condo-malaysia", "Small Condo, Big Appliances: What Actually Fits"),
            ("lg-subscribe-family-monthly-cost-malaysia", "Family of 4: Monthly Cost of a Full LG Subscribe Kitchen + Laundry"),
        ],
    ),
    (
        "haze-season-malaysia-2026-indoor-air-protection",
        [
            ("dehumidifier-malaysia-guide", "Dehumidifier Guide for Malaysian Homes"),
            ("lg-styler-malaysia-humidity-haze", "LG Styler in Malaysia: Steam Wardrobe for Humidity, Haze and Curry Smells"),
        ],
    ),
    (
        "air-purifier-asthma-allergies-malaysia",
        [
            ("lg-air-purifier-filter-maintenance-malaysia", "How to Clean & Maintain LG Air Purifier Filters in Malaysia"),
        ],
    ),
    (
        "aircond-running-cost-tnb-bill-malaysia",
        [
            ("lg-aircond-servicing-schedule-malaysia", "LG Aircond Servicing Schedule for Malaysia's Climate"),
        ],
    ),
]

BASE_URL = "https://lgsubscribe.co"
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")


def login():
    if not ADMIN_PASSWORD:
        print("ADMIN_PASSWORD env var required", file=sys.stderr)
        sys.exit(1)
    body = json.dumps({"username": "admin", "password": ADMIN_PASSWORD}).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/api/auth/login/",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        if resp.status != 200:
            print(f"login failed {resp.status}", file=sys.stderr)
            sys.exit(1)
        sc = resp.headers.get_all("Set-Cookie") or []
        cookies = {}
        for entry in sc:
            pair = entry.split(";", 1)[0]
            if "=" in pair:
                k, v = pair.split("=", 1)
                cookies[k.strip()] = v.strip()
        if "cms_token" not in cookies:
            print("no cms_token cookie", file=sys.stderr)
            sys.exit(1)
        return cookies


def put_post(cookies, slug, payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/api/posts/{slug}/",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Cookie": f"cms_token={cookies['cms_token']}",
        },
        method="PUT",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status


def main():
    with open(POSTS_PATH, "r", encoding="utf-8") as f:
        posts = json.load(f)
    by_slug = {p["slug"]: p for p in posts}

    cookies = login()
    print("logged in")

    updated = 0
    for existing_slug, new_links in BACKLINKS:
        p = by_slug.get(existing_slug)
        if not p:
            print(f"  skip {existing_slug} — not found")
            continue
        body = p["body"]
        if "## Related reading" not in body or "## Next step" not in body:
            print(f"  skip {existing_slug} — non-standard structure")
            continue

        # Inject new bullets just before `## Next step`, but only if not already linked
        idx = body.find("## Next step")
        before, next_step = body[:idx], body[idx:]
        to_add = []
        for new_slug, new_title in new_links:
            link_line = f"- [{new_title}](/blog/{new_slug}/)"
            if link_line in body:
                continue
            to_add.append(link_line)
        if not to_add:
            print(f"  skip {existing_slug} — links already present")
            continue
        # Strip trailing whitespace from `before`, append, restore the spacing
        new_body = before.rstrip() + "\n" + "\n".join(to_add) + "\n\n" + next_step
        p["body"] = new_body

        # PUT to live
        try:
            status = put_post(cookies, existing_slug, {"body": new_body})
        except urllib.error.HTTPError as e:
            print(f"  ERROR {existing_slug}: HTTP {e.code}")
            continue
        if status not in (200, 201):
            print(f"  ERROR {existing_slug}: status {status}")
            continue
        updated += 1
        print(f"  updated {existing_slug} (+{len(to_add)} links)")
        # Throttle to avoid the same read-modify-write race we saw earlier
        time.sleep(6)

    # Save merged local file
    with open(POSTS_PATH, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    print(f"updated {updated} existing posts locally + on live site")


if __name__ == "__main__":
    main()
