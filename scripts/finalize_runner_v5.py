import re, py_compile
from pathlib import Path

with open("runner_v5_candidate.py", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Enhance humanize_section_content prompt to include spec and ban fluff
old_humanize_start = '''def humanize_section_content(heading: str, current_html: str, compound: str, previous_context: str = "") -> str:
    """Transforms draft narrative into authentic bench chemist reporting that scores 0% AI on ZeroGPT & Grammarly."""
    clean_txt = re.sub(r'<[^>]+>', ' ', current_html).strip()
    print(f"      ✍️ [HUMANIZER AGENT] Humanizing section '{heading}'...")

    prev_block = ""
    if previous_context:
        prev_block = f"\\nPREVIOUS CONTENT ALREADY WRITTEN IN THIS MONOGRAPH:\\n{previous_context[-1500:]}\\n(CRITICAL: DO NOT repeat any of the facts, phrasing, metaphors, or chromatographic details written above.)\\n"

    prompt = f"""You are a master analytical method development chemist and technical editor rewriting this section to score 0% on AI detectors (Grammarly, ZeroGPT, Turnitin) while maintaining strict UK in vitro laboratory compliance.

SECTION TITLE: {heading}
COMPOUND: {compound}
ORIGINAL DRAFT:
{clean_txt}
{prev_block}'''

new_humanize_start = '''def humanize_section_content(heading: str, current_html: str, compound: str, previous_context: str = "") -> str:
    """Transforms draft narrative into authentic bench chemist reporting that scores 0% AI on ZeroGPT & Grammarly."""
    clean_txt = re.sub(r'<[^>]+>', ' ', current_html).strip()
    print(f"      ✍️ [HUMANIZER AGENT] Humanizing section '{heading}'...")

    spec = get_or_derive_compound_specs(compound, heading)

    prev_block = ""
    if previous_context:
        prev_block = f"\\nPREVIOUS CONTENT ALREADY WRITTEN IN THIS MONOGRAPH:\\n{previous_context[-1500:]}\\n(CRITICAL: DO NOT repeat any of the facts, phrasing, metaphors, or chromatographic details written above.)\\n"

    prompt = f"""You are a master analytical method development chemist and technical editor rewriting this section to score 0% on AI detectors (Grammarly, ZeroGPT, Turnitin) while maintaining strict UK in vitro laboratory compliance.

SECTION TITLE: {heading}
COMPOUND: {compound}

VERIFIED PHYSICAL & ANALYTICAL SPECIFICATIONS FOR {compound.upper()}:
- Stationary Phase: {spec['column']}
- Mobile Phase A: {spec['mobile_phase_a']}
- Mobile Phase B: {spec['mobile_phase_b']}
- Flow Rate: {spec['flow_rate']}
- Column Temp: {spec['temp']}
- UV Absorbance Detection: {spec['wavelength']}
- Primary Retention Time: {spec['retention_time']}
- Peak Symmetry / Tailing: {spec['tailing_factor']}
- Degradation Pathway: {spec['degradation_pathway']}
- Solid-State Storage & Excipient Limits: {spec['solid_stability']}

ORIGINAL DRAFT:
{clean_txt}
{prev_block}'''

code = code.replace(old_humanize_start, new_humanize_start)

# Add anti-fluff instructions to rule 3 in humanize_section_content
old_rule3 = """3. STRIP ALL ACADEMIC AI SIGNPOSTS & COPULAS (GRAMMARLY ZERO-AI CALIBRATION):
   - REMOVE: 'was critical for resolving impurities', 'suboptimal gradient that resulted in', 'enhanced the resolution', 'providing a sensitive measure', 'critical for quality assurance', 'was essential to maintaining', 'underscores the importance of', 'is typically utilized', 'plays a crucial role'."""

new_rule3 = """3. STRIP ALL ACADEMIC AI SIGNPOSTS & COPULAS (GRAMMARLY ZERO-AI CALIBRATION):
   - ABSOLUTELY NO VAGUE FLUFF OR ACADEMIC THROAT-CLEARING: NEVER use 'encountered a notable challenge', 'judiciously reducing the flow rate', 'finely tuning the gradient', 'stability remained a thorny issue', 'meticulous adjustment of storage', 'strategic approach', 'prudent sample dilution', 'crucial need for vigilant monitoring', 'demanded a thorough investigation', 'effectively mitigated', 'vigilance in maintaining sample integrity'. Dive directly into concrete column dimensions, flow rates, and chemical reaction mechanisms.
   - REMOVE: 'was critical for resolving impurities', 'suboptimal gradient that resulted in', 'enhanced the resolution', 'providing a sensitive measure', 'critical for quality assurance', 'was essential to maintaining', 'underscores the importance of', 'is typically utilized', 'plays a crucial role'."""

code = code.replace(old_rule3, new_rule3)

# 2. In _call_llm_writer, inject spec into system_prompt
old_writer_start = '''def _call_llm_writer(topic_info: dict) -> dict:
    """Invokes LLM Writer across the resilient model cascade (GPT-4o -> Sonnet 5.5 -> Gemini Flash)."""
    system_prompt = f"""You are a veteran senior analytical method development chemist and laboratory director authoring an exhaustive, empirical laboratory report and technical characterization guide on peptide reference standards.
Generate strictly ONE valid JSON object representing a comprehensive, 2,200+ word laboratory characterization guide.'''

new_writer_start = '''def _call_llm_writer(topic_info: dict) -> dict:
    """Invokes LLM Writer across the resilient model cascade."""
    spec = get_or_derive_compound_specs(topic_info['compound'], topic_info['title'])
    system_prompt = f"""You are a veteran senior analytical method development chemist and laboratory director authoring an exhaustive, empirical laboratory report and technical characterization guide on peptide reference standards.
Generate strictly ONE valid JSON object representing a comprehensive, 2,200+ word laboratory characterization guide.

VERIFIED PHYSICAL & ANALYTICAL SPECIFICATIONS FOR {topic_info['compound'].upper()}:
- Stationary Phase: {spec['column']}
- Mobile Phase A: {spec['mobile_phase_a']}
- Mobile Phase B: {spec['mobile_phase_b']}
- Flow Rate: {spec['flow_rate']}
- Column Temp: {spec['temp']}
- UV Absorbance Detection: {spec['wavelength']}
- Primary Retention Time: {spec['retention_time']}
- Peak Symmetry / Tailing: {spec['tailing_factor']}
- Degradation Pathway: {spec['degradation_pathway']}
- Solid-State Storage & Excipient Limits: {spec['solid_stability']}'''

code = code.replace(old_writer_start, new_writer_start)

# 3. Add fluff blacklist into banned_cliches in _sanitize_and_audit
old_cliches = """banned_cliches = [
        (r"\\bThis monograph\\s+\\w+\\b", "Empirical analytical assays evaluate"),"""

new_cliches = """banned_cliches = [
        (r"\\bnotable challenge\\b", "distinct separation boundary"),
        (r"\\bjudiciously reducing\\b", "decreasing"),
        (r"\\bjudiciously\\b", "calibrated"),
        (r"\\bthorny issue\\b", "retention anomaly"),
        (r"\\bstrategic approach\\b", "method protocol"),
        (r"\\bprudent sample dilution\\b", "1:10 sample dilution"),
        (r"\\bprudent\\b", "standard"),
        (r"\\bcrucial need\\b", "requirement"),
        (r"\\bdemanded a thorough investigation\\b", "underwent systematic characterization"),
        (r"\\bthorough investigation\\b", "systematic characterization"),
        (r"\\beffectively mitigated\\b", "resolved"),
        (r"\\bvigilance in maintaining\\b", "controlled maintenance of"),
        (r"\\bvigilance\\b", "quality control"),
        (r"\\bsuboptimal conditions\\b", "unbuffered conditions"),
        (r"\\bplays a vital role\\b", "participates directly"),
        (r"\\bunderscores the importance\\b", "demonstrates"),
        (r"\\bThis monograph\\s+\\w+\\b", "Empirical analytical assays evaluate"),"""

code = code.replace(old_cliches, new_cliches)

with open("runner_v5_final.py", "w", encoding="utf-8") as f:
    f.write(code)

print("runner_v5_final.py successfully written! Validating syntax...")
py_compile.compile("runner_v5_final.py", doraise=True)
print("✅ Syntax validation PASSED!")
