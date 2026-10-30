#!/usr/bin/env python3
"""
Comprehensive 4xx & 3xx Double-Assurance Crawler for https://swanmediation.online
Crawls every link on every page and verifies zero 3xx redirects and zero 4xx errors.
"""

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import time

BASE_HOST = "swanmediation.online"
BASE_URL = f"https://{BASE_HOST}"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}

visited_urls = set()
to_visit = set()
all_internal_links = set()
all_images = set()

errors_4xx = []
redirects_3xx = []
server_errors_5xx = []

def fetch_no_redirect(url):
    """Fetches URL without following redirects to catch 301/302 immediately."""
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None

    opener = urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = opener.open(req, timeout=10)
        return resp.status, resp.read(), resp.headers
    except urllib.error.HTTPError as e:
        return e.code, e.read() if e.fp else b"", e.headers
    except Exception as e:
        return 999, str(e).encode(), {}

# 1. Start from sitemap.xml
print("📥 Fetching sitemap.xml...")
status, content, _ = fetch_no_redirect(f"{BASE_URL}/sitemap.xml")
if status == 200:
    root = ET.fromstring(content.decode("utf-8"))
    for loc in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        u = loc.text.strip().replace("https://aminoacidsupplements.co", BASE_URL)
        to_visit.add(u)
        all_internal_links.add(u)

# Also add blog index and well-known catalog
to_visit.add(f"{BASE_URL}/blog/")
to_visit.add(f"{BASE_URL}/ai-catalog.json")
to_visit.add(f"{BASE_URL}/.well-known/ai-catalog.json")

print(f"🚀 Starting crawl of {len(to_visit)} initial seed URLs...")

while to_visit:
    current_url = to_visit.pop()
    if current_url in visited_urls:
        continue
    visited_urls.add(current_url)

    status, body, resp_headers = fetch_no_redirect(current_url)
    
    if 300 <= status < 400:
        loc = resp_headers.get("Location", "")
        redirects_3xx.append(f"{current_url} -> {status} to {loc}")
        print(f"  ❌ 3XX REDIRECT: {current_url} -> {status} ({loc})")
        continue
    elif 400 <= status < 500:
        errors_4xx.append(f"{current_url} -> {status}")
        print(f"  ❌ 4XX ERROR: {current_url} -> {status}")
        continue
    elif status >= 500:
        server_errors_5xx.append(f"{current_url} -> {status}")
        print(f"  ❌ 5XX ERROR: {current_url} -> {status}")
        continue

    # If HTML, extract all links and images
    content_type = resp_headers.get("Content-Type", "")
    if "text/html" in content_type:
        try:
            soup = BeautifulSoup(body.decode("utf-8", errors="ignore"), "html.parser")
            for a in soup.find_all("a", href=True):
                href = a["href"].strip()
                if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
                    continue
                clean_href = href.split("#")[0]
                full_href = urllib.parse.urljoin(current_url, clean_href)
                parsed = urllib.parse.urlparse(full_href)
                if parsed.netloc == BASE_HOST:
                    all_internal_links.add(full_href)
                    if full_href not in visited_urls:
                        to_visit.add(full_href)

            for img in soup.find_all("img"):
                src = img.get("src")
                if src:
                    full_src = urllib.parse.urljoin(current_url, src)
                    all_images.add(full_src)
        except Exception:
            pass

print(f"\n🖼️ Auditing {len(all_images)} extracted images...")
broken_images = []
image_redirects = []
for img_url in all_images:
    status, _, h = fetch_no_redirect(img_url)
    if 300 <= status < 400:
        image_redirects.append(f"{img_url} -> {status}")
    elif status >= 400:
        broken_images.append(f"{img_url} -> {status}")

print("\n" + "="*60)
print(" 🔬 COMPREHENSIVE LIVE AUDIT & DOUBLE ASSURANCE REPORT")
print("="*60)
print(f"Total Unique Pages Crawled: {len(visited_urls)}")
print(f"Total Internal Links Verified: {len(all_internal_links)}")
print(f"Total Images Verified: {len(all_images)}")
print("-" * 60)
print(f"3xx Redirects: {len(redirects_3xx)}")
for r in redirects_3xx:
    print(f"  - {r}")
print(f"4xx Client Errors: {len(errors_4xx)}")
for e in errors_4xx:
    print(f"  - {e}")
print(f"Broken Images: {len(broken_images)}")
for bi in broken_images:
    print(f"  - {bi}")
print(f"5xx Server Errors: {len(server_errors_5xx)}")
for se in server_errors_5xx:
    print(f"  - {se}")
print("="*60)

if len(redirects_3xx) == 0 and len(errors_4xx) == 0 and len(broken_images) == 0 and len(server_errors_5xx) == 0:
    print("🏆 DOUBLE ASSURANCE VERIFIED: 0 REDIRECTS, 0 4xx ERRORS, 0 BROKEN IMAGES!")
else:
    print("⚠️ ANOMALIES FOUND! INVESTIGATE IMMEDIATELY.")
print("="*60)
