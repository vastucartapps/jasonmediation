#!/usr/bin/env python3
"""Master ContentFlow v5.0 Portfolio Upgrade Script
Upgrades all 15 published articles to the Master AEO/GEO standard from 'Article Writing prompt.txt':
  1. BLUF Executive Summary (4 punchy bullets directly answering the search query).
  2. Extractor Question Headings (conversational micro-intents matching user search behavior).
  3. The 50-Word Rule (first paragraph under every H2 directly answers the heading).
  4. Extreme Burstiness & Cadence (3-to-28 word sentence variety, max 4 lines per paragraph).
  5. 100% Zero Academic Fluff (eliminates all 'judiciously', 'meticulous', 'effectively mitigated', 'thorny issue', etc.).
  6. Contextual Internal Mesh Linking (3-5 contextual in-body links per article with trailing slashes).
  7. Ahrefs Technical Hygiene (meta titles <60 chars, meta descriptions <160 chars, rich image ALTs).
"""
import os
import sys
import json
import re
import time
import urllib.request
from pathlib import Path

POSTS_DIR = Path("Sites/aminoacidsupplements/content/posts")
GEMINI_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyALOzrzWa3FWNxhmUKumR6sLm0qrHyeTwQ")

ALL_TARGETS = [
    # Blog posts
    {"anchor": "BPC-157 acidic stability profiles", "url": "/blog/bpc-157-gastric-juice-stability-profiles/", "slug": "bpc-157-gastric-juice-stability-profiles"},
    {"anchor": "simulated gastric fluid assays", "url": "/blog/bpc-157-gastric-juice-stability-profiles/", "slug": "bpc-157-gastric-juice-stability-profiles"},
    {"anchor": "BPC-157 lyophilized stability protocols", "url": "/blog/bpc-157-stability-protocols/", "slug": "bpc-157-stability-protocols"},
    {"anchor": "BPC-157 stability protocols", "url": "/blog/bpc-157-stability-protocols/", "slug": "bpc-157-stability-protocols"},
    {"anchor": "BPC-157 and TB-500 blend stability", "url": "/blog/bpc-157-tb-500-blend-stability-protocols/", "slug": "bpc-157-tb-500-blend-stability-protocols"},
    {"anchor": "TB-500 methionine oxidation kinetics", "url": "/blog/tb-500-cross-linking-oxidation-kinetics/", "slug": "tb-500-cross-linking-oxidation-kinetics"},
    {"anchor": "multimerization resistance in TB-500", "url": "/blog/tb-500-cross-linking-oxidation-kinetics/", "slug": "tb-500-cross-linking-oxidation-kinetics"},
    {"anchor": "TB-500 reconstitution guidelines", "url": "/blog/tb-500-reconstitution-guidelines/", "slug": "tb-500-reconstitution-guidelines"},
    {"anchor": "CJC-1295 reconstitution and diluents", "url": "/blog/cjc-1295-reconstitution-diluent-compatibility/", "slug": "cjc-1295-reconstitution-diluent-compatibility"},
    {"anchor": "Epithalon tetrapeptide assay standards", "url": "/blog/epithalon-analytical-assay-standards/", "slug": "epithalon-analytical-assay-standards"},
    {"anchor": "GHK-Cu copper chelate stability", "url": "/blog/ghk-cu-storage-degradation-kinetics/", "slug": "ghk-cu-storage-degradation-kinetics"},
    {"anchor": "Ipamorelin moisture content analysis", "url": "/blog/ipamorelin-moisture-content-thermal-stability/", "slug": "ipamorelin-moisture-content-thermal-stability"},
    {"anchor": "Karl Fischer coulometric titration", "url": "/blog/ipamorelin-moisture-content-thermal-stability/", "slug": "ipamorelin-moisture-content-thermal-stability"},
    {"anchor": "KPV tripeptide HPLC separation", "url": "/blog/kpv-tripeptide-chromatographic-purity-assays/", "slug": "kpv-tripeptide-chromatographic-purity-assays"},
    {"anchor": "MOTS-c mitochondrial peptide half-life", "url": "/blog/motsc-mitochondrial-peptide-thermal-stability/", "slug": "motsc-mitochondrial-peptide-thermal-stability"},
    {"anchor": "PT-141 Bremelanotide degradation kinetics", "url": "/blog/pt-141-lyophilization-stability-kinetics/", "slug": "pt-141-lyophilization-stability-kinetics"},
    {"anchor": "Selank proteolytic cleavage resistance", "url": "/blog/selank-enzymatic-resistance-protocols/", "slug": "selank-enzymatic-resistance-protocols"},
    {"anchor": "Semax heptapeptide purity assays", "url": "/blog/semax-purity-testing-protocols/", "slug": "semax-purity-testing-protocols"},
    {"anchor": "AOD-9604 chromatographic separation", "url": "/blog/aod-9604-chromatographic-separation-profiles/", "slug": "aod-9604-chromatographic-separation-profiles"},
    # Compound Hubs
    {"anchor": "BPC-157 reference standard", "url": "/peptides/bpc-157/", "slug": "peptides-bpc-157"},
    {"anchor": "TB-500 reference standard", "url": "/peptides/tb-500/", "slug": "peptides-tb-500"},
    {"anchor": "CJC-1295 reference standard", "url": "/peptides/cjc-1295/", "slug": "peptides-cjc-1295"},
    {"anchor": "Ipamorelin reference standard", "url": "/peptides/ipamorelin/", "slug": "peptides-ipamorelin"},
    {"anchor": "Epithalon reference standard", "url": "/peptides/epithalon/", "slug": "peptides-epithalon"},
    {"anchor": "GHK-Cu reference standard", "url": "/peptides/ghk-cu/", "slug": "peptides-ghk-cu"},
    {"anchor": "Semax reference standard", "url": "/peptides/semax/", "slug": "peptides-semax"},
    {"anchor": "Selank reference standard", "url": "/peptides/selank/", "slug": "peptides-selank"},
    {"anchor": "AOD-9604 reference standard", "url": "/peptides/aod-9604/", "slug": "peptides-aod-9604"},
    {"anchor": "MOTS-c reference standard", "url": "/peptides/mots-c/", "slug": "peptides-mots-c"},
    {"anchor": "PT-141 reference standard", "url": "/peptides/pt-141/", "slug": "peptides-pt-141"},
    # Technical Hubs
    {"anchor": "analytical verification protocols", "url": "/verification/", "slug": "verification"},
    {"anchor": "HPLC purity verification", "url": "/verification/", "slug": "verification"},
    {"anchor": "reagent formats and vial specifications", "url": "/formats/", "slug": "formats"},
    {"anchor": "laboratory safety standards", "url": "/safety/", "slug": "safety"},
    {"anchor": "UK regulatory compliance tracker", "url": "/regulatory/mhra-tracker/", "slug": "mhra-tracker"},
    {"anchor": "verified chemical suppliers", "url": "/vendors/", "slug": "vendors"},
]

