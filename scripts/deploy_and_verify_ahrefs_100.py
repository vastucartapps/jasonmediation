#!/usr/bin/env python3
"""Sync updated Next.js source to VPS, compile static site, update Nginx, and run Ahrefs 100/100 audit."""
from __future__ import annotations
import json
import time
from pathlib import Path
import paramiko

SECRETS_FILE = Path(".secrets/client_vps.json")
LOCAL_SRC = Path("Sites/peptides/aminoacidsupplements")
if not LOCAL_SRC.exists():
    LOCAL_SRC = Path("Sites/aminoacidsupplements")
REMOTE_SRC = "/var/www/aminoacidsupplements-src"
REMOTE_WEB = "/var/www/aminoacidsupplements"


def run_ssh_cmd(client: paramiko.SSHClient, cmd: str, timeout: int = 120) -> str:
    print(f"\n🚀 [EXEC REMOTE] {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    exit_status = stdout.channel.recv_exit_status()
    out = stdout.read().decode().strip()
    err = stderr.read().decode().strip()
    if out:
        print(f"--- STDOUT ---\n{out}")
    if err:
        print(f"--- STDERR ---\n{err}")
    if exit_status != 0:
        raise RuntimeError(f"Command failed with exit status {exit_status}: {cmd}")
    return out


def main():
    with open(SECRETS_FILE) as f:
        creds = json.load(f)

    print(f"🔌 Connecting to VPS {creds['host']} as {creds['user']}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(creds["host"], port=creds["port"], username=creds["user"], password=creds["pass"], timeout=15)
    print("✅ Connected via SSH.")

    sftp = client.open_sftp()

    # Files to upload
    files_to_sync = [
        "src/data/compounds.ts",
        "src/data/site.ts",
        "src/components/HeroSpectrum.tsx",
        "src/app/layout.tsx",
    ]

    print("\n📤 [UPLOAD] Syncing updated source files to VPS...")
    for rel in files_to_sync:
        loc = LOCAL_SRC / rel
        rem = f"{REMOTE_SRC}/{rel}"
        sftp.put(str(loc), rem)
        print(f"   ✓ Uploaded {rel}")

    sftp.close()

    # 1. Run Next.js static build on VPS
    print("\n🏗️ [BUILD] Running pnpm build on VPS...")
    run_ssh_cmd(client, f"cd {REMOTE_SRC} && pnpm build")

    # 2. Deploy static output to production webroot
    print("\n🌐 [DEPLOY] Syncing static build output to production webroot...")
    run_ssh_cmd(client, f"cp -r {REMOTE_SRC}/out/* {REMOTE_WEB}/ && chown -R www-data:www-data {REMOTE_WEB}")

    # 3. Update Nginx server_name for aminoacidsupplements.co
    print("\n🔧 [NGINX] Updating Nginx server_name to include aminoacidsupplements.co...")
    nginx_conf = """server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name swanmediation.online www.swanmediation.online *.swanmediation.online aminoacidsupplements.co www.aminoacidsupplements.co 129.121.94.176;

    ssl_certificate /etc/nginx/ssl/swanmediation.crt;
    ssl_certificate_key /etc/nginx/ssl/swanmediation.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets on;

    root /var/www/aminoacidsupplements;
    index index.html;

    # Enterprise Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Next.js Static Asset Hash Chunks (1 Year Immutable Cache)
    location ^~ /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # High-Performance Image Caching (30 Days Immutable)
    location ~* ^/images/.*\\.(webp|png|jpg|jpeg|svg|gif|ico)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }

    # Webfonts
    location ~* \\.(woff|woff2|ttf|otf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Discovery & Structured Sitemaps (1 Day Freshness)
    location ~* \\.(xml|txt|xsl)$ {
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
    }

    # Next.js Static Clean Routing
    location / {
        try_files $uri $uri/ $uri.html /index.html =404;
    }

    error_page 404 /404.html;
}
"""
    # Write conf to /etc/nginx/sites-available/swanmediation.conf
    sftp = client.open_sftp()
    with sftp.open("/etc/nginx/sites-available/swanmediation.conf", "w") as f:
        f.write(nginx_conf)
    sftp.close()

    run_ssh_cmd(client, "nginx -t && systemctl reload nginx")

    # 4. Run Ahrefs Audit on VPS
    print("\n🔍 [AUDIT] Running full Ahrefs 100/100 audit on VPS...")
    run_ssh_cmd(client, "/opt/contentflow/venv/bin/python3 /tmp/audit_ahrefs.py")

    # 5. Run Heading Hierarchy Audit on VPS
    heading_script = """
import glob
from bs4 import BeautifulSoup

html_files = glob.glob('/var/www/aminoacidsupplements/**/*.html', recursive=True)
issues = []

for hf in html_files:
    if '404' in hf: continue
    with open(hf, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    levels = [int(h.name[1]) for h in headings]
    
    # Check H1 count
    h1_count = levels.count(1)
    if h1_count != 1:
        issues.append(f'{hf}: H1 count is {h1_count}')
        
    # Check skipped levels
    for i in range(len(levels) - 1):
        if levels[i+1] > levels[i] + 1:
            issues.append(f'{hf}: Skipped level H{levels[i]} -> H{levels[i+1]}')

print(f'Audited {len(html_files)} pages.')
if not issues:
    print('🏆 PERFECT HEADING HIERARCHY: Zero skipped levels, exactly one H1 per page!')
else:
    print(f'Found {len(issues)} heading hierarchy issues:')
    for iss in issues[:20]:
        print(' -', iss)
"""
    run_ssh_cmd(client, f"/opt/contentflow/venv/bin/python3 -c \"{heading_script}\"")

    client.close()


if __name__ == "__main__":
    main()
