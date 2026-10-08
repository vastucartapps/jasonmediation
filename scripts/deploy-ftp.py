#!/usr/bin/env python3
"""
Automated cPanel FTPS Static Deployment Engine
Recursively uploads static Next.js export files (HTML, CSS, JS, WebP, XML, TXT, .htaccess)
to the target remote root directory via FTP over explicit TLS (FTPS).
"""

import os
import sys
import argparse
import ftplib
import time
from pathlib import Path

def ensure_remote_dir(ftp, rel_dir, base_dir="/"):
    """
    Ensures a remote directory exists by walking down from base_dir.
    Leaves the FTP connection's working directory at rel_dir under base_dir.
    """
    ftp.cwd(base_dir)
    if not rel_dir or rel_dir in ('.', '/'):
        return

    parts = [p for p in rel_dir.replace('\\', '/').strip('/').split('/') if p]
    for part in parts:
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            try:
                ftp.mkd(part)
            except ftplib.error_perm:
                pass
            ftp.cwd(part)

import socket

socket.setdefaulttimeout(30)

def connect_ftp(host, user, password, port, use_tls=True):
    print(f"Connecting to {host}:{port} via {'FTPS (explicit TLS)' if use_tls else 'standard FTP'}...")
    if use_tls:
        ftp = ftplib.FTP_TLS(timeout=30)
        ftp.connect(host, port, timeout=30)
        ftp.auth()
        ftp.login(user, password)
        ftp.prot_p()
    else:
        ftp = ftplib.FTP(timeout=30)
        ftp.connect(host, port, timeout=30)
        ftp.login(user, password)

    ftp.set_pasv(True)
    return ftp

def get_remote_file_sizes(ftp):
    sizes = {}
    try:
        for name, facts in ftp.mlsd():
            if facts.get('type') == 'file':
                try:
                    sizes[name] = int(facts.get('size', -1))
                except (ValueError, TypeError):
                    pass
    except Exception:
        pass
    return sizes

def deploy_export(host, user, password, port, source_dir, target_dir="/", use_tls=True):
    source_path = Path(source_dir).resolve()
    if not source_path.is_dir():
        print(f"Error: Source directory '{source_path}' does not exist.")
        sys.exit(1)

    ftp = connect_ftp(host, user, password, port, use_tls)
    print(f"Authenticated successfully as {user}. Remote root: {ftp.pwd()}")

    # Collect all local files
    all_files = []
    for root, _, files in os.walk(source_path):
        rel_dir = os.path.relpath(root, source_path)
        for f in files:
            local_file = os.path.join(root, f)
            all_files.append((local_file, rel_dir, f))

    total_files = len(all_files)
    total_bytes = sum(os.path.getsize(f[0]) for f in all_files)
    print(f"Discovered {total_files} files ({total_bytes / (1024 * 1024):.2f} MB) to deploy.\n", flush=True)

    uploaded_count = 0
    skipped_count = 0
    uploaded_bytes = 0
    start_time = time.time()

    current_dir = None
    remote_sizes = {}

    for idx, (local_file, rel_dir, filename) in enumerate(all_files, 1):
        file_size = os.path.getsize(local_file)

        # Switch remote directory if changed
        if rel_dir != current_dir:
            ensure_remote_dir(ftp, rel_dir, base_dir=target_dir)
            current_dir = rel_dir
            remote_sizes = get_remote_file_sizes(ftp)

        # Smart delta sync:
        # Static media (images, fonts, pdfs, icons) and hashed chunks can be safely skipped if exact size matches
        is_static_asset = filename.lower().endswith(
            ('.webp', '.jpg', '.jpeg', '.png', '.woff', '.woff2', '.pdf', '.ico', '.txt', '.svg', '.mp4')
        ) or ('_next' in rel_dir and filename.lower().endswith(('.js', '.css')))

        if is_static_asset and filename in remote_sizes and remote_sizes[filename] == file_size:
            skipped_count += 1
            if idx % 25 == 0 or idx == total_files:
                percent = (idx / total_files) * 100
                print(f"[{idx:3d}/{total_files:3d}] ({percent:5.1f}%) [SYNCED] -> {rel_dir}/{filename}", flush=True)
            continue

        # Upload file with automatic reconnect retry
        success = False
        for attempt in range(3):
            try:
                with open(local_file, 'rb') as fp:
                    ftp.storbinary(f'STOR {filename}', fp)
                success = True
                break
            except Exception as err:
                print(f"Warning: retry {attempt + 1}/3 uploading {filename}: {err}", flush=True)
                time.sleep(1.5)
                try:
                    ftp.close()
                except Exception:
                    pass
                try:
                    ftp = connect_ftp(host, user, password, port, use_tls)
                    ensure_remote_dir(ftp, rel_dir, base_dir=target_dir)
                    remote_sizes = get_remote_file_sizes(ftp)
                except Exception as reconnect_err:
                    print(f"Reconnect error: {reconnect_err}", flush=True)

        if not success:
            print(f"FAILED to upload: {local_file} -> {rel_dir}/{filename}", flush=True)
            sys.exit(1)

        uploaded_count += 1
        uploaded_bytes += file_size

        remote_display = f"{rel_dir}/{filename}".replace('.//', '').replace('\\', '/')
        if rel_dir == '.':
            remote_display = f"/{filename}"

        if idx % 10 == 0 or idx == total_files or idx <= 5:
            percent = (idx / total_files) * 100
            print(f"[{idx:3d}/{total_files:3d}] ({percent:5.1f}%) [UPLOADED] -> {remote_display} ({file_size / 1024:.1f} KB)", flush=True)

    try:
        ftp.cwd('/')
        ftp.quit()
    except Exception:
        pass

    duration = time.time() - start_time
    print(f"\n==========================================", flush=True)
    print(f" Deployment Completed Successfully!", flush=True)
    print(f" Total Files:   {total_files} (Uploaded: {uploaded_count}, Skipped: {skipped_count})", flush=True)
    print(f" Uploaded Size: {uploaded_bytes / (1024 * 1024):.2f} MB", flush=True)
    print(f" Elapsed Time:  {duration:.1f} seconds", flush=True)
    print(f"==========================================\n", flush=True)

def main():
    parser = argparse.ArgumentParser(description="Deploy static Next.js export to cPanel via FTPS")
    parser.add_argument("--host", default="s688.lon1.mysecurecloudhost.com", help="FTP Host")
    parser.add_argument("--user", default="portfolio@mediationdirect.co.uk", help="FTP Username")
    parser.add_argument("--password", default="eOfia5JLHt6D2qNhdgmLw35z", help="FTP Password")
    parser.add_argument("--port", type=int, default=21, help="FTP Port (default: 21)")
    parser.add_argument("--source", default="Sites/trustlypharma/out", help="Local export directory")
    parser.add_argument("--target-dir", default="/", help="Remote base directory (e.g. / or /trustlypharma.co.uk)")
    parser.add_argument("--no-tls", action="store_true", help="Disable FTPS TLS")

    args = parser.parse_args()
    deploy_export(
        host=args.host,
        user=args.user,
        password=args.password,
        port=args.port,
        source_dir=args.source,
        target_dir=args.target_dir,
        use_tls=not args.no_tls,
    )

if __name__ == "__main__":
    main()