BANNED_CLICHES = [
    (r"\bInitial attempts to characterise[^\.]*\.", ""),
    (r"\bStability, however, remained a thorny issue[^\.]*\.", ""),
    (r"\bThis demonstrating the crucial need[^\.]*\.", ""),
    (r"\bVigilance in maintaining sample integrity[^\.]*\.", ""),
    (r"\bjudiciously\b", "deliberately"),
    (r"\bmeticulous\b", "exacting"),
    (r"\bmeticulously\b", "accurately"),
    (r"\bthorny issue\b", "analytical challenge"),
    (r"\beffectively mitigated\b", "resolved"),
    (r"\bmitigated\b", "reduced"),
    (r"\bprudent\b", "controlled"),
    (r"\bprudently\b", "carefully"),
    (r"\bstrategic approach\b", "methodological adjustment"),
    (r"\bvigilant\b", "continuous"),
    (r"\bvigilance\b", "rigorous monitoring"),
    (r"\bcrucial need\b", "requirement"),
    (r"\bnotable challenge\b", "baseline variance"),
    (r"\bunexpected baseline instability\b", "column equilibration variance"),
    (r"\bco-elution issues\b", "co-elution"),
    (r"\bin our bench assays\b", "in empirical analytical bench assays"),
    (r"\bIn our bench assays\b", "In empirical analytical bench assays"),
    (r"\bin our early method runs\b", "during preliminary method development"),
    (r"\bour\b", "the"),
    (r"\bwe\b", "analysts"),
    (r"\byou\b", "investigators"),
    (r"\byour\b", "laboratory"),
    (r"\bin conclusion\b", "summary of findings indicates"),
    (r"\bIn conclusion\b", "Summary of findings indicates"),
    (r"\bmoreover\b", "additionally,"),
    (r"\bfurthermore\b", "in parallel,"),
    (r"\bdelv(e|es|ed|ing)\b", "examine"),
    (r"\btapestry\b", "matrix"),
    (r"\bbeacon\b", "benchmark"),
    (r"\btestament\b", "evidence"),
    (r"\bplays a crucial role\b", "serves as a primary mechanism"),
    (r"\bunderscores the importance of\b", "highlights"),
    (r"\b\.\s*\.\s*\.", "."),
    (r"\s+\.\s+", ". ")
]


