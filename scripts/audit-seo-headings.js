const fs = require('fs');
const path = require('path');

function auditSite(siteName) {
  const outDir = path.resolve(__dirname, '..', 'Sites', siteName, 'out');
  if (!fs.existsSync(outDir)) {
    console.log(`Directory not found: ${outDir}`);
    return;
  }

  const htmlFiles = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html') && e.name !== '404.html') htmlFiles.push(full);
    }
  }
  walk(outDir);

  console.log(`\n========================================`);
  console.log(`AUDIT FOR: ${siteName} (${htmlFiles.length} HTML files)`);
  console.log(`========================================`);

  const issues = {
    missingH1: [],
    multipleH1: [],
    skippedHeadings: [],
    titleOver60: [],
    titleMissing: [],
    descOver160: [],
    descMissing: [],
    locationMissingName: [],
    mailtoFound: [],
  };

  const stats = {
    titles: [],
    descriptions: [],
  };

  for (const file of htmlFiles) {
    const rel = path.relative(outDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Title
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) {
      issues.titleMissing.push(rel);
    } else {
      stats.titles.push({ rel, len: title.length, title });
      if (title.length > 60) {
        issues.titleOver60.push({ rel, len: title.length, title });
      }
    }

    // Meta description (fast scan via meta tags)
    let desc = '';
    const metaTags = content.match(/<meta\s+[^>]+>/gi) || [];
    for (const tag of metaTags) {
      if (tag.toLowerCase().includes('name="description"') || tag.toLowerCase().includes("name='description'")) {
        const m = tag.match(/content="([^"]*)"/i) || tag.match(/content='([^']*)'/i);
        if (m) {
          desc = m[1].trim();
          break;
        }
      }
    }

    if (!desc) {
      issues.descMissing.push(rel);
    } else {
      stats.descriptions.push({ rel, len: desc.length, desc });
      if (desc.length > 160) {
        issues.descOver160.push({ rel, len: desc.length, desc });
      }
    }

    // Location check: if in locations/, ensure town name is in title and desc
    if (rel.startsWith('locations/') && rel !== 'locations/index.html') {
      const parts = rel.split('/');
      let townSlug = '';
      if (parts.length === 4) {
        // locations/county/town/index.html
        townSlug = parts[2];
      } else if (parts.length === 5) {
        // locations/county/town/service/index.html
        townSlug = parts[2];
      }
      if (townSlug) {
        const checkTerm = townSlug.replace(/-/g, ' ').toLowerCase();
        const titleNormalized = title.toLowerCase().replace(/-/g, ' ');
        const descNormalized = desc.toLowerCase().replace(/-/g, ' ');
        if (!titleNormalized.includes(checkTerm) || !descNormalized.includes(checkTerm)) {
          issues.locationMissingName.push({ rel, checkTerm, title, desc });
        }
      }
    }

    // Headings
    const headingRegex = /<h([1-6])\b[^>]*>(.*?)<\/h\1>/gis;
    let match;
    const headings = [];
    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const text = match[2].replace(/<[^>]+>/g, '').trim();
      headings.push({ level, text });
    }

    const h1s = headings.filter((h) => h.level === 1);
    if (h1s.length === 0) issues.missingH1.push(rel);
    if (h1s.length > 1) issues.multipleH1.push({ rel, count: h1s.length, titles: h1s.map((h) => h.text) });

    // Heading hierarchy skip check:
    // We check if any heading jumps down by more than 1 level from the previous heading (e.g., h1 -> h3 without h2, or h2 -> h4 without h3)
    let prevLevel = 0;
    for (const h of headings) {
      if (prevLevel > 0 && h.level > prevLevel + 1) {
        issues.skippedHeadings.push({ rel, from: prevLevel, to: h.level, text: h.text.substring(0, 40) });
      }
      prevLevel = h.level;
    }

    // Check mailto:
    if (content.includes('mailto:')) {
      issues.mailtoFound.push(rel);
    }
  }

  console.log(`[H1 Status] Missing H1: ${issues.missingH1.length} | Multiple H1: ${issues.multipleH1.length}`);
  if (issues.missingH1.length > 0) console.log('  Missing H1 in:', issues.missingH1.slice(0, 10));
  if (issues.multipleH1.length > 0) console.log('  Multiple H1 in:', issues.multipleH1.slice(0, 5));

  console.log(`[Heading Hierarchy] Skips: ${issues.skippedHeadings.length}`);
  if (issues.skippedHeadings.length > 0) {
    issues.skippedHeadings.slice(0, 5).forEach((s) => console.log(`  ${s.rel}: h${s.from} -> h${s.to} ("${s.text}")`));
  }

  console.log(`[Meta Title] Over 60 chars: ${issues.titleOver60.length} | Missing: ${issues.titleMissing.length}`);
  if (issues.titleOver60.length > 0) {
    console.log('  Samples (>60 chars):');
    issues.titleOver60.slice(0, 5).forEach((t) => console.log(`    ${t.rel} (${t.len} chars): "${t.title}"`));
  }

  console.log(`[Meta Description] Over 160 chars: ${issues.descOver160.length} | Missing: ${issues.descMissing.length}`);
  if (issues.descOver160.length > 0) {
    console.log('  Samples (>160 chars):');
    issues.descOver160.slice(0, 5).forEach((d) => console.log(`    ${d.rel} (${d.len} chars): "${d.desc}"`));
  }

  console.log(`[Location Names in SEO] Mismatches: ${issues.locationMissingName.length}`);
  if (issues.locationMissingName.length > 0) {
    issues.locationMissingName.slice(0, 5).forEach((l) => console.log(`    ${l.rel}: expected "${l.checkTerm}"`));
  }

  console.log(`[Mailto: Links] Found in: ${issues.mailtoFound.length} pages`);
  if (issues.mailtoFound.length > 0) {
    console.log('  Pages with mailto:', issues.mailtoFound.slice(0, 10));
  }
}

auditSite('aldertonfamilymediation');
auditSite('cavendishfamilymediation');
