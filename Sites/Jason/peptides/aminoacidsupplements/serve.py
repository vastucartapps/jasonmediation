#!/usr/bin/env python3
"""
High-Performance Local Preview Server for AminoAcidSupplements.co (Static Export)
Serves Sites/aminoacidsupplements/out on 0.0.0.0:3004
Fully RFC & Next.js compliant:
- Correctly URL-decodes all chunk paths (e.g., %5Bslug%5D -> [slug])
- Clean directory index resolution (/peptides/bpc-157/ -> index.html)
- Exact MIME type resolution (WebP, SVG, JSON, XML, CSS, JS, WOFF2)
- Custom 404 fallback to out/404.html
- Cross-origin header support for local testing
"""

import os
import sys
import urllib.parse
import mimetypes
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 3004
OUT_DIR = Path(__file__).resolve().parent / "out"

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("text/markdown", ".txt")

class CleanStaticRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT_DIR), **kwargs)

    def translate_path(self, path):
        # Decode %5B and %5D and query params cleanly
        path = path.split("?", 1)[0].split("#", 1)[0]
        words = path.split("/")
        words = filter(None, words)
        path = str(OUT_DIR)
        for word in words:
            word = urllib.parse.unquote(word)
            if os.path.dirname(word) or word in (os.curdir, os.pardir):
                continue
            path = os.path.join(path, word)
        if path.endswith(os.sep) or os.path.isdir(path):
            index = os.path.join(path, "index.html")
            if os.path.exists(index):
                return index
        return path

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            f404 = OUT_DIR / "404.html"
            if f404.exists():
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                with open(f404, "rb") as f:
                    self.wfile.write(f.read())
                return
        super().send_error(code, message, explain)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        code = args[1]
        msg = args[0]
        sys.stderr.write(f"[{code}] {msg}\n")

def main():
    if not OUT_DIR.exists():
        print(f"Error: {OUT_DIR} does not exist. Run build first.")
        sys.exit(1)

    server = ThreadingHTTPServer(("0.0.0.0", PORT), CleanStaticRequestHandler)
    print("=" * 65)
    print(f"🚀 AminoAcidSupplements.co Local Preview Server Running!")
    print(f"📡 Local URL:   http://localhost:{PORT}/")
    print(f"🌐 Network URL: http://0.0.0.0:{PORT}/")
    print(f"📂 Serving:     {OUT_DIR}")
    print("=" * 65)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        server.server_close()

if __name__ == "__main__":
    main()
