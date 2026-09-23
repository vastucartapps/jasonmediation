#!/usr/bin/env python3
"""
Local Remote Preview Proxy for cPanel Static Site
Forwards requests from http://localhost:8080 to http://77.95.113.13 with Host: aldertonfamilymediation.co.uk
Allows instantaneous in-browser testing of the deployed server before DNS is pointed.
"""

import http.server
import urllib.request
import urllib.error
import sys

TARGET_IP = "77.95.113.13"
TARGET_HOST = "aldertonfamilymediation.co.uk"
PORT = 8080

class ReverseProxyHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Concise logging
        sys.stderr.write(f"[cPanel Proxy] {args[0]} -> {args[1]}\n")

    def do_GET(self):
        self._proxy_request("GET")

    def do_HEAD(self):
        self._proxy_request("HEAD")

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else None
        self._proxy_request("POST", body=body)

    def _proxy_request(self, method, body=None):
        target_url = f"http://{TARGET_IP}{self.path}"
        req_headers = {
            "Host": TARGET_HOST,
            "User-Agent": self.headers.get("User-Agent", "Mozilla/5.0"),
            "Accept": self.headers.get("Accept", "*/*"),
            "Accept-Language": self.headers.get("Accept-Language", "en-US,en;q=0.9"),
        }
        if "Content-Type" in self.headers:
            req_headers["Content-Type"] = self.headers["Content-Type"]

        req = urllib.request.Request(target_url, data=body, headers=req_headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                self.send_response(resp.status)
                for header, val in resp.getheaders():
                    # Strip hop-by-hop and compressed encoding headers if uncompressed
                    if header.lower() not in ("transfer-encoding", "content-encoding", "connection"):
                        self.send_header(header, val)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                if method != "HEAD":
                    self.wfile.write(resp.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for header, val in e.headers.items():
                if header.lower() not in ("transfer-encoding", "content-encoding", "connection"):
                    self.send_header(header, val)
            self.end_headers()
            if method != "HEAD":
                self.wfile.write(e.read())
        except Exception as err:
            self.send_response(502)
            self.end_headers()
            self.wfile.write(f"502 Bad Gateway to {TARGET_HOST} ({TARGET_IP}): {err}".encode('utf-8'))

def run_server():
    server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), ReverseProxyHandler)
    print(f"================================================================")
    print(f" Live cPanel Remote Preview Proxy Running on Port {PORT}")
    print(f" Forwarding: http://localhost:{PORT} -> {TARGET_HOST} @ {TARGET_IP}")
    print(f" Open in your browser: http://localhost:{PORT}/")
    print(f"================================================================")
    server.serve_forever()

if __name__ == "__main__":
    run_server()
