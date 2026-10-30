import json, re, paramiko
from pathlib import Path

with open('.secrets/client_vps.json') as f:
    c = json.load(f)

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(c['host'], port=c.get('port', 22), username=c['user'], password=c['pass'], timeout=10)

posts = [
    "epithalon-analytical-assay-standards",
    "cjc-1295-reconstitution-diluent-compatibility",
    "ghk-cu-storage-degradation-kinetics",
    "semax-purity-testing-protocols",
    "ipamorelin-moisture-content-thermal-stability",
    "bpc-157-tb-500-blend-stability-protocols",
    "bpc-157-stability-protocols",
    "tb-500-reconstitution-guidelines",
    "bpc-157-gastric-juice-stability-profiles",
    "pt-141-lyophilization-stability-kinetics",
    "selank-enzymatic-resistance-protocols"
]

banned_patterns = [
    r"notable challenge", r"judiciously reducing", r"thorny issue",
    r"strategic approach", r"prudent sample dilution", r"crucial need",
    r"vigilant monitoring", r"effectively mitigated", r"vigilance in maintaining"
]

pronouns = [r"\bwe\b", r"\bour\b", r"\bus\b", r"\byou\b", r"\byour\b"]

sftp = client.open_sftp()
print(f"{'Slug':<45} | {'Words':>5} | {'Fluff':>5} | {'Pronouns':>8} | {'Units':>5} | {'Imgs':>4}")
print("-" * 85)

for slug in posts:
    fpath = f"/var/www/aminoacidsupplements-src/content/posts/{slug}.json"
    try:
        with sftp.open(fpath, 'r') as f:
            d = json.load(f)
    except Exception:
        continue
    full_text = " ".join([s.get("contentHtml", "") for s in d.get("sections", [])])
    clean = re.sub(r"<[^>]+>", " ", full_text)
    
    fluff_count = sum(len(re.findall(p, clean, re.I)) for p in banned_patterns)
    pronoun_count = sum(len(re.findall(p, clean, re.I)) for p in pronouns)
    
    unit_matches = re.findall(r"\b(\d+(?:\.\d+)?\s*(?:mL/min|°C|nm|µm|mm|min|pH|%|mM|g/mol|m/z|kV|Da))\b", clean)
    img_count = sum(1 for s in d.get("sections", []) if "image" in s) + (1 if "heroImage" in d else 0)
    
    print(f"{slug:<45} | {d.get('wordCount', 0):>5} | {fluff_count:>5} | {pronoun_count:>8} | {len(unit_matches):>5} | {img_count:>4}")

client.close()
