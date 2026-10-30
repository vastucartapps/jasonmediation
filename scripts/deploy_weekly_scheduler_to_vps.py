#!/usr/bin/env python3
"""Deploy 104-week autonomous scheduler and clean state to Client VPS (129.121.94.176)."""
from __future__ import annotations
import json
import sys
import time
from pathlib import Path
import paramiko

SECRETS_FILE = Path(".secrets/client_vps.json")
RUNNER_LOCAL = Path("automation/contentflow/runner.py")
STATE_LOCAL = Path("automation/contentflow/db/state.json")
SCHEDULE_LOCAL = Path("automation/contentflow/db/two_year_schedule.json")

REMOTE_RUNNER_PATH = "/opt/contentflow/runner.py"
REMOTE_STATE_PATH = "/opt/contentflow/db/state.json"
REMOTE_SCHEDULE_PATH = "/opt/contentflow/db/two_year_schedule.json"


def run_ssh_cmd(client: paramiko.SSHClient, cmd: str, timeout: int = 60) -> str:
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

    # 1. Upload updated runner.py
    print(f"\n📤 [UPLOAD] {RUNNER_LOCAL} -> {REMOTE_RUNNER_PATH}...")
    sftp.put(str(RUNNER_LOCAL), REMOTE_RUNNER_PATH)
    run_ssh_cmd(client, f"chmod +x {REMOTE_RUNNER_PATH}")

    # 2. Upload clean state.json
    print(f"\n📤 [UPLOAD] {STATE_LOCAL} -> {REMOTE_STATE_PATH}...")
    sftp.put(str(STATE_LOCAL), REMOTE_STATE_PATH)

    # 3. Upload 104-week two_year_schedule.json
    print(f"\n📤 [UPLOAD] {SCHEDULE_LOCAL} -> {REMOTE_SCHEDULE_PATH}...")
    sftp.put(str(SCHEDULE_LOCAL), REMOTE_SCHEDULE_PATH)

    sftp.close()

    # 4. Verify remote runner CLI output
    print("\n🔍 [AUDIT REMOTE] Verifying remote runner.py next command...")
    run_ssh_cmd(client, f"/opt/contentflow/venv/bin/python3 {REMOTE_RUNNER_PATH} next")

    # 5. Restart ContentFlow systemd service
    print("\n🔄 [DAEMON] Restarting ContentFlow systemd service...")
    run_ssh_cmd(client, "systemctl restart contentflow-daemon")
    time.sleep(3)

    # 6. Check systemd status
    print("\n📊 [STATUS] Checking service active state...")
    run_ssh_cmd(client, "systemctl status contentflow-daemon --no-pager")

    # 7. Check recent journal logs
    print("\n📋 [LOGS] Reading last 25 lines of journalctl...")
    run_ssh_cmd(client, "journalctl -u contentflow-daemon -n 25 --no-pager")

    print("\n🎉 [SUCCESS] 104-week weekly scheduler deployed and verified in standby on VPS!")
    client.close()


if __name__ == "__main__":
    main()
