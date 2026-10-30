import { NextResponse } from 'next/server';
import { ALDERTON_BRAND } from '../../config/brand';
import { SITE1_COUNTIES, CORE_SERVICES, SITE1_BLOG_POSTS } from '@mediation/core';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = ALDERTON_BRAND.siteUrl;
  const lastmod = new Date().toISOString().split('T')[0];

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Core Pages
  urls.push(
    { loc: `${baseUrl}/`, lastmod, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/services/`, lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/locations/`, lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/blog/`, lastmod, changefreq: 'weekly', priority: '0.85' },
    { loc: `${baseUrl}/about/`, lastmod, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/contact/`, lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/privacy/`, lastmod, changefreq: 'monthly', priority: '0.3' },
    { loc: `${baseUrl}/terms/`, lastmod, changefreq: 'monthly', priority: '0.3' },
    { loc: `${baseUrl}/sitemap/`, lastmod, changefreq: 'weekly', priority: '0.5' }
  );

  // Services
  CORE_SERVICES.forEach((service) => {
    urls.push({
      loc: `${baseUrl}/services/${service.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // Regional Practice Locations & Services
  SITE1_COUNTIES.forEach((county) => {
    county.towns.forEach((town) => {
      // Town Practice Location
      urls.push({
        loc: `${baseUrl}/locations/${county.slug}/${town.slug}/`,
        lastmod,
        changefreq: 'weekly',
        priority: '0.9',
      });

      // Location Practice Services
      CORE_SERVICES.forEach((service) => {
        urls.push({
          loc: `${baseUrl}/locations/${county.slug}/${town.slug}/${service.slug}/`,
          lastmod,
          changefreq: 'weekly',
          priority: '0.95',
        });
      });
    });
  });

  // Blog Posts
  SITE1_BLOG_POSTS.forEach((post) => {
    urls.push({
      loc: `${baseUrl}/blog/${post.slug}/`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.8',
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