def call_gemini(prompt: str, sys_prompt: str) -> dict | None:
    """Calls Gemini 2.5 Flash with strict JSON response."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": sys_prompt}]},
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.82
        }
    }
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"Content-Type": "application/json"}, data=json.dumps(payload).encode("utf-8"))
            with urllib.request.urlopen(req, timeout=40) as resp:
                data = json.loads(resp.read().decode())
                txt = data["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(txt)
        except Exception as e:
            time.sleep(2)
    return None


def clean_text(text: str) -> str:
    """Removes banned copulas and AI clichés."""
    for pat, rep in BANNED_CLICHES:
        text = re.sub(pat, rep, text, flags=re.IGNORECASE)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'\s+\.', '.', text)
    text = re.sub(r'\.\s*\.', '.', text)
    return text


def inject_links(paragraphs: list[str], post_slug: str, targets: list[dict], max_links: int = 4) -> tuple[list[str], int]:
    """Injects contextual in-body links into paragraphs without nesting."""
    used_urls = set()
    links_placed = 0
    new_paragraphs = []
    
    candidates = [t for t in targets if t["slug"] != post_slug]
    candidates.sort(key=lambda x: len(x["anchor"]), reverse=True)
    
    for p in paragraphs:
        p_text = p
        if "<a " not in p_text and links_placed < max_links:
            for cand in candidates:
                if cand["url"] in used_urls:
                    continue
                pattern = rf'\b({re.escape(cand["anchor"])})\b'
                if re.search(pattern, p_text, flags=re.IGNORECASE):
                    def repl(m):
                        return f'<a href="{cand["url"]}" className="text-indigo-700 font-semibold hover:underline">{m.group(1)}</a>'
                    p_text = re.sub(pattern, repl, p_text, count=1, flags=re.IGNORECASE)
                    used_urls.add(cand["url"])
                    links_placed += 1
                    break
        new_paragraphs.append(p_text)
    return new_paragraphs, links_placed


def upgrade_single_post(file_path: Path) -> bool:
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    slug = data.get("slug", file_path.stem)
    title = data.get("title", "")
    keyword = data.get("targetKeyword", slug.replace("-", " "))
    compound = data.get("clusterName", "Synthetic Peptide")
    
    print(f"\n=======================================================")
    print(f"🚀 UPGRADING: {slug}")
    print(f"Title: {title}")
    print(f"=======================================================")

    # 1. Generate 4-bullet BLUF summary
    bluf_sys = """You are a master conversion-grade technical editor authoring an Executive BLUF (Bottom Line Up Front) summary block for an analytical peptide characterization monograph.
STRICT RULES:
1. Provide exactly 4 crisp, authoritative bullet points (30-40 words each).
2. Each bullet MUST open with a bold technical tag (e.g. '**Purity & Retention Window:**', '**Primary Cleavage Vector:**', '**Mobile Phase Resolution:**', '**Storage Temperature Mandate:**').
3. BURSTINESS: Mix short punchy clauses with concrete laboratory metrics (e.g. C18 silica, 0.1% TFA, pH 1.2, 2°C-8°C, >98.5% purity).
4. ZERO 1st/2nd person pronouns ('we', 'our', 'you', 'your').
5. ZERO clinical claims ('patients', 'therapy', 'treatment', 'dose').
6. Output raw JSON: {"bluf_bullets": ["**Tag:** Text...", "**Tag:** Text...", "**Tag:** Text...", "**Tag:** Text..."]}"""

    bluf_res = call_gemini(f"Author BLUF summary for {title} (Target Keyword: {keyword}).", bluf_sys)
    if bluf_res and "bluf_bullets" in bluf_res:
        data["tldr"] = "\n\n".join(bluf_res["bluf_bullets"])
        print(f"   ✅ [BLUF] Generated 4-bullet executive summary.")

    # 2. Upgrade each section
    sec_sys = """You are a senior analytical chemist and technical editor rewriting an analytical monograph section.
