import os
import re
from bs4 import BeautifulSoup

import sys

OUT_DIR = sys.argv[1] if len(sys.argv) > 1 else "/mnt/d/Jason Local Sites/mediation new/gemini/Sites/aminoacidsupplements/out"

def check_seo_limits():
    if not os.path.exists(OUT_DIR):
        print(f"Error: {OUT_DIR} does not exist.")
        return

    html_files = []
    for root, dirs, files in os.walk(OUT_DIR):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))

    print(f"Found {len(html_files)} HTML pages to audit for SEO limits:")
    print("=" * 90)
    print(f"{'URL Path':<35} | {'Title (<= 60)':<8} | {'Desc (<= 160)':<8} | Status")
    print("=" * 90)

    title_issues = []
    desc_issues = []
    all_rows = []

    for path in sorted(html_files):
        rel = os.path.relpath(path, OUT_DIR)
        url_path = "/" if rel == "index.html" else "/" + rel.replace("index.html", "")
        
        with open(path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")

        title_el = soup.find("title")
        title_text = title_el.get_text() if title_el else ""
        title_len = len(title_text)

        desc_el = soup.find("meta", attrs={"name": "description"})
        desc_text = desc_el["content"] if desc_el and desc_el.has_attr("content") else ""
        desc_len = len(desc_text)

        status = "OK"
        if title_len > 60:
            status = "TITLE OVER LIMIT"
            title_issues.append((url_path, title_text, title_len))
        if desc_len > 160:
            status = "DESC OVER LIMIT" if status == "OK" else status + " & DESC OVER LIMIT"
            desc_issues.append((url_path, desc_text, desc_len))

        all_rows.append((url_path, title_len, title_text, desc_len, desc_text, status))
        print(f"{url_path:<35} | {title_len:<13} | {desc_len:<13} | {status}")

    print("=" * 90)
    print(f"Total Pages Checked: {len(html_files)}")
    print(f"Title Over 60 Chars: {len(title_issues)}")
    print(f"Desc Over 160 Chars: {len(desc_issues)}")
    print("=" * 90)

    if title_issues:
        print("\n[!] TITLE ISSUES DETECTED:")
        for url, t, l in title_issues:
            print(f"  - {url} ({l} chars): \"{t}\"")

    if desc_issues:
        print("\n[!] DESCRIPTION ISSUES DETECTED:")
        for url, d, l in desc_issues:
            print(f"  - {url} ({l} chars): \"{d}\"")

    if not title_issues and not desc_issues:
        print("\n>>> ALL 100% COMPLIANT WITH STRICT SEO LIMITS (Title <= 60, Desc <= 160) <<<")

if __name__ == "__main__":
    check_seo_limits()
