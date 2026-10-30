#!/usr/bin/env python3
"""
Master 10-Pillar SEO Quality Gatekeeper CLI (2026 Enterprise Edition)
Autonomous verification engine checking static website builds (Next.js/Astro)
against the 10 Inviolable Quality Gates.

Usage:
    python3 handoff/scripts/gatekeeper.py --dir <site_directory>/out
"""

import os
import sys
import re
import glob
import argparse
import json
from urllib.parse import urlparse
from collections import Counter, defaultdict
from bs4 import BeautifulSoup

FORBIDDEN_AI_SUBSTRINGS = [
    "machine extract",
    "direct answer",
    "as an ai language model",
    "as an ai",
    "```markdown",
    "```html",
    "in today's fast-paced world",
    "it's important to remember",
    "in conclusion",
    "a testament to",
    "delve into",
    "dive into",
    "tapestry of",
    "beacon of",
    "plethora of",
]

SHINGLE_WIDTH = 5
BOILERPLATE_DF = 0.30

AUTHORITY_DOMAINS = [
    ".gov", ".org", ".edu", ".ac.uk", ".gov.uk",
    "legislation.gov.uk", "nih.gov", "ncbi.nlm.nih.gov", "mhra.gov.uk",
    "familymediationcouncil.org.uk", "justice.gov.uk", "energy.gov",
    "osha.gov", "epa.gov", "nfpa.org", "wikipedia.org", "wikidata.org",
    "cityofmesa.gov", "phoenix.gov"
]

def get_word_shingles(text, width=SHINGLE_WIDTH):
    words = re.sub(r"[^a-z0-9\s]", " ", text.lower()).split()
    if len(words) < width:
        return set()
    return {" ".join(words[i:i+width]) for i in range(len(words) - width + 1)}

def normalize_internal_path(href, current_file, site_dir):
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    
    parsed = urlparse(href)
    if parsed.netloc:
        return None
    
    path = parsed.path
    if not path or path == "/":
        return "index.html"
    
    path = path.lstrip("/")
    if path.endswith("/"):
        return os.path.join(path, "index.html")
    elif not os.path.splitext(path)[1]:
        return os.path.join(path, "index.html")
    else:
        return path

