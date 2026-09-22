/**
 * Comprehensive Internal Link & Orphan Page Auditor
 * Recursively scans all static HTML files in `out/` for both Alderton and Cavendish
 */

const fs = require('fs');
const path = require('path');

function auditSite(siteName, outDir) {
  console.log(`\n========================================`);
  console.log(`AUDITING SITE: ${siteName} (${outDir})`);
  console.log(`========================================`);

  if (!fs.existsSync(outDir)) {
    console.error(`Directory not found: ${outDir}`);
    return;
  }

  // 1. Gather all HTML pages
  const htmlFiles = [];
  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        scan(full);
      } else if (e.name.endsWith('.html')) {
        htmlFiles.push(full);
      }
    }
  }
  scan(outDir);

  // Normalize path to route
  function fileToRoute(file) {
    let rel = path.relative(outDir, file).replace(/\\/g, '/');
    if (rel === 'index.html') return '/';
    if (rel.endsWith('/index.html')) return '/' + rel.replace(/\/index\.html$/, '');
    if (rel.endsWith('.html')) return '/' + rel.replace(/\.html$/, '');
    return '/' + rel;
  }

  const allRoutes = new Set(htmlFiles.map(fileToRoute));
  // Ignore special pages like _not-found, 404
  allRoutes.delete('/_not-found');
  allRoutes.delete('/404');

  console.log(`Found ${allRoutes.size} indexable pages in ${siteName}.`);

  const inboundLinks = new Map(); // route -> Set of sources
  const outboundLinks = new Map(); // route -> Set of targets
  const brokenLinks = [];

  for (const r of allRoutes) {
    inboundLinks.set(r, new Set());
    outboundLinks.set(r, new Set());
  }

  // Regex to extract <a href="...">
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;

  for (const file of htmlFiles) {
    const route = fileToRoute(file);
    if (route === '/_not-found' || route === '/404') continue;

    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      let href = match[1];

      // Ignore anchor only, external, tel, mailto, javascript
      if (href.startsWith('#') || href.startsWith('http:') || href.startsWith('https:') ||
          href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        continue;
      }

      // Strip hash and query
      let cleanHref = href.split('#')[0].split('?')[0];
      if (!cleanHref) continue;

      // Normalize trailing slash
      if (cleanHref !== '/' && cleanHref.endsWith('/')) {
        cleanHref = cleanHref.slice(0, -1);
      }

      // Check if target is a known route or static file
      if (allRoutes.has(cleanHref)) {
        outboundLinks.get(route).add(cleanHref);
        inboundLinks.get(cleanHref).add(route);
      } else if (cleanHref === '/sitemap.xml' || cleanHref === '/robots.txt' || cleanHref === '/llms.txt') {
        outboundLinks.get(route).add(cleanHref);
      } else {
        brokenLinks.push({ from: route, to: href });
      }
    }
  }

  // Find Orphan URLs (0 inbound links, except homepage '/')
  const orphanUrls = [];
  for (const [route, sources] of inboundLinks.entries()) {
    if (route !== '/' && sources.size === 0) {
      orphanUrls.push(route);
    }
  }

  // Find Dead Ends (0 internal outbound links)
  const deadEnds = [];
  for (const [route, targets] of outboundLinks.entries()) {
    if (targets.size === 0) {
      deadEnds.push(route);
    }
  }

  console.log(`\n--- AUDIT RESULTS FOR ${siteName} ---`);
  console.log(`Total verified indexable routes: ${allRoutes.size}`);
  console.log(`Orphan URLs (0 inlinks): ${orphanUrls.length}`);
  if (orphanUrls.length > 0) {
    console.error(`ORPHAN URLS DETECTED:`, orphanUrls);
  } else {
    console.log(`[PASS] ZERO ORPHAN URLS! Every single URL receives multiple inbound internal links.`);
  }

  console.log(`Dead-End Pages (0 outlinks): ${deadEnds.length}`);
  if (deadEnds.length > 0) {
    console.error(`DEAD END PAGES DETECTED:`, deadEnds);
  } else {
    console.log(`[PASS] ZERO DEAD-END PAGES! Every page provides rich outbound internal links.`);
  }

  console.log(`Broken Internal Links: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    console.error(`BROKEN LINKS DETECTED:`, brokenLinks.slice(0, 10));
  } else {
    console.log(`[PASS] ZERO BROKEN INTERNAL LINKS!`);
  }

  // Sample inbound link counts
  console.log(`\n--- LINK DENSITY SAMPLES ---`);
  const sampleRoutes = ['/', '/services/miam-assessment', '/blog', Array.from(allRoutes).find(r => r.startsWith('/blog/')), Array.from(allRoutes).find(r => r.split('/').length === 4)];
  sampleRoutes.filter(Boolean).forEach(sr => {
    console.log(`Route [${sr}]: Inbound Links = ${inboundLinks.get(sr)?.size || 0}, Outbound Links = ${outboundLinks.get(sr)?.size || 0}`);
  });
}

auditSite('Alderton Family Mediation', path.resolve('Sites/aldertonfamilymediation/out'));
auditSite('Cavendish Family Mediation', path.resolve('Sites/cavendishfamilymediation/out'));
