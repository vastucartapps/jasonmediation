import json, re, paramiko
from pathlib import Path

with open('.secrets/client_vps.json') as f:
    c = json.load(f)

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(c['host'], port=c.get('port', 22), username=c['user'], password=c['pass'], timeout=10)

banned_patterns = [
    r"notable challenge", r"judiciously reducing", r"thorny issue",
    r"strategic approach", r"prudent sample dilution", r"crucial need",
    r"vigilant monitoring", r"effectively mitigated", r"vigilance in maintaining",
    r"delve into", r"tapestry", r"beacon", r"plays a vital role", r"underscores the importance"
]

pronouns = [r"\bwe\b", r"\bour\b", r"\bus\b", r"\byou\b", r"\byour\b"]

sftp = client.open_sftp()
stdin, stdout, stderr = client.exec_command('ls -1 /var/www/aminoacidsupplements-src/content/posts/*.json')
all_files = [line.strip() for line in stdout.read().decode().splitlines() if line.strip()]

print(f"{'Post Slug':<52} | {'Words':>5} | {'Fluff':>5} | {'Pronouns':>8} | {'Units':>5} | {'Imgs':>4}")
print("=" * 95)

total_words = 0
total_fluff = 0
total_pronouns = 0

for fpath in sorted(all_files):
    slug = Path(fpath).stem
    try:
        with sftp.open(fpath, 'r') as f:
            d = json.load(f)
    except Exception as ex:
        print(f"Error reading {slug}: {ex}")
        continue
    full_text = " ".join([s.get("contentHtml", "") for s in d.get("sections", [])])
    clean = re.sub(r"<[^>]+>", " ", full_text)
    
    fluff_count = sum(len(re.findall(p, clean, re.I)) for p in banned_patterns)
    pronoun_count = sum(len(re.findall(p, clean, re.I)) for p in pronouns)
    
    unit_matches = re.findall(r"\b(\d+(?:\.\d+)?\s*(?:mL/min|°C|nm|µm|mm|min|pH|%|mM|g/mol|m/z|kV|Da))\b", clean)
    img_count = sum(1 for s in d.get("sections", []) if "image" in s) + (1 if "heroImage" in d else 0)
    
    words = d.get('wordCount', len(clean.split()))
    total_words += words
    total_fluff += fluff_count
    total_pronouns += pronoun_count
    
    print(f"{slug:<52} | {words:>5} | {fluff_count:>5} | {pronoun_count:>8} | {len(unit_matches):>5} | {img_count:>4}")

print("=" * 95)
print(f"TOTAL: {len(all_files)} posts | Words: {total_words} | Fluff: {total_fluff} | Pronouns: {total_pronouns}")

client.close()
