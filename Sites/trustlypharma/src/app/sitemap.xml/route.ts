import { NextResponse } from 'next/server';
import { PEPTIDE_COMPOUNDS } from '../../data/compounds';
import { RESEARCH_CATEGORIES } from '../../data/categories';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://trustlypharma.co.uk';
  const lastmod = new Date().toISOString().split('T')[0];

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Core static pages
  urls.push(
    { loc: `${baseUrl}/`, lastmod, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/suppliers/`, lastmod, changefreq: 'weekly', priority: '0.85' },
    { loc: `${baseUrl}/formats/`, lastmod, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/about/`, lastmod, changefreq: 'monthly', priority: '0.6' },
    { loc: `${baseUrl}/verification/`, lastmod, changefreq: 'monthly', priority: '0.5' }
  );

  // Dynamic compound detail pages
  PEPTIDE_COMPOUNDS.forEach((compound) => {
    urls.push({
      loc: `${baseUrl}/peptides/${compound.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.95',
    });
  });

  // Dynamic category hub pages
  RESEARCH_CATEGORIES.forEach((cat) => {
    urls.push({
      loc: `${baseUrl}/category/${cat.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.9',
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
