const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/home/prashant/.gemini/antigravity-cli/brain/e0c63c30-e00b-4c7d-a01b-b3ac2a9d0961';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const pagesToTest = [
    { url: 'http://localhost:3004/', name: 'homepage' },
    { url: 'http://localhost:3004/peptides/bpc-157/', name: 'monograph_bpc157' },
    { url: 'http://localhost:3004/blog/bpc-157-stability-protocols/', name: 'blog_bpc157' },
    { url: 'http://localhost:3004/vendors/', name: 'vendors_directory' },
  ];

  const viewports = [
    { width: 375, height: 812, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1280, height: 800, name: 'desktop' },
    { width: 1920, height: 1080, name: 'wide' }
  ];

  console.log('--- TESTING HORIZONTAL OVERFLOW ACROSS VIEWPORTS ---');
  for (const p of pagesToTest) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(p.url, { waitUntil: 'networkidle2' });

      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const windowWidth = window.innerWidth;
        const hasAppError = document.body.innerText.includes('Application error: a client-side exception');
        return {
          windowWidth,
          scrollWidth,
          hasHorizontalScroll: scrollWidth > windowWidth,
          hasAppError
        };
      });

      console.log(`[${p.name}] [${vp.name} (${vp.width}px)]: scrollWidth=${overflow.scrollWidth}, hasOverflow=${overflow.hasHorizontalScroll}, appError=${overflow.hasAppError}`);
      if (overflow.hasHorizontalScroll || overflow.hasAppError) {
        console.error(`FAILED on ${p.name} at ${vp.width}px!`);
      }
    }
  }

  console.log('\n--- CAPTURING VISUAL VERIFICATION SCREENSHOTS ---');
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Homepage Top (Header, Logo, Quick Pills)
  await page.goto('http://localhost:3004/', { waitUntil: 'networkidle2' });
  const homeTopPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_home_header_hero.png');
  await page.screenshot({ path: homeTopPath, clip: { x: 0, y: 0, width: 1440, height: 850 } });
  console.log('Saved:', homeTopPath);

  // 2. Homepage Catalog & Corridor (verifying 5-vendor table is gone, cards look sharp)
  const homeCatalogPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_home_cards_spotlight.png');
  await page.screenshot({ path: homeCatalogPath, clip: { x: 0, y: 850, width: 1440, height: 1100 } });
  console.log('Saved:', homeCatalogPath);

  // 3. Peptide Monograph Page (Benchmark Grid & Suppliers Matrix)
  await page.goto('http://localhost:3004/peptides/bpc-157/', { waitUntil: 'networkidle2' });
  const monographHeroPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_monograph_hero_grid.png');
  await page.screenshot({ path: monographHeroPath, clip: { x: 0, y: 0, width: 1440, height: 950 } });
  console.log('Saved:', monographHeroPath);

  const monographSuppliersPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_monograph_suppliers.png');
  await page.screenshot({ path: monographSuppliersPath, clip: { x: 0, y: 950, width: 1440, height: 850 } });
  console.log('Saved:', monographSuppliersPath);

  // 4. Blog Post Page (Breadcrumbs, TOC, Figure 2, Content)
  await page.goto('http://localhost:3004/blog/bpc-157-stability-protocols/', { waitUntil: 'networkidle2' });
  const blogTopPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_blog_breadcrumbs_hero.png');
  await page.screenshot({ path: blogTopPath, clip: { x: 0, y: 0, width: 1440, height: 950 } });
  console.log('Saved:', blogTopPath);

  const blogContentPath = path.join(ARTIFACT_DIR, 'aminoacidsupplements_blog_figure_faqs.png');
  await page.screenshot({ path: blogContentPath, clip: { x: 0, y: 1500, width: 1440, height: 1100 } });
  console.log('Saved:', blogContentPath);

  console.log('\nTotal Console Errors caught during run:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console Errors:', consoleErrors);
  }

  await browser.close();
  console.log('Verification Complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
