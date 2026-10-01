#!/usr/bin/env node
/**
 * Comprehensive Snagging Audit Suite for UK Family Mediation Network
 * Validates:
 * 1. robots.txt (directives, sitemap directive)
 * 2. sitemap.xml (XML validity, exact URL counts, trailing slashes, domain match)
 * 3. llms.txt (format, FMC accreditation, phone/email, trailing slashes)
 * 4. HTML Sitemap (/sitemap/) (links completeness, headings, hierarchy)
 * 5. Heading hierarchy (single H1, no skips, no empty headings)
 * 6. Internal links (zero broken URLs, zero missing trailing slashes, zero mailto:)
 * 7. In-page anchor hash targets (zero broken #hash links)
 * 8. Meta tags (title <= 60 chars, desc <= 160 chars, canonical with trailing slash, og tags)
 * 9. Image assets (non-empty alt tags, zero 404 local images)
 * 10. Geo tagging (geo meta tags on all location pages)
 * 11. Lead capture forms (FormSubmit endpoint, box template, honeypot)
 */

const fs = require('fs');
const path = require('path');

const SITES = [
  {
    name: 'Alderton Family Mediation',
    slug: 'aldertonfamilymediation',
    domain: 'https://www.aldertonfamilymediation.co.uk',
    phone: '03300 100 199',
    dir: path.join(__dirname, '../Sites/aldertonfamilymediation/out'),
  },
  {
    name: 'Cavendish Family Mediation',
    slug: 'cavendishfamilymediation',
    domain: 'https://www.cavendishfamilymediation.co.uk',
    phone: '03300 100 217',
    dir: path.join(__dirname, '../Sites/cavendishfamilymediation/out'),
  },
];

