import { NextResponse } from 'next/server';
import { PEPTIDE_COMPOUNDS } from '../../data/compounds';
import { RESEARCH_CATEGORIES } from '../../data/categories';
import { getAllVendors } from '../../data/suppliers';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://trustlypharma.co.uk';
  const lastmod = new Date().toISOString().split('T')[0];

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Core static pages
  urls.push(
    { loc: `${baseUrl}/`, lastmod, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/vendors/`, lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/regulatory/`, lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/regulatory/mhra-tracker/`, lastmod, changefreq: 'daily', priority: '0.85' },
    { loc: `${baseUrl}/regulatory/uk-legal-status/`, lastmod, changefreq: 'weekly', priority: '0.85' },
    { loc: `${baseUrl}/formats/`, lastmod, changefreq: 'weekly', priority: '0.85' },
    { loc: `${baseUrl}/about/`, lastmod, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/contact/`, lastmod, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/safety/`, lastmod, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/privacy/`, lastmod, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/terms/`, lastmod, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/verification/`, lastmod, changefreq: 'monthly', priority: '0.6' }
  );

  // Dynamic compound detail pages (12 compounds)
  PEPTIDE_COMPOUNDS.forEach((compound) => {
    urls.push({
      loc: `${baseUrl}/peptides/${compound.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.95',
    });
  });

  // Dynamic category hub pages (6 categories)
  RESEARCH_CATEGORIES.forEach((cat) => {
    urls.push({
      loc: `${baseUrl}/category/${cat.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // Dynamic vendor dossier pages (5 vendors)
  getAllVendors().forEach((vendor) => {
    urls.push({
      loc: `${baseUrl}/vendors/${vendor.id}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
