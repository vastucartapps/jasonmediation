/**
 * Unified Discovery Generator
 * Single source of truth generator for sitemap.xml, robots.txt, llms.txt, and llms-full.txt
 */

export interface CanonicalRoute {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  title?: string;
  description?: string;
}

export function generateSitemapXml(baseUrl: string, routes: CanonicalRoute[]): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const urlElements = routes
    .map(
      (r) => `  <url>
    <loc>${baseUrl.replace(/\/$/, '')}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Explicit AI Search & Engine Crawlers Allow-list (GEO / AEO)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Canonical Sitemaps
Sitemap: ${cleanBase}/sitemap.xml

# LLM Discovery Directives
# See /llms.txt for machine-readable service registry index
`;
}

export function generateLlmsTxt(
  brandName: string,
  baseUrl: string,
  missionStatement: string,
  routes: CanonicalRoute[]
): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return `# ${brandName} Service & Location Registry
> ${missionStatement}

## Core Compliance & Verification
All listed contractors, services, and operational hubs are independently verified and licensed.
All works adhere to statutory municipal building amendments and standard industry safety protocols.

## Key Canonical Endpoints
- Homepage: ${cleanBase}/
- Machine Sitemap: ${cleanBase}/sitemap.xml
- Full Discovery Manifest: ${cleanBase}/llms-full.txt

## Canonical Route Directory (${routes.length} Indexed Routes)
${routes.map((r) => `- [${r.title || r.path}](${cleanBase}${r.path}): ${r.description || 'Verified regional endpoint'}`).join('\n')}
`;
}