def audit_site(site_dir):
    if os.path.isdir(os.path.join(site_dir, "out")):
        site_dir = os.path.join(site_dir, "out")
    elif os.path.isdir(os.path.join(site_dir, "dist")):
        site_dir = os.path.join(site_dir, "dist")

    print("\n" + "=" * 76)
    print(f" 🛡️  MASTER 10-PILLAR SEO QUALITY GATEKEEPER (2026 ENTERPRISE AUDIT)")
    print(f" Target Directory: {site_dir}")
    print("=" * 76)

    if not os.path.isdir(site_dir):
        print(f"❌ Error: Directory '{site_dir}' does not exist.")
        return False

    html_files = glob.glob(os.path.join(site_dir, "**/*.html"), recursive=True)
    if not html_files:
        print(f"⚠️  No HTML files found in '{site_dir}'. (Has the site been built?)")
        return False

    print(f"🔍 Discovered {len(html_files)} rendered HTML pages to audit.")

    gates = {
        "Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)": {"pass": True, "issues": []},
        "Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)": {"pass": True, "issues": []},
        "Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)": {"pass": True, "issues": []},
        "Gate 4: Anti-Doorway 3-of-4 Material Gate & Similarity": {"pass": True, "issues": []},
        "Gate 5: Routing & Entity Isolation (Anti-Cannibalization)": {"pass": True, "issues": []},
        "Gate 6: 40% Value Delta & Information Gain Scoring": {"pass": True, "issues": []},
        "Gate 7: Dynamic DOM & Visual Layout Spintax (Modulo Rotation)": {"pass": True, "issues": []},
        "Gate 8: Spiderweb Internal Graph & External Authority Citations": {"pass": True, "issues": []},
        "Gate 9: GEO/AEO/BLUF & No-GBP Unified Schema (@graph)": {"pass": True, "issues": []},
        "Gate 10: CRO & Lead Monetization (Sticky Call / Funnel / Numbers)": {"pass": True, "issues": []},
    }

    # 1. Check robots.txt, sitemap.xml, llms.txt in root
    robots_path = os.path.join(site_dir, "robots.txt")
    if os.path.isfile(robots_path):
        with open(robots_path, "r", encoding="utf-8", errors="ignore") as f:
            rob_txt = f.read().lower()
        required_bots = ["oai-searchbot", "gptbot", "claudebot", "perplexitybot"]
        missing_bots = [b for b in required_bots if b not in rob_txt]
        if missing_bots:
            gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
                f"robots.txt missing explicit AI crawler directives: {missing_bots}"
            )
    else:
        gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
            "Missing robots.txt in export directory."
        )

    sitemap_path = os.path.join(site_dir, "sitemap.xml")
    if not os.path.isfile(sitemap_path):
        gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
            "Missing sitemap.xml in export directory."
        )

    llms_path = os.path.join(site_dir, "llms.txt")
    if not os.path.isfile(llms_path):
        gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
            "Missing llms.txt machine-discovery manifest."
        )

    dom_signatures = []
    page_texts = {}
    doc_freq = Counter()
    internal_links_graph = defaultdict(set)
    all_pages_rel = set()

    for p in html_files:
        r_p = os.path.relpath(p, site_dir)
        all_pages_rel.add(r_p)

    for path in html_files:
        rel_path = os.path.relpath(path, site_dir)
        is_404_page = rel_path.startswith("_not-found") or rel_path.startswith("404")

        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")
        body_text = soup.body.get_text() if soup.body else ""
        content_lower = content.lower()

        # 404 Page Strict Isolation
        if is_404_page:
            canonical = soup.find("link", attrs={"rel": "canonical"})
            if canonical:
                gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["pass"] = False
                gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
                    f"{rel_path}: 404 page must NOT have a canonical tag."
                )
            robots_meta = soup.find("meta", attrs={"name": "robots"})
            if not robots_meta or "noindex" not in robots_meta.get("content", "").lower():
                gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["pass"] = False
                gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
                    f"{rel_path}: 404 page must have <meta name='robots' content='noindex, nofollow'>."
                )
            continue

        # Gate 1: CWV & Technical Hygiene
        if "—" in body_text:
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["pass"] = False
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["issues"].append(
                f"{rel_path}: Em-dash (—) found in visible copy. Use regular hyphens (-)."
            )

        h1_tags = soup.find_all("h1")
        if len(h1_tags) == 0:
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["pass"] = False
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["issues"].append(
                f"{rel_path}: Missing <h1> tag."
            )
        elif len(h1_tags) > 1:
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["pass"] = False
            gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["issues"].append(
                f"{rel_path}: Multiple <h1> tags found ({len(h1_tags)}). Exactly one H1 allowed."
            )

        # Heading Hierarchy Check
        headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
        prev_level = 0
        for h in headings:
            curr_level = int(h.name[1])
            if prev_level > 0 and curr_level > prev_level + 1:
                gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["issues"].append(
                    f"{rel_path}: Heading hierarchy skipped from <h{prev_level}> to <h{curr_level}> ('{h.get_text()[:30]}...')"
                )
            prev_level = curr_level

        # Image Alt Check
        for img in soup.find_all("img"):
            src = img.get("src", "unknown")
            if not img.get("alt"):
                gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["pass"] = False
                gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                    f"{rel_path}: Image '{src}' missing descriptive alt attribute."
                )

        # Gate 2: Canonical Tag
        canonical = soup.find("link", attrs={"rel": "canonical"})
        if not canonical or not canonical.get("href"):
            gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["pass"] = False
            gates["Gate 2: Google Search Console & Discovery (Sitemap/Robots/Canonical)"]["issues"].append(
                f"{rel_path}: Missing self-referential canonical tag."
            )

        # Gate 3: Title & Meta Description Lengths
        title_tag = soup.find("title")
        title_text = title_tag.string.strip() if title_tag and title_tag.string else ""
        if not title_text:
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["pass"] = False
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                f"{rel_path}: Missing <title> tag."
            )
        elif len(title_text) > 75:
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                f"{rel_path}: Title tag is long ({len(title_text)} chars): '{title_text[:40]}...'"
            )

        meta_desc = soup.find("meta", attrs={"name": "description"})
        desc_text = meta_desc.get("content", "").strip() if meta_desc else ""
        if not desc_text:
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["pass"] = False
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                f"{rel_path}: Missing meta description."
            )

        # Link Extraction & Validation
        page_anchors = soup.find_all("a", href=True)
        has_outbound_authority = False
        has_tel_link = False

        for a in page_anchors:
            href = a["href"].strip()
            if href.startswith("tel:"):
                has_tel_link = True
                continue
            
            if href.startswith(("http://", "https://")):
                for auth in AUTHORITY_DOMAINS:
                    if auth in href:
                        has_outbound_authority = True
                        break
                continue

            normalized_target = normalize_internal_path(href, path, site_dir)
            if normalized_target:
                internal_links_graph[rel_path].add(normalized_target)
                target_full = os.path.join(site_dir, normalized_target)
                if not os.path.isfile(target_full):
                    gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["pass"] = False
                    gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                        f"{rel_path}: Broken internal link to '{href}' (Target '{normalized_target}' does not exist)."
                    )

        # Gate 5: Entity Isolation
        geo_matches = re.findall(
            r"\b(london|bristol|manchester|birmingham|leeds|salem|bend|portland|seattle|dallas|austin|mesa|phoenix|gilbert|chandler)\b",
            rel_path.lower()
        )
        if len(set(geo_matches)) > 1:
            gates["Gate 5: Routing & Entity Isolation (Anti-Cannibalization)"]["pass"] = False
            gates["Gate 5: Routing & Entity Isolation (Anti-Cannibalization)"]["issues"].append(
                f"{rel_path}: Conflicting geo-entities in URL: {set(geo_matches)}"
            )

        # AI Footprint Sanitization
        for forbidden in FORBIDDEN_AI_SUBSTRINGS:
            if forbidden in content_lower:
                gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["pass"] = False
                gates["Gate 1: CWV & Technical Hygiene (Preload/Lazy/Dash/Headings)"]["issues"].append(
                    f"{rel_path}: Found forbidden AI phrase '{forbidden}'"
                )

        # Information Gain Check
        has_metrics = bool(re.search(r"(\$|£|\b\d+(\.\d+)?%|\b\d+\s*(mg|mcg|ml|v|amp|kw|hours|days|weeks)\b)", body_text, re.IGNORECASE))
        if not has_metrics and not rel_path.startswith(("privacy", "terms", "sitemap", "about", "contact")):
            gates["Gate 6: 40% Value Delta & Information Gain Scoring"]["issues"].append(
                f"{rel_path}: Low Information Gain / Statistical Density (missing verifiable numbers, costs, or units)."
            )

        # Gate 7: DOM Structure
        main_tag = soup.find("main") or soup.find("article") or soup.body
        if main_tag:
            element_seq = "-".join([el.name for el in main_tag.find_all(recursive=False)][:8])
            dom_signatures.append(element_seq)

        # Gate 8: Outbound Authority
        if not has_outbound_authority and not rel_path.startswith(("privacy", "terms", "sitemap", "contact", "about")):
            gates["Gate 8: Spiderweb Internal Graph & External Authority Citations"]["issues"].append(
                f"{rel_path}: Missing external high-authority citation (.gov, .org, or official code standard)."
            )

        # Gate 9: Schema Check
        schemas = soup.find_all("script", type="application/ld+json")
        if not schemas:
            gates["Gate 9: GEO/AEO/BLUF & No-GBP Unified Schema (@graph)"]["pass"] = False
            gates["Gate 9: GEO/AEO/BLUF & No-GBP Unified Schema (@graph)"]["issues"].append(
                f"{rel_path}: Missing JSON-LD Schema."
            )
        else:
            has_graph = False
            for s in schemas:
                try:
                    data = json.loads(s.string)
                    if isinstance(data, dict) and "@graph" in data:
                        has_graph = True
                        break
                except Exception:
                    pass
            if not has_graph:
                gates["Gate 9: GEO/AEO/BLUF & No-GBP Unified Schema (@graph)"]["issues"].append(
                    f"{rel_path}: Schema not unified inside single @graph array."
                )

        # Table presence for GEO
        tables = soup.find_all("table")
        if not tables and not rel_path.startswith(("privacy", "terms", "sitemap", "contact", "about")):
            gates["Gate 9: GEO/AEO/BLUF & No-GBP Unified Schema (@graph)"]["issues"].append(
                f"{rel_path}: Missing structured HTML <table> for pricing, permits, or technical specifications."
            )

        # Gate 10: CRO
        if not has_tel_link and not soup.find("form") and not soup.find(attrs={"data-cta": True}):
            if not rel_path.startswith(("privacy", "terms", "sitemap", "about")):
                gates["Gate 10: CRO & Lead Monetization (Sticky Call / Funnel / Numbers)"]["issues"].append(
                    f"{rel_path}: Missing direct phone CTA (tel:) or lead capture funnel."
                )

        sh = get_word_shingles(body_text)
        page_texts[rel_path] = sh
        for s in sh:
            doc_freq[s] += 1

    # Check Orphan Pages
    inbound_counts = Counter()
    for src, targets in internal_links_graph.items():
        for t in targets:
            inbound_counts[t] += 1

    for p in all_pages_rel:
        if p.startswith(("_not-found", "404", "index.html")):
            continue
        alt_p = os.path.join(p, "index.html") if not p.endswith(".html") else p
        if inbound_counts[p] == 0 and inbound_counts[alt_p] == 0:
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["pass"] = False
            gates["Gate 3: Ahrefs 100/100 Health (Title/Meta/Alt/Broken Links/Orphans)"]["issues"].append(
                f"Orphan page detected: '{p}' has 0 internal inlinks."
            )

    # Check DOM variance
    if len(dom_signatures) >= 10:
        unique_sigs = len(set(dom_signatures))
        if unique_sigs < 2:
            gates["Gate 7: Dynamic DOM & Visual Layout Spintax (Modulo Rotation)"]["pass"] = False
            gates["Gate 7: Dynamic DOM & Visual Layout Spintax (Modulo Rotation)"]["issues"].append(
                f"Severe boilerplate fatigue: Only {unique_sigs} unique top-level DOM layout signatures across {len(dom_signatures)} pages. Rotate 3+ layouts."
            )

    # Check Jaccard Similarity
    n_docs = len(page_texts)
    if n_docs > 1:
        boilerplate_shingles = {s for s, count in doc_freq.items() if count / n_docs >= BOILERPLATE_DF}
        filtered_pages = {p: s - boilerplate_shingles for p, s in page_texts.items()}
        
        sample_keys = list(filtered_pages.keys())[:15]
        for i in range(len(sample_keys)):
            for j in range(i + 1, len(sample_keys)):
                k1, k2 = sample_keys[i], sample_keys[j]
                s1, s2 = filtered_pages[k1], filtered_pages[k2]
                if not s1 or not s2:
                    continue
                intersection = len(s1 & s2)
                union = len(s1 | s2)
                jaccard = intersection / union if union > 0 else 0
                if jaccard >= 0.50:
                    gates["Gate 4: Anti-Doorway 3-of-4 Material Gate & Similarity"]["pass"] = False
                    gates["Gate 4: Anti-Doorway 3-of-4 Material Gate & Similarity"]["issues"].append(
                        f"High textual similarity ({jaccard:.2f}) between '{k1}' and '{k2}'. Jaccard must be < 0.50."
                    )
                    break

    overall_pass = True
    print("\n" + "=" * 76)
    for gate_name, result in gates.items():
        if result["issues"] and not result["pass"]:
            status_icon = "❌ FAIL"
            overall_pass = False
        elif result["issues"] and result["pass"]:
            status_icon = "⚠️  WARN"
        else:
            status_icon = "✅ PASS"
        print(f" {status_icon} | {gate_name}")
        for issue in result["issues"][:4]:
            print(f"    • {issue}")
        if len(result["issues"]) > 4:
            print(f"    ... and {len(result['issues']) - 4} more issues.")

    print("=" * 76)
    if overall_pass:
        print("🏆 OVERALL GATEKEEPER VERDICT: PASS (Site Authorized for Live Launch)")
    else:
        print("⛔ OVERALL GATEKEEPER VERDICT: FAIL (Remediation Required Before Launch)")
    print("=" * 76 + "\n")

    return overall_pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Master 10-Pillar SEO Quality Gatekeeper")
    parser.add_argument("--dir", required=True, help="Static export directory (e.g. out)")
    args = parser.parse_args()

    success = audit_site(args.dir)
    sys.exit(0 if success else 1)
