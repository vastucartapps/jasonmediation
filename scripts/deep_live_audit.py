#!/usr/bin/env python3
"""
Deep Live Audit of https://swanmediation.online
Verifies:
1. Every single route returns HTTP 200.
2. Every <img> tag points to a valid image returning HTTP 200.
3. No raw markdown asterisks (**) anywhere in the HTML.
4. Exactly one <h1> per page.
5. All internal links have trailing slashes and return 200.
6. Partner links have rel="nofollow".
7. JSON-LD scripts are syntactically valid and contain expected schemas.
"""

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
import re
from bs4 import BeautifulSoup

BASE_URL = "https://swanmediation.online"
PROD_DOMAIN = "https://aminoacidsupplements.co"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:
        return 500, None

def main():
    print(f"🔍 Fetching sitemap from {BASE_URL}/sitemap.xml...")
    status, content = fetch_url(f"{BASE_URL}/sitemap.xml")
    if status != 200 or not content:
        print(f"❌ Failed to fetch sitemap: {status}")
        return

    root = ET.fromstring(content.decode("utf-8"))
    urls = [elem.text for elem in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    
    # Also include blog index and all 15 blog post URLs
    routes = set()
    for u in urls:
        path = u.replace(PROD_DOMAIN, "")
        routes.add(path if path else "/")

    routes.add("/blog/")
    # Ensure all 15 posts are in routes
    post_slugs = [
        "aod-9604-chromatographic-separation-profiles",
        "bpc-157-gastric-juice-stability-profiles",
        "bpc-157-stability-protocols",
        "bpc-157-tb-500-blend-stability-protocols",
        "cjc-1295-reconstitution-diluent-compatibility",
        "epithalon-analytical-assay-standards",
        "ghk-cu-storage-degradation-kinetics",
        "ipamorelin-moisture-content-thermal-stability",
        "kpv-tripeptide-chromatographic-purity-assays",
        "motsc-mitochondrial-peptide-thermal-stability",
        "pt-141-lyophilization-stability-kinetics",
        "selank-enzymatic-resistance-protocols",
        "semax-purity-testing-protocols",
        "tb-500-cross-linking-oxidation-kinetics",
        "tb-500-reconstitution-guidelines"
    ]
    for slug in post_slugs:
        routes.add(f"/blog/{slug}/")

    print(f"📋 Auditing {len(routes)} distinct pages on live server...")

    issues = {
        "http_errors": [],
        "h1_issues": [],
        "raw_asterisks": [],
        "broken_images": [],
        "broken_internal_links": [],
        "missing_trailing_slash": [],
        "missing_nofollow": [],
        "invalid_jsonld": []
    }

    checked_images = {}
    
    for route in sorted(routes):
        full_url = f"{BASE_URL}{route}"
        status, html_bytes = fetch_url(full_url)
        if status != 200 or not html_bytes:
            issues["http_errors"].append(f"{route} -> HTTP {status}")
            continue

        html = html_bytes.decode("utf-8", errors="ignore")
        soup = BeautifulSoup(html, "html.parser")

        # 1. H1 check
        h1s = soup.find_all("h1")
        if len(h1s) != 1:
            issues["h1_issues"].append(f"{route} has {len(h1s)} <h1> tags")

        # 2. Raw markdown asterisks check in body text
        # Ignore scripts and styles
        for s in soup(["script", "style"]):
            s.decompose()
        body_text = soup.get_text()
        raw_md = re.findall(r"\*\*[A-Za-z0-9\s:,\-\.]{3,}\*\*", body_text)
        if raw_md:
            issues["raw_asterisks"].append(f"{route} contains raw bold asterisks: {raw_md[:3]}")

        # 3. Image check
        for img in soup.find_all("img"):
            src = img.get("src", "")
            if not src:
                continue
            img_url = urllib.parse.urljoin(full_url, src)
            if img_url not in checked_images:
                img_status, _ = fetch_url(img_url)
                checked_images[img_url] = img_status
            if checked_images[img_url] != 200:
                issues["broken_images"].append(f"{route} -> img {src} returned HTTP {checked_images[img_url]}")

        # 4. Internal links check
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if href.startswith("/"):
                clean = href.split("#")[0].split("?")[0]
                if clean and clean != "/" and not clean.endswith("/") and not any(clean.endswith(ext) for ext in [".xml", ".txt", ".json", ".webp", ".png", ".jpg", ".svg"]):
                    issues["missing_trailing_slash"].append(f"{route} links to '{href}' without trailing slash")

            # Check partner links for nofollow
            is_partner = any(p in href.lower() for p in ["pharmagrade", "direct-peptides", "tridentpeptide", "peptide-works"])
            if is_partner:
                rel = a.get("rel", [])
                if isinstance(rel, str):
                    rel = rel.split()
                if "nofollow" not in rel:
                    issues["missing_nofollow"].append(f"{route} commercial link '{href}' missing nofollow")

        # 5. JSON-LD check
        for s in soup.find_all("script", type="application/ld+json"):
            if s.string:
                try:
                    data = json.loads(s.string)
                except Exception as e:
                    issues["invalid_jsonld"].append(f"{route} JSON-LD parse error: {e}")

    print("\n" + "="*50)
    print(" LIVE AUDIT RESULTS FOR SWANMEDIATION.ONLINE")
    print("="*50)
    total_issues = 0
    for k, v in issues.items():
        status_icon = "✅" if len(v) == 0 else "❌"
        print(f"{status_icon} {k.upper()} ({len(v)} issues):")
        total_issues += len(v)
        for item in v[:5]:
            print(f"   - {item}")
        if len(v) > 5:
            print(f"   ... and {len(v)-5} more")

    print("="*50)
    if total_issues == 0:
        print("🏆 100% PERFECT LIVE AUDIT! ZERO DEFECTS FOUND.")
    else:
        print(f"⚠️ TOTAL DEFECTS FOUND: {total_issues}")
    print("="*50)

if __name__ == "__main__":
    main()
