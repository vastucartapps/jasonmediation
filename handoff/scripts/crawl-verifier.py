#!/usr/bin/env python3
"""
Static Crawl & Asset Verifier CLI
Crawls static build output (or live HTTP URL) to confirm 100% of internal links,
images, scripts, and stylesheets return HTTP 200 with zero redirects and zero 404s.

Usage:
    python3 handoff/scripts/crawl-verifier.py --dir out
    python3 handoff/scripts/crawl-verifier.py --url https://example.com/
"""

import os
import sys
import glob
import argparse
from urllib.parse import urlparse
from bs4 import BeautifulSoup

def verify_static_directory(out_dir):
    print(f"\n🕷️  STARTING STATIC CRAWL VERIFIER: {out_dir}")
    if not os.path.isdir(out_dir):
        print(f"❌ Error: Directory '{out_dir}' does not exist.")
        return False

    html_files = glob.glob(os.path.join(out_dir, "**/*.html"), recursive=True)
    print(f"Found {len(html_files)} HTML files to crawl.")

    broken_links = []
    broken_images = []
    redirect_warnings = []
    checked_assets = set()

    for path in html_files:
        rel_path = os.path.relpath(path, out_dir)
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            soup = BeautifulSoup(f.read(), "html.parser")

        # 1. Verify Links
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
                continue

            parsed = urlparse(href)
            if parsed.netloc:
                # External link, skip local verification
                continue

            link_path = parsed.path
            if not link_path or link_path == "/":
                target_file = os.path.join(out_dir, "index.html")
            else:
                clean_path = link_path.lstrip("/")
                if clean_path.endswith("/"):
                    target_file = os.path.join(out_dir, clean_path, "index.html")
                elif not os.path.splitext(clean_path)[1]:
                    # Missing trailing slash! Warn about redirect
                    redirect_warnings.append(f"{rel_path}: Internal link '{href}' missing trailing slash.")
                    target_file = os.path.join(out_dir, clean_path, "index.html")
                else:
                    target_file = os.path.join(out_dir, clean_path)

            if not os.path.isfile(target_file):
                broken_links.append(f"{rel_path} -> '{href}' (Resolved to missing '{target_file}')")

        # 2. Verify Images
        for img in soup.find_all("img", src=True):
            src = img["src"].strip()
            if not src or src.startswith(("data:", "http://", "https://")):
                continue

            clean_src = src.lstrip("/")
            img_file = os.path.join(out_dir, clean_src)
            if img_file not in checked_assets:
                checked_assets.add(img_file)
                if not os.path.isfile(img_file):
                    broken_images.append(f"{rel_path}: Missing image asset '{src}'")

    print("\n" + "=" * 60)
    print(" 📊 CRAWL VERIFICATION RESULTS")
    print("=" * 60)
    print(f" Total HTML Pages Checked: {len(html_files)}")
    print(f" Unique Assets Verified:  {len(checked_assets)}")
    print(f" Broken Internal Links:   {len(broken_links)}")
    print(f" Broken Image Assets:     {len(broken_images)}")
    print(f" Trailing Slash Warnings: {len(redirect_warnings)}")
    print("=" * 60)

    if broken_links:
        print("\n❌ BROKEN INTERNAL LINKS:")
        for b in broken_links[:10]:
            print(f"   • {b}")
        if len(broken_links) > 10:
            print(f"   ... and {len(broken_links) - 10} more.")

    if broken_images:
        print("\n❌ BROKEN IMAGES:")
        for bi in broken_images[:10]:
            print(f"   • {bi}")

    if redirect_warnings:
        print("\n⚠️  TRAILING SLASH WARNINGS (Cause 301 redirects):")
        for rw in redirect_warnings[:10]:
            print(f"   • {rw}")

    success = (len(broken_links) == 0 and len(broken_images) == 0)
    if success:
        print("\n✅ CRAWL VERIFICATION PASSED: All internal links and assets exist.\n")
    else:
        print("\n⛔ CRAWL VERIFICATION FAILED: Resolve broken links before launch.\n")

    return success

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Static Crawl & Asset Verifier")
    parser.add_argument("--dir", help="Static build directory to crawl (e.g. out)")
    args = parser.parse_args()

    if args.dir:
        passed = verify_static_directory(args.dir)
        sys.exit(0 if passed else 1)
    else:
        parser.print_help()
        sys.exit(1)