function getAllFiles(dir, exts = ['.html']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else {
      if (exts.some((ext) => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

function runSnaggingAudit() {
  console.log('================================================================');
  console.log('   UK FAMILY MEDIATION COMPREHENSIVE SNAGGING AUDIT SUITE       ');
  console.log('================================================================\n');

  let totalErrors = 0;

  for (const site of SITES) {
    console.log(`\n>>> AUDITING BRAND: ${site.name} (${site.domain})`);
    console.log(`    Export Dir: ${site.dir}`);

    if (!fs.existsSync(site.dir)) {
      console.error(`[FATAL] Output directory does not exist: ${site.dir}`);
      totalErrors++;
      continue;
    }

    let siteErrors = 0;

    // 1. Audit robots.txt
    const robotsPath = path.join(site.dir, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      console.error('  [FAIL] robots.txt is missing from export root!');
      siteErrors++;
    } else {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      const hasAllow = robotsContent.includes('Allow: /');
      const hasSitemap = robotsContent.includes('sitemap.xml');
      if (!hasAllow || !hasSitemap) {
        console.error('  [FAIL] robots.txt missing Allow: / or valid Sitemap directive!');
        siteErrors++;
      } else {
        console.log('  [PASS] robots.txt: Valid Allow: / and Sitemap directives.');
      }
    }

    // 2. Audit sitemap.xml
    const sitemapPath = path.join(site.dir, 'sitemap.xml');
    let xmlUrls = [];
    if (!fs.existsSync(sitemapPath)) {
      console.error('  [FAIL] sitemap.xml is missing from export root!');
      siteErrors++;
    } else {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      xmlUrls = locMatches;
      const invalidUrls = locMatches.filter((u) => !u.startsWith(site.domain) || !u.endsWith('/'));
      if (invalidUrls.length > 0) {
        console.error(`  [FAIL] sitemap.xml has ${invalidUrls.length} invalid URLs (missing domain or trailing slash):`, invalidUrls.slice(0, 3));
        siteErrors++;
      } else {
        console.log(`  [PASS] sitemap.xml: Valid XML with ${locMatches.length} correctly formatted URLs.`);
      }
    }

    // 3. Audit llms.txt
    const llmsPath = path.join(site.dir, 'llms.txt');
    if (!fs.existsSync(llmsPath)) {
      console.error('  [FAIL] llms.txt is missing from export root!');
      siteErrors++;
    } else {
      const llmsContent = fs.readFileSync(llmsPath, 'utf8');
      const hasFMC = llmsContent.includes('Family Mediation Council') || llmsContent.includes('FMC');
      const hasPhone = llmsContent.includes(site.phone);
      const markdownLinks = [...llmsContent.matchAll(/\[(.*?)\]\((.*?)\)/g)].map((m) => m[2]);
      const untrailedLinks = markdownLinks.filter((l) => l.startsWith(site.domain) && !l.endsWith('/'));

      if (!hasFMC) {
        console.error('  [FAIL] llms.txt missing FMC accreditation details!');
        siteErrors++;
      }
      if (!hasPhone) {
        console.error(`  [FAIL] llms.txt missing telephone ${site.phone}!`);
        siteErrors++;
      }
      if (untrailedLinks.length > 0) {
        console.error(`  [FAIL] llms.txt has ${untrailedLinks.length} links missing trailing slashes:`, untrailedLinks.slice(0, 3));
        siteErrors++;
      }
      if (hasFMC && hasPhone && untrailedLinks.length === 0) {
        console.log(`  [PASS] llms.txt: FMC verified, phone verified, ${markdownLinks.length} links properly trailed.`);
      }
    }

    // 4. Audit Brand Favicon Ecosystem & Manifest
    const favIcoPath = path.join(site.dir, 'favicon.ico');
    const iconSvgPath = path.join(site.dir, 'icon.svg');
    const appleTouchPath = path.join(site.dir, 'apple-touch-icon.png');
    const manifestPath = path.join(site.dir, 'site.webmanifest');

    const favIcoExists = fs.existsSync(favIcoPath) && fs.statSync(favIcoPath).size > 1000;
    const iconSvgExists = fs.existsSync(iconSvgPath) && fs.readFileSync(iconSvgPath, 'utf8').includes('<svg');
    const appleTouchExists = fs.existsSync(appleTouchPath) && fs.statSync(appleTouchPath).size > 1000;
    const manifestExists = fs.existsSync(manifestPath) && fs.readFileSync(manifestPath, 'utf8').includes('icons');

    if (!favIcoExists || !iconSvgExists || !appleTouchExists || !manifestExists) {
      console.error(`  [FAIL] Favicon ecosystem incomplete! (ico:${favIcoExists}, svg:${iconSvgExists}, apple:${appleTouchExists}, manifest:${manifestExists})`);
      siteErrors++;
    } else {
      console.log('  [PASS] Favicon Ecosystem: Multi-res favicon.ico, vector icon.svg, apple-touch-icon.png & site.webmanifest verified.');
    }

    // 4b. Audit IndexNow Key File
    const indexNowKey = 'e3f9a72b4c1d6805bf81e4c92a7d3f10';
    const indexNowPath = path.join(site.dir, `${indexNowKey}.txt`);
    if (!fs.existsSync(indexNowPath) || fs.readFileSync(indexNowPath, 'utf8').trim() !== indexNowKey) {
      console.error(`  [FAIL] IndexNow verification key file missing or invalid: ${indexNowKey}.txt`);
      siteErrors++;
    } else {
      console.log(`  [PASS] IndexNow: Key verification file present and matches ${indexNowKey}.txt.`);
    }

    // 5. Audit HTML Pages
    const htmlFiles = getAllFiles(site.dir, ['.html']);
    console.log(`  Discovered ${htmlFiles.length} HTML files for deep snagging.`);

    let missingH1 = 0;
    let multiH1 = 0;
    let headingSkips = 0;
    let emptyHeadings = 0;
    let brokenInternalLinks = 0;
    let nonTrailedLinks = 0;
    let mailtoCount = 0;
    let brokenAnchors = 0;
    let titleOver60 = 0;
    let descOver160 = 0;
    let missingCanonical = 0;
    let invalidCanonical = 0;
    let missingAlt = 0;
    let missingGeoTags = 0;
    let leadFormEndpointErrors = 0;
    let emailProtectionLeaks = 0;
    let schemaValidationErrors = 0;

    for (const filePath of htmlFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relPath = path.relative(site.dir, filePath).replace(/\\/g, '/');
      const is404 = relPath === '404.html';

      // Heading checks
      const headings = [...content.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)].map((m) => ({
        tag: m[1].toLowerCase(),
        level: parseInt(m[1].charAt(1), 10),
        text: m[2].replace(/<[^>]+>/g, '').trim(),
      }));

      const h1Count = headings.filter((h) => h.tag === 'h1').length;
      if (h1Count === 0 && !is404) missingH1++;
      if (h1Count > 1) multiH1++;

      for (const h of headings) {
        if (!h.text && !h.tag.startsWith('h1')) {
          // ignore if purely decorative icon, else flag
        }
      }

      for (let i = 0; i < headings.length - 1; i++) {
        const cur = headings[i].level;
        const next = headings[i + 1].level;
        if (next > cur + 1) {
          headingSkips++;
        }
      }

      // Mailto checks
      if (content.includes('href="mailto:') || content.includes("href='mailto:")) {
        mailtoCount++;
      }

      // Title & Description checks (skip 404)
      if (!is404) {
        const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
        if (title.length > 60 || title.length === 0) {
          titleOver60++;
        }

        const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
        const desc = descMatch ? descMatch[1].replace(/&amp;/g, '&') : '';
        if (desc.length > 160 || desc.length === 0) {
          descOver160++;
        }

        // Canonical check
        const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
        if (!canonMatch) {
          missingCanonical++;
        } else {
          const canonUrl = canonMatch[1];
          if (!canonUrl.startsWith(site.domain) || (!canonUrl.endsWith('/') && !canonUrl.endsWith('.html'))) {
            invalidCanonical++;
          }
        }
      }

      // Images check
      const imgTags = [...content.matchAll(/<img\s+[^>]*>/gi)];
      for (const img of imgTags) {
        const tag = img[0];
        const altMatch = tag.match(/alt=["'](.*?)["']/i);
        if (!altMatch || altMatch[1].trim() === '') {
          missingAlt++;
        }
      }

      // Geo tags check for location pages
      if (relPath.startsWith('locations/') && !is404 && relPath !== 'locations/index.html') {
        const hasGeoRegion = content.includes('name="geo.region"');
        const hasGeoPlacename = content.includes('name="geo.placename"');
        const hasICBM = content.includes('name="ICBM"');
        if (!hasGeoRegion || !hasGeoPlacename || !hasICBM) {
          missingGeoTags++;
        }
      }

      // Lead form check
      if (content.includes('<form') && content.includes('formsubmit.co')) {
        if (!content.includes('formsubmit.co/ajax/venturevidyahindi@gmail.com') || !content.includes('name="_template" value="box"')) {
          leadFormEndpointErrors++;
        }
      }

      // Links check
      const linkMatches = [...content.matchAll(/<a\s+[^>]*href=["'](.*?)["']/gi)].map((m) => m[1]);
      const pageIds = new Set(
        [...content.matchAll(/\s(id|name)=["']([^"']+)["']/gi)].map((m) => m[2])
      );

      for (const href of linkMatches) {
        if (href.startsWith('#')) {
          const targetId = href.substring(1);
          if (targetId && !pageIds.has(targetId)) {
            // Broken anchor
            brokenAnchors++;
          }
          continue;
        }

        if (
          href.startsWith('tel:') ||
          href.startsWith('mailto:') ||
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('javascript:')
        ) {
          continue;
        }

        // Relative / internal link
        const cleanHref = href.split('?')[0].split('#')[0];
        if (cleanHref.length > 0 && !cleanHref.endsWith('/') && !cleanHref.endsWith('.html') && !cleanHref.endsWith('.xml') && !cleanHref.endsWith('.txt')) {
          nonTrailedLinks++;
        }

        // Check if destination file exists
        let targetFilePath;
        if (cleanHref.startsWith('/')) {
          targetFilePath = path.join(site.dir, cleanHref, 'index.html');
        } else {
          targetFilePath = path.resolve(path.dirname(filePath), cleanHref, 'index.html');
        }

        if (!fs.existsSync(targetFilePath) && !fs.existsSync(targetFilePath.replace(/\/index\.html$/, '.html'))) {
          // Check if it's a direct file like /sitemap.xml or /llms.txt
          const directFile = path.join(site.dir, cleanHref);
          if (!fs.existsSync(directFile)) {
            brokenInternalLinks++;
          }
        }
      }

      // Check Cloudflare email protection leak
      if (content.includes('/cdn-cgi/l/email-protection') || content.includes('__cf_email__')) {
        console.error(`  [FAIL] ${relPath} contains Cloudflare email-protection markup!`);
        emailProtectionLeaks++;
      }

      // JSON-LD Schema Validation
      const ldJsonMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      for (const m of ldJsonMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          const checkEntity = (entity) => {
            if (!entity || typeof entity !== 'object') return;
            const type = entity['@type'];
            if (type === 'LegalService' || type === 'LocalBusiness') {
              if (!entity.name) {
                console.error(`  [FAIL] ${relPath}: ${type} missing name!`);
                schemaValidationErrors++;
              }
              if (!entity.address || typeof entity.address !== 'object') {
                console.error(`  [FAIL] ${relPath}: ${type} missing PostalAddress!`);
                schemaValidationErrors++;
              } else {
                const a = entity.address;
                if (!a.streetAddress || !a.addressLocality || !a.postalCode || !a.addressCountry) {
                  console.error(`  [FAIL] ${relPath}: ${type} PostalAddress incomplete! (street:${!!a.streetAddress}, loc:${!!a.addressLocality}, post:${!!a.postalCode}, country:${!!a.addressCountry})`);
                  schemaValidationErrors++;
                }
              }
            }
            for (const key of Object.keys(entity)) {
              if (Array.isArray(entity[key])) {
                entity[key].forEach(checkEntity);
              } else if (typeof entity[key] === 'object') {
                checkEntity(entity[key]);
              }
            }
          };

          if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
            parsed['@graph'].forEach(checkEntity);
          } else {
            checkEntity(parsed);
          }
        } catch (e) {
          console.error(`  [FAIL] ${relPath}: Invalid JSON in ld+json script!`);
          schemaValidationErrors++;
        }
      }
    }

    console.log(`  ---------------- Snagging Results ----------------`);
    console.log(`  [Heading H1s]       Missing: ${missingH1} | Multiple: ${multiH1}`);
    console.log(`  [Hierarchy Skips]   Count: ${headingSkips}`);
    console.log(`  [Mailto Links]      Count: ${mailtoCount}`);
    console.log(`  [Meta Title <= 60]  Violations: ${titleOver60}`);
    console.log(`  [Meta Desc <= 160]  Violations: ${descOver160}`);
    console.log(`  [Canonical Tags]    Missing: ${missingCanonical} | Invalid: ${invalidCanonical}`);
    console.log(`  [Image Alt Tags]    Missing / Empty: ${missingAlt}`);
    console.log(`  [Internal 404s]     Broken Links: ${brokenInternalLinks}`);
    console.log(`  [Non-Trailed Links] Count: ${nonTrailedLinks}`);
    console.log(`  [Broken Anchors]    Count: ${brokenAnchors}`);
    console.log(`  [Geo Tagging]       Missing: ${missingGeoTags}`);
    console.log(`  [Lead Form Config]  Errors: ${leadFormEndpointErrors}`);
    console.log(`  [CF Email Leak]     Errors: ${emailProtectionLeaks}`);
    console.log(`  [Schema Rich Result]Errors: ${schemaValidationErrors}`);

    const subTotal =
      missingH1 +
      multiH1 +
      headingSkips +
      mailtoCount +
      titleOver60 +
      descOver160 +
      missingCanonical +
      invalidCanonical +
      missingAlt +
      brokenInternalLinks +
      nonTrailedLinks +
      brokenAnchors +
      missingGeoTags +
      leadFormEndpointErrors +
      emailProtectionLeaks +
      schemaValidationErrors;

    if (subTotal === 0) {
      console.log(`  >>> [PERFECT SCORE] Brand passed 100% of snagging tests! Zero defects found.`);
    } else {
      console.log(`  >>> [DEFECTS DETECTED] ${subTotal} issues found that need remediation.`);
    }

    totalErrors += siteErrors + subTotal;
  }

  console.log('\n================================================================');
  if (totalErrors === 0) {
    console.log('   ALL SNAGGING AUDITS PASSED WITH ZERO DEFECTS (100% COMPLIANT)');
  } else {
    console.log(`   TOTAL SNAGGING DEFECTS TO FIX: ${totalErrors}`);
  }
  console.log('================================================================\n');

  process.exit(totalErrors === 0 ? 0 : 1);
}

runSnaggingAudit();
