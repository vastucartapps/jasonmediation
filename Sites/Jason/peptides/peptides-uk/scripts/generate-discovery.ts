import * as fs from 'fs';
import * as path from 'path';
import {
  generateUnifiedSitemapXml,
  generateRobotsTxt,
  generateLlmsTxt,
  generateLlmsFullTxt,
  getAllCanonicalRoutes,
} from '../src/lib/discovery';

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(projectRoot, 'out');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function run() {
  console.log('Generating Single Source of Truth discovery assets for Peptides UK...');

  ensureDir(publicDir);

  const sitemapXml = generateUnifiedSitemapXml();
  const robotsTxt = generateRobotsTxt();
  const llmsTxt = generateLlmsTxt();
  const llmsFullTxt = generateLlmsFullTxt();

  // Write to public/
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');

  console.log('Successfully wrote sitemap.xml, robots.txt, llms.txt, llms-full.txt to public/');

  // If out directory exists (e.g. postbuild), write directly to out/ as well
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'llms.txt'), llmsTxt, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
    const indexNowKey = '5f2e8b4e7c1a4b9c9f2e8b4e7c1a4b9c.txt';
    if (fs.existsSync(path.join(publicDir, indexNowKey))) {
      fs.copyFileSync(path.join(publicDir, indexNowKey), path.join(outDir, indexNowKey));
    }

    // Sanitize 404.html to ensure distinct title, noindex robots, and remove canonical tag
    const files404 = [path.join(outDir, '404.html'), path.join(outDir, '404', 'index.html')];
    for (const f404 of files404) {
      if (fs.existsSync(f404)) {
        let content = fs.readFileSync(f404, 'utf-8');
        content = content.replace(/<title>.*?<\/title>/i, '<title>404 - Reagent or Page Not Found | Peptides UK</title>');
        content = content.replace(/<link\s+rel="canonical"\s+href=".*?"\/?>/gi, '');
        if (!content.includes('name="robots" content="noindex')) {
          content = content.replace(/<head>/i, '<head><meta name="robots" content="noindex, nofollow"/>');
        }
        fs.writeFileSync(f404, content, 'utf-8');
      }
    }

    console.log('Successfully wrote discovery assets and sanitized 404 pages in out/');
  }

  const routes = getAllCanonicalRoutes();
  console.log(`Total canonical routes indexed: ${routes.length}`);
}

run();
