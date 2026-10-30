#!/usr/bin/env python3
"""Deploy technical fixes, rich schemas, performance optimizations, and photorealistic imagery to VPS."""
import os
import glob
import json
import paramiko
from pathlib import Path

LOCAL_BASE = Path("/mnt/d/Jason Local Sites/mediation new/gemini/Sites/peptides/aminoacidsupplements")
REMOTE_SRC = "/var/www/aminoacidsupplements-src"
REMOTE_WEB = "/var/www/aminoacidsupplements"

def main():
    print("🚀 Connecting to VPS (129.121.94.176)...")
    with open(".secrets/client_vps.json") as f:
        creds = json.load(f)

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(creds["host"], port=creds.get("port", 22), username=creds["user"], password=creds["pass"])
    sftp = ssh.open_sftp()

    def remote_mkdir_p(remote_path):
        dirs = []
        p = remote_path
        while p and p != "/":
            dirs.append(p)
            p = os.path.dirname(p)
        for d in reversed(dirs):
            try:
                sftp.mkdir(d)
            except IOError:
                pass

    files_to_sync = [
        "package.json",
        "next.config.ts",
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/blog/page.tsx",
        "src/app/blog/[slug]/page.tsx",
        "src/app/safety/page.tsx",
        "src/app/peptides/[slug]/page.tsx",
        "src/components/Footer.tsx",
        "src/components/AminoReagentCard.tsx",
        "src/components/AminoFaqAccordion.tsx",
        "src/components/MatomoTracker.tsx",
        "public/ai-catalog.json",
        "public/.well-known/ai-catalog.json"
    ]

    # Add all posts
    for post in glob.glob(str(LOCAL_BASE / "content/posts/*.json")):
        rel = os.path.relpath(post, str(LOCAL_BASE))
        files_to_sync.append(rel)

    # Add all post images
    for img in glob.glob(str(LOCAL_BASE / "public/images/posts/*.webp")):
        rel = os.path.relpath(img, str(LOCAL_BASE))
        files_to_sync.append(rel)

    print(f"📦 Uploading {len(files_to_sync)} updated files to {REMOTE_SRC}...")
    for rel in files_to_sync:
        local_p = LOCAL_BASE / rel
        remote_p = f"{REMOTE_SRC}/{rel}"
        remote_mkdir_p(os.path.dirname(remote_p))
        sftp.put(str(local_p), remote_p)
        print(f"   ✓ Uploaded: {rel}")

    # Also directly copy ai-catalog.json to remote webroot
    print("🌐 Ensuring ai-catalog.json in webroot...")
    remote_mkdir_p(f"{REMOTE_WEB}/.well-known")
    sftp.put(str(LOCAL_BASE / "public/ai-catalog.json"), f"{REMOTE_WEB}/ai-catalog.json")
    sftp.put(str(LOCAL_BASE / "public/.well-known/ai-catalog.json"), f"{REMOTE_WEB}/.well-known/ai-catalog.json")

    # Upload updated Nginx configurations
    print("⚙️ Uploading optimized Nginx configurations...")
    sftp.put("scripts/nginx/swanmediation.conf", "/etc/nginx/sites-available/swanmediation.conf")
    sftp.put("scripts/nginx/aminoacidsupplements.conf", "/etc/nginx/sites-available/aminoacidsupplements.conf")

    sftp.close()

    print("\n⚙️ Testing & Reloading Nginx, then building Next.js on VPS...")
    cmd = f"""
nginx -t && systemctl reload nginx && \
cd {REMOTE_SRC} && pnpm build && \
cp -r {REMOTE_SRC}/out/* {REMOTE_WEB}/ && \
cp {REMOTE_SRC}/public/ai-catalog.json {REMOTE_WEB}/ai-catalog.json && \
mkdir -p {REMOTE_WEB}/.well-known && \
cp {REMOTE_SRC}/public/.well-known/ai-catalog.json {REMOTE_WEB}/.well-known/ai-catalog.json && \
chown -R www-data:www-data {REMOTE_WEB}
"""
    stdin, stdout, stderr = ssh.exec_command(cmd)
    
    for line in stdout:
        print(line, end="")
    for line in stderr:
        print(line, end="")

    exit_code = stdout.channel.recv_exit_status()
    print(f"\n✅ VPS Deployment Finished with exit code: {exit_code}")
    ssh.close()

if __name__ == "__main__":
    main()
