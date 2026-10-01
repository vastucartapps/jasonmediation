#!/usr/bin/env node

/**
 * submit-indexnow.js
 * Submits all sitemap URLs for Alderton and Cavendish to the IndexNow API (Bing / Yandex / IndexNow).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = 'e3f9a72b4c1d6805bf81e4c92a7d3f10';

const SITES = [
  {
    host: 'www.aldertonfamilymediation.co.uk',
    keyLocation: 'https://www.aldertonfamilymediation.co.uk/e3f9a72b4c1d6805bf81e4c92a7d3f10.txt',
    sitemapPath: path.resolve(__dirname, '../Sites/aldertonfamilymediation/out/sitemap.xml'),
  },
  {
    host: 'www.cavendishfamilymediation.co.uk',
    keyLocation: 'https://www.cavendishfamilymediation.co.uk/e3f9a72b4c1d6805bf81e4c92a7d3f10.txt',
    sitemapPath: path.resolve(__dirname, '../Sites/cavendishfamilymediation/out/sitemap.xml'),
  },
];

function extractUrlsFromSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at: ${sitemapPath}. Please run pnpm build first.`);
  }
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => m[1]);
}

function submitToIndexNow(site, urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: site.host,
      key: INDEXNOW_KEY,
      keyLocation: site.keyLocation,
      urlList: urls,
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    console.log(`Submitting ${urls.length} URLs for ${site.host} to IndexNow...`);

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log(`IndexNow response for ${site.host}: HTTP ${res.statusCode} ${res.statusMessage}`);
        if (body) console.log(`Response body: ${body}`);
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({ status: res.statusCode, body });
        } else {
          console.warn(`Non-200 status code: ${res.statusCode} (May be queued or key file needs live verification)`);
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`IndexNow submission error for ${site.host}:`, err.message);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  for (const site of SITES) {
    try {
      const urls = extractUrlsFromSitemap(site.sitemapPath);
      await submitToIndexNow(site, urls);
    } catch (err) {
      console.error(`Failed to submit ${site.host}:`, err.message);
    }
  }
}

if (require.main === module) {
  main();
}
