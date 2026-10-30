#!/usr/bin/env python3
"""
Comprehensive Ahrefs 100/100 Integrity & Snagging Auditor for aminoacidsupplements.co
Strictly verifies:
1. Status & Canonical consistency (og:url == canonical == exact file route with trailing slash)
2. OpenGraph & Twitter tags completeness
3. Titles <= 60 characters & Meta Descriptions <= 160 characters (strict compliance)
4. H1 hierarchy (exactly 1 per page)
5. Images alt attributes
6. Internal links (zero 404s, trailing slash consistency)
7. External partner links (nofollow present)
8. Email obfuscation (preventing Cloudflare cdn-cgi email-protection 404s)
9. JSON-LD Structured Data Schema validity
"""

import os
import sys
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup

BASE_DIR = Path("Sites/peptides/aminoacidsupplements/out")
if not BASE_DIR.exists():
    BASE_DIR = Path("Sites/aminoacidsupplements/out")
if not BASE_DIR.exists():
    BASE_DIR = Path("out")
if not BASE_DIR.exists():
    BASE_DIR = Path("/mnt/d/Jason Local Sites/mediation new/gemini/Sites/peptides/aminoacidsupplements/out")
DOMAIN = "https://aminoacidsupplements.co"

if not BASE_DIR.exists():
    print(f"Error: {BASE_DIR} does not exist. Run build first.")
    sys.exit(1)

html_files = list(BASE_DIR.glob("**/*.html"))
print(f"Found {len(html_files)} HTML files in {BASE_DIR}")

EXCLUDED_FROM_CANONICAL = {"404.html", "404/index.html"}

def file_to_route(filepath):
    rel = filepath.relative_to(BASE_DIR).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        folder = os.path.dirname(rel)
        return f"/{folder}/"
    if rel.endswith(".html"):
        stem = rel[:-5]
        return f"/{stem}/"
    return f"/{rel}/"

all_routes = {file_to_route(f): f for f in html_files}

issues = {
    "broken_internal_links": [],
    "redirect_internal_links": [], # Missing trailing slash
    "canonical_and_og_mismatches": [],
    "missing_og_tags": [],
    "title_issues": [],
    "desc_issues": [],
    "h1_issues": [],
    "missing_image_alts": [],
    "email_protection_risks": [],
    "schema_errors": [],
    "commercial_links_missing_nofollow": []
}

canonical_map = {}
titles = {}
descriptions = {}

