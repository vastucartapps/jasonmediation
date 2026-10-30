import json, paramiko
from pathlib import Path

with open('.secrets/client_vps.json') as f:
    c = json.load(f)

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(c['host'], port=c.get('port', 22), username=c['user'], password=c['pass'], timeout=10)

sftp = client.open_sftp()
posts_dir = "/var/www/aminoacidsupplements-src/content/posts"

print("Uploading clean MOTS-c monograph...")
sftp.put("motsc_clean.json", f"{posts_dir}/motsc-mitochondrial-peptide-thermal-stability.json")

print("Uploading clean TB-500 cross-linking monograph...")
sftp.put("tb500_clean.json", f"{posts_dir}/tb-500-cross-linking-oxidation-kinetics.json")

# Polish remaining minor phrases
polish_cmd = '''
python3 -c '
import json
from pathlib import Path

posts_dir = Path(\"/var/www/aminoacidsupplements-src/content/posts\")

replacements = {
    \"aod-9604-chromatographic-separation-profiles.json\": [
        (\"Mobile phase optimization isn\\x27t straightforward.\", \"Mobile phase optimization requires precise ionic equilibration.\")
    ],
    \"cjc-1295-reconstitution-diluent-compatibility.json\": [
        (\"Reconstitution challenges arise from deamidation\", \"Reconstitution degradation mechanisms stem from deamidation\")
    ],
    \"epithalon-analytical-assay-standards.json\": [
        (\"presents distinct analytical challenges due to\", \"exhibits distinct chromatographic characteristics due to\"),
        (\"Karl Fischer analysis is crucial, as deviations\", \"Karl Fischer analysis is mandatory, as deviations\")
    ],
    \"selank-enzymatic-resistance-protocols.json\": [
        (\"Analytical challenges arise from Selank Heptapeptide\\x27s\", \"Analytical separation parameters stem from Selank Heptapeptide\\x27s\")
    ]
}

for fname, reps in replacements.items():
    fpath = posts_dir / fname
    with open(fpath, \"r\", encoding=\"utf-8\") as f:
        data = json.load(f)
    changed = False
    for sec in data.get(\"sections\", []):
        html = sec.get(\"contentHtml\", \"\")
        for old, new in reps:
            if old in html:
                sec[\"contentHtml\"] = html.replace(old, new)
                changed = True
                print(f\"Polished {fname}: {old} -> {new}\")
    if changed:
        with open(fpath, \"w\", encoding=\"utf-8\") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f\"✅ Successfully saved polished {fname}\")
'
'''
stdin, stdout, stderr = client.exec_command(polish_cmd)
print(stdout.read().decode())
print(stderr.read().decode())

client.close()
print("🎉 Upload & Polish Complete!")
