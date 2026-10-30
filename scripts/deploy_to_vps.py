#!/usr/bin/env python3
"""Deploy upgraded articles and ContentFlow runner to Client VPS (129.121.94.176)."""
from __future__ import annotations
import json
import os
import sys
import time
from pathlib import Path
import paramiko

SECRETS_FILE = Path(".secrets/client_vps.json")
POSTS_LOCAL = Path("Sites/aminoacidsupplements/content/posts")
RUNNER_LOCAL = Path("automation/contentflow/runner.py")

REMOTE_POSTS_DIR = "/var/www/aminoacidsupplements-src/content/posts"
REMOTE_RUNNER_PATH = "/opt/contentflow/runner.py"
REMOTE_SRC_DIR = "/var/www/aminoacidsupplements-src"
REMOTE_WEB_DIR = "/var/www/aminoacidsupplements"


def run_ssh_cmd(client: paramiko.SSHClient, cmd: str, timeout: int = 180):
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
    if not SECRETS_FILE.exists():
        print(f"❌ Secrets file not found at {SECRETS_FILE}")
        sys.exit(1)

    with open(SECRETS_FILE) as f:
        creds = json.load(f)

    print(f"🔌 Connecting to VPS {creds['host']} as {creds['user']}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(creds["host"], port=creds["port"], username=creds["user"], password=creds["pass"], timeout=15)
    print("✅ Connected via SSH.")

    sftp = client.open_sftp()
    print("✅ SFTP channel opened.")

    # 1. Upload runner.py
    print(f"\n📤 [UPLOAD] Uploading {RUNNER_LOCAL} -> {REMOTE_RUNNER_PATH}...")
    sftp.put(str(RUNNER_LOCAL), REMOTE_RUNNER_PATH)
    run_ssh_cmd(client, f"chmod +x {REMOTE_RUNNER_PATH}")

    # 2. Upload all 15 post JSONs
    json_files = list(POSTS_LOCAL.glob("*.json"))
    print(f"\n📤 [UPLOAD] Uploading {len(json_files)} upgraded post JSON files to {REMOTE_POSTS_DIR}...")
    for jf in json_files:
        remote_dest = f"{REMOTE_POSTS_DIR}/{jf.name}"
        sftp.put(str(jf), remote_dest)
        print(f"   ✓ Uploaded {jf.name}")

    sftp.close()

    # 3. Check internal links count on remote
    print("\n🔍 [AUDIT] Checking internal links across remote posts...")
    run_ssh_cmd(client, f"grep -rn 'href=' {REMOTE_POSTS_DIR} | wc -l")

    # 4. Rebuild Next.js static site on VPS (runs on native NVMe ext4, takes ~25s)
    print("\n🏗️ [BUILD] Compiling Next.js static production export...")
    run_ssh_cmd(client, f"cd {REMOTE_SRC_DIR} && pnpm build")

    # 5. Sync static export to production webroot
    print("\n🌐 [DEPLOY] Syncing static build output to production webroot...")
    run_ssh_cmd(client, f"cp -r {REMOTE_SRC_DIR}/out/* {REMOTE_WEB_DIR}/ && chown -R www-data:www-data {REMOTE_WEB_DIR}")

    # 6. Restart daemon
    print("\n🔄 [DAEMON] Restarting ContentFlow systemd service...")
    run_ssh_cmd(client, "systemctl restart contentflow-daemon")
    time.sleep(2)
    run_ssh_cmd(client, "systemctl status contentflow-daemon --no-pager")

    print("\n🎉 [SUCCESS] Deployment completed flawlessly!")
    client.close()


if __name__ == "__main__":
    main()
