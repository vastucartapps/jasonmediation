#!/usr/bin/env python3
"""
Automated Live FTPS Backup Script
Recursively downloads the exact current live state from cPanel FTPS for both
aldertonfamilymediation and cavendishfamilymediation into local backup folders.
"""

import os
import sys
import ftplib
import time
from pathlib import Path

HOST = "s688.lon1.mysecurecloudhost.com"
PORT = 21
PASSWORD = "eOfia5JLHt6D2qNhdgmLw35z"

SITES = [
    {
        "name": "alderton",
        "user": "alderton@mediationdirect.co.uk",
        "backup_dir": Path(__file__).resolve().parent.parent / "backups" / "live_backup_pre_ahrefs_fix" / "alderton",
    },
    {
        "name": "cavendish",
        "user": "cavendish@mediationdirect.co.uk",
        "backup_dir": Path(__file__).resolve().parent.parent / "backups" / "live_backup_pre_ahrefs_fix" / "cavendish",
    },
]

def download_dir(ftp, remote_dir, local_dir):
    """
    Recursively download a directory from FTP server to local directory.
    """
    local_dir.mkdir(parents=True, exist_ok=True)
    ftp.cwd(remote_dir)
    
    entries = []
    ftp.retrlines('MLSD', entries.append)
    
    for entry in entries:
        parts = entry.split(';')
        name = parts[-1].strip()
        if name in ('.', '..'):
            continue
            
        facts = {}
        for p in parts[:-1]:
            if '=' in p:
                k, v = p.split('=', 1)
                facts[k.lower()] = v
                
        entry_type = facts.get('type', '')
        remote_path = f"{remote_dir}/{name}" if remote_dir != '/' else f"/{name}"
        local_path = local_dir / name
        
        if entry_type == 'dir':
            download_dir(ftp, remote_path, local_path)
            ftp.cwd(remote_dir)
        elif entry_type == 'file':
            # Download file
            print(f"  Downloading: {remote_path} -> {local_path.name}")
            with open(local_path, 'wb') as f:
                ftp.retrbinary(f"RETR {name}", f.write)

def backup_site(site):
    name = site["name"]
    user = site["user"]
    backup_dir = site["backup_dir"]
    
    print(f"\n==========================================")
    print(f" Starting Live Backup for: {name.upper()}")
    print(f" User: {user}")
    print(f" Destination: {backup_dir}")
    print(f"==========================================")
    
    ftp = ftplib.FTP_TLS()
    ftp.connect(HOST, PORT, timeout=30)
    ftp.auth()
    ftp.login(user, PASSWORD)
    ftp.prot_p()
    ftp.set_pasv(True)
    
    print(f"Connected and authenticated. Remote root: {ftp.pwd()}")
    
    start_time = time.time()
    download_dir(ftp, '/', backup_dir)
    
    ftp.quit()
    duration = time.time() - start_time
    print(f"Completed backup for {name} in {duration:.1f}s.")

def main():
    print("Initiating full live FTPS backup for all sites...")
    for site in SITES:
        backup_site(site)
    print("\nAll live sites backed up successfully!")

if __name__ == "__main__":
    main()
