import fs from 'fs';
import path from 'path';
import {
  generateXmlSitemap,
  generateSitemapIndex,
  generateRobotsTxt,
  generateLlmsTxt,
  generateLlmsFullTxt,
  getAllDiscoveryRoutes,
} from '../src/lib/discovery';

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(projectRoot, 'out');

console.log('================================================================');
console.log('   TRUSTLY PHARMA DYNAMIC DISCOVERY & SITEMAP GENERATOR         ');
console.log('================================================================\n');

const routes = getAllDiscoveryRoutes();
console.log(`[1/5] Populated ${routes.length} canonical routes from data sources:`);
console.log(`      - Core Pages: ${routes.filter((r) => r.section === 'Core Platform').length}`);
console.log(`      - Compounds: ${routes.filter((r) => r.section === 'Peptide Compounds').length}`);
console.log(`      - Research Pathways: ${routes.filter((r) => r.section === 'Research Pathways').length}`);
console.log(`      - Commercial Vendors: ${routes.filter((r) => r.section === 'Commercial Vendors').length}`);
console.log(`      - Regulatory Trackers: ${routes.filter((r) => r.section === 'Regulatory Hub').length}`);
console.log(`      - Policies & Legal: ${routes.filter((r) => r.section === 'Governance & Legal').length}\n`);

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate sitemap.xml
const sitemapXml = generateXmlSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`[2/5] Wrote public/sitemap.xml (${sitemapXml.length} bytes)`);

// 2. Generate sitemap_index.xml
const sitemapIndexXml = generateSitemapIndex();
fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf-8');
console.log(`[3/5] Wrote public/sitemap_index.xml (${sitemapIndexXml.length} bytes)`);

// 3. Generate robots.txt
const robotsTxt = generateRobotsTxt();
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log(`[4/5] Wrote public/robots.txt (${robotsTxt.length} bytes)`);

// 4. Generate llms.txt & llms-full.txt
const llmsTxt = generateLlmsTxt();
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

const llmsFullTxt = generateLlmsFullTxt();
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
console.log(`[5/5] Wrote public/llms.txt (${llmsTxt.length} bytes) & public/llms-full.txt (${llmsFullTxt.length} bytes)`);

// If out directory exists (e.g. during postbuild), sync them there too
if (fs.existsSync(outDir)) {
  console.log('\n[SYNC] Mirroring discovery assets to out/ directory...');
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  if (fs.existsSync(path.join(publicDir, 'sitemap.xsl'))) {
    fs.copyFileSync(path.join(publicDir, 'sitemap.xsl'), path.join(outDir, 'sitemap.xsl'));
  }
  console.log('       Mirrored all 6 discovery endpoints into out/ successfully.');
}

console.log('\nAll discovery assets generated successfully!');