for html_file in html_files:
    rel_path = html_file.relative_to(BASE_DIR).as_posix()
    route = file_to_route(html_file)
    is_404_page = rel_path in EXCLUDED_FROM_CANONICAL or "404" in rel_path

    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")

    # 1. Canonical & OG:URL check
    canonical_tag = soup.find("link", rel="canonical")
    og_url_tag = soup.find("meta", property="og:url")

    expected_canonical = f"{DOMAIN}{route}" if route != "/" else f"{DOMAIN}/"

    if not is_404_page:
        if not canonical_tag or not canonical_tag.get("href"):
            issues["canonical_and_og_mismatches"].append(f"[{rel_path}] Missing canonical tag! Expected: {expected_canonical}")
        else:
            canonical_href = canonical_tag["href"]
            if canonical_href != expected_canonical:
                issues["canonical_and_og_mismatches"].append(f"[{rel_path}] Canonical mismatch! Found: '{canonical_href}', Expected: '{expected_canonical}'")
            canonical_map[route] = canonical_href

        if not og_url_tag or not og_url_tag.get("content"):
            issues["canonical_and_og_mismatches"].append(f"[{rel_path}] Missing og:url! Expected: {expected_canonical}")
        else:
            og_url = og_url_tag["content"]
            if og_url != expected_canonical:
                issues["canonical_and_og_mismatches"].append(f"[{rel_path}] OG:URL mismatch with canonical! Found: '{og_url}', Expected: '{expected_canonical}'")

    # 2. OpenGraph and Twitter Completeness
    if not is_404_page:
        required_og = ["og:title", "og:description", "og:image", "og:type", "og:site_name"]
        for prop in required_og:
            tag = soup.find("meta", property=prop)
            if not tag or not tag.get("content"):
                issues["missing_og_tags"].append(f"[{rel_path}] Missing {prop}")

        required_twitter = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]
        for name in required_twitter:
            tag = soup.find("meta", attrs={"name": name})
            if not tag or not tag.get("content"):
                issues["missing_og_tags"].append(f"[{rel_path}] Missing {name}")

    # 3. Title Check (<= 60 characters)
    title_tag = soup.find("title")
    if not title_tag or not title_tag.text.strip():
        issues["title_issues"].append(f"[{rel_path}] Missing <title> tag!")
    else:
        title_text = title_tag.text.strip()
        if len(title_text) < 15:
            issues["title_issues"].append(f"[{rel_path}] Title too short ({len(title_text)} chars): '{title_text}'")
        elif len(title_text) > 60:
            issues["title_issues"].append(f"[{rel_path}] Title too long ({len(title_text)} chars > 60): '{title_text}'")
        if title_text in titles and not is_404_page:
            issues["title_issues"].append(f"[{rel_path}] Duplicate title with {titles[title_text]}: '{title_text}'")
        titles[title_text] = rel_path

    # 4. Description Check (<= 160 characters)
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if not is_404_page:
        if not desc_tag or not desc_tag.get("content", "").strip():
            issues["desc_issues"].append(f"[{rel_path}] Missing meta description!")
        else:
            desc_text = desc_tag["content"].strip()
            if len(desc_text) < 50:
                issues["desc_issues"].append(f"[{rel_path}] Meta description too short ({len(desc_text)} chars < 50): '{desc_text}'")
            elif len(desc_text) > 160:
                issues["desc_issues"].append(f"[{rel_path}] Meta description too long ({len(desc_text)} chars > 160): '{desc_text}'")

    # 5. H1 Tag Check (Exactly 1 per page)
    if not is_404_page:
        h1_tags = soup.find_all("h1")
        if len(h1_tags) == 0:
            issues["h1_issues"].append(f"[{rel_path}] Page has ZERO <h1> tags!")
        elif len(h1_tags) > 1:
            issues["h1_issues"].append(f"[{rel_path}] Page has {len(h1_tags)} <h1> tags (should be exactly 1)!")

    # 6. Images Alt Check
    img_tags = soup.find_all("img")
    for img in img_tags:
        src = img.get("src", "")
        alt = img.get("alt")
        role = img.get("role", "")
        if alt is None and role != "presentation":
            issues["missing_image_alts"].append(f"[{rel_path}] <img> missing alt attribute: src='{src}'")

    # 7. Links Check (Internal & External)
    a_tags = soup.find_all("a", href=True)
    for a in a_tags:
        href = a["href"].strip()
        rel = a.get("rel", [])
        if isinstance(rel, str):
            rel = rel.split()

        # Check for Cloudflare email protection link or raw email exposed
        if "cdn-cgi/l/email-protection" in href:
            issues["email_protection_risks"].append(f"[{rel_path}] Contains Cloudflare email protection link: {href}")

        if href.startswith("mailto:"):
            parent_html = str(a.parent)
            if "<!--email_off-->" not in parent_html and "<!--email_off-->" not in content:
                issues["email_protection_risks"].append(f"[{rel_path}] Raw mailto link exposed without <!--email_off-->: {href}")

        # Internal link check
        if href.startswith("/") and not href.startswith("//"):
            clean_href = href.split("#")[0].split("?")[0]
            if not clean_href:
                continue

            is_static_asset = (BASE_DIR / clean_href.lstrip("/")).exists() or clean_href in ["/sitemap.xml", "/robots.txt", "/llms.txt", "/llms-full.txt"]

            if not is_static_asset:
                if clean_href != "/" and not clean_href.endswith("/"):
                    issues["redirect_internal_links"].append(f"[{rel_path}] Internal link missing trailing slash: '{href}'")
                    clean_href_with_slash = clean_href + "/"
                else:
                    clean_href_with_slash = clean_href

                if clean_href_with_slash not in all_routes:
                    issues["broken_internal_links"].append(f"[{rel_path}] Broken internal link (404): '{href}' (normalized: '{clean_href_with_slash}')")

        elif href.startswith("http://") or href.startswith("https://"):
            # Check commercial vendor partner links for nofollow
            is_commercial = any(k in href.lower() for k in ["pharmagrade", "direct-peptides", "direct-sarms", "peptide-works", "pharmalab-global", "tridentpeptide"])
            if is_commercial:
                if "nofollow" not in rel:
                    issues["commercial_links_missing_nofollow"].append(f"[{rel_path}] Commercial partner link missing rel='nofollow': '{href}'")

    # 8. Schema.org JSON-LD Checks
    ld_scripts = soup.find_all("script", type="application/ld+json")
    for s in ld_scripts:
        try:
            data = json.loads(s.string)
            if isinstance(data, dict):
                schemas = data.get("@graph", [data])
            elif isinstance(data, list):
                schemas = data
            else:
                schemas = []

            for sc in schemas:
                sc_type = sc.get("@type")
                if not sc_type:
                    issues["schema_errors"].append(f"[{rel_path}] JSON-LD missing @type")
                if sc_type == "Product":
                    offers = sc.get("offers", {})
                    if isinstance(offers, dict):
                        if not offers.get("priceValidUntil"):
                            issues["schema_errors"].append(f"[{rel_path}] Product schema missing offers.priceValidUntil")
                        if not offers.get("url"):
                            issues["schema_errors"].append(f"[{rel_path}] Product schema missing offers.url")
                elif sc_type == "HowTo":
                    if not sc.get("image"):
                        issues["schema_errors"].append(f"[{rel_path}] HowTo schema missing image")
                    steps = sc.get("step", [])
                    for idx, st in enumerate(steps):
                        if not st.get("url"):
                            issues["schema_errors"].append(f"[{rel_path}] HowTo step #{idx+1} missing url")
        except Exception as e:
            issues["schema_errors"].append(f"[{rel_path}] Invalid JSON-LD: {e}")

print("\n==========================================")
print(" AMINOACIDSUPPLEMENTS.CO AHREFS 100/100 AUDIT")
print("==========================================")
total_issues = 0
for category, items in issues.items():
    status_icon = "✓" if len(items) == 0 else "❌"
    print(f"\n{status_icon} {category.upper()} ({len(items)} issues):")
    total_issues += len(items)
    for it in items[:15]:
        print(f"  - {it}")
    if len(items) > 15:
        print(f"  ... and {len(items) - 15} more")

print("\n==========================================")
if total_issues == 0:
    print("🏆 PERFECT SCORE: 0 ISSUES DETECTED! AHREFS 100/100 READY!")
else:
    print(f"TOTAL ISSUES DETECTED: {total_issues}")
print("==========================================")