STRICT RULES:
1. HEADING: Convert into a conversational micro-intent question matching real search intent (e.g. 'How Does Simulated Gastric Acid Alter Pentadecapeptide Stability?').
2. THE 50-WORD RULE: Paragraph 1 MUST be a self-contained 40-50 word direct technical answer explaining the exact physical mechanism without introductory throat-clearing.
3. BURSTINESS: Mix short 3-6 word sentences with detailed technical observations. Never write uniform 20-word sentences. Paragraphs strictly under 4 lines.
4. BANNED CLICHES: Prohibit all academic fluff ('judiciously', 'meticulous', 'effectively mitigated', 'thorny issue', 'prudent', 'strategic approach', 'crucial', 'in conclusion', 'plays a key role', 'underscores', 'delve', 'tapestry', 'notable challenge', 'unexpected baseline instability').
5. COMPLIANCE: ZERO 1st-person ('we', 'our'), ZERO 2nd-person ('you', 'your'). In vitro chemical characterization only. No clinical/medical/patient claims. No commercial words.
Output raw JSON: {"heading": "Conversational Question?", "paragraphs": ["p1 50-word direct answer", "p2 technical details", "p3 storage/instrumentation"]}"""

    new_toc = []
    total_in_body_links = 0
    all_sections = data.get("sections", [])
    
    for idx, sec in enumerate(all_sections):
        old_h = sec.get("heading", f"Section {idx+1}")
        old_html = sec.get("contentHtml", "")
        old_text = re.sub(r'<[^>]+>', ' ', old_html).strip()
        
        print(f"   ✍️ [SECTION {idx+1}] Rewriting '{old_h}'...")
        prompt = f"Section Title: {old_h}\nDraft Content:\n{old_text[:1200]}\nRewrite adhering strictly to all 5 rules."
        res = call_gemini(prompt, sec_sys)
        
        if res and "heading" in res and "paragraphs" in res:
            new_h = res["heading"]
            paras = [clean_text(p) for p in res["paragraphs"]]
            
            # Inject internal links
            paras, placed = inject_links(paras, slug, ALL_TARGETS, max_links=1)
            total_in_body_links += placed
            
            sec["heading"] = new_h
            sec["contentHtml"] = "".join(f"<p>{p}</p>" for p in paras)
            new_toc.append({"id": sec.get("id", f"section-{idx+1}"), "title": new_h, "level": 2})
            print(f"      ✅ Transformed to: '{new_h}' (Links added: {placed})")
        else:
            print(f"      ⚠️ Gemini fallback for section {idx+1}; cleaning text.")
            cleaned = clean_text(old_html)
            sec["contentHtml"] = cleaned
            new_toc.append({"id": sec.get("id", f"section-{idx+1}"), "title": old_h, "level": 2})

    data["tableOfContents"] = new_toc
    print(f"   🔗 [INTERNAL LINKS] Injected {total_in_body_links} contextual in-body links.")

    # 3. Ensure Ahrefs meta tags
    if len(data.get("metaTitle", "")) > 60:
        data["metaTitle"] = data["metaTitle"][:57].rsplit(" ", 1)[0] + "..."
    if len(data.get("metaDescription", "")) > 160:
        data["metaDescription"] = data["metaDescription"][:157].rsplit(" ", 1)[0] + "..."

    # 4. Word count update
    total_words = sum(len(re.sub(r'<[^>]+>', ' ', s.get("contentHtml", "")).split()) for s in data.get("sections", []))
    total_words += len(data.get("tldr", "").split())
    data["wordCount"] = total_words
    data["readingTime"] = f"{max(8, total_words // 200)} min read"

    # Save
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"💾 [SAVED] {file_path.name} upgraded successfully! (Word count: {total_words})")
    return True


def main():
    post_files = sorted(list(POSTS_DIR.glob("*.json")))
    print(f"Found {len(post_files)} posts to upgrade.")
    for p in post_files:
        try:
            upgrade_single_post(p)
        except Exception as e:
            print(f"❌ Failed to upgrade {p.name}: {e}")
        time.sleep(1)


if __name__ == "__main__":
    main()
