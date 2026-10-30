import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { getAllVendors } from '../data/suppliers';
import { getAllBlogPosts } from './blog';

export const CANONICAL_BASE_URL = 'https://aminoacidsupplements.co';

export interface RouteMetadata {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  section: 'core' | 'compounds' | 'categories' | 'vendors' | 'regulatory' | 'governance' | 'blog';
  title?: string;
}

export function getAllCanonicalRoutes(): RouteMetadata[] {
  const routes: RouteMetadata[] = [
    { path: '/', changefreq: 'daily', priority: '1.0', section: 'core', title: 'Home - Amino Acid Monograph Registry' },
    { path: '/vendors/', changefreq: 'weekly', priority: '0.8', section: 'vendors', title: 'Verified Chemical Suppliers Directory' },
    { path: '/regulatory/', changefreq: 'weekly', priority: '0.8', section: 'regulatory', title: 'UK Regulatory & MHRA Compliance Hub' },
    { path: '/regulatory/mhra-tracker/', changefreq: 'weekly', priority: '0.7', section: 'regulatory', title: 'MHRA Statutory Enforcement & Alerts' },
    { path: '/regulatory/uk-legal-status/', changefreq: 'weekly', priority: '0.7', section: 'regulatory', title: 'Misuse of Drugs Act 1971 Legal Classification' },
    { path: '/formats/', changefreq: 'monthly', priority: '0.7', section: 'core', title: 'Reagent Formats & Vial Specifications' },
    { path: '/verification/', changefreq: 'monthly', priority: '0.7', section: 'core', title: 'HPLC & Mass Spectrometry Analytical Protocols' },
    { path: '/about/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'About AminoAcidSupplements Governance' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'Laboratory Desk Contact & Enquiries' },
    { path: '/safety/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'Laboratory Safety Standards & COSHH Protocols' },
    { path: '/privacy/', changefreq: 'monthly', priority: '0.3', section: 'governance', title: 'Privacy Policy & GDPR Compliance' },
    { path: '/terms/', changefreq: 'monthly', priority: '0.3', section: 'governance', title: 'Terms of Service & Research Use Warranty' },
    { path: '/sitemap/', changefreq: 'weekly', priority: '0.4', section: 'core', title: 'Visual HTML Sitemap' },
    { path: '/blog/', changefreq: 'daily', priority: '0.9', section: 'blog', title: 'Research Blog & Technical Monographs' },
  ];

  // Blog articles
  const posts = getAllBlogPosts();
  for (const post of posts) {
    routes.push({
      path: `/blog/${post.slug}/`,
      changefreq: 'weekly',
      priority: '0.85',
      section: 'blog',
      title: `${post.title}`,
    });
  }

  // Compounds (12 canonical monographs)
  for (const compound of PEPTIDE_COMPOUNDS) {
    routes.push({
      path: `/peptides/${compound.slug}/`,
      changefreq: 'weekly',
      priority: '0.9',
      section: 'compounds',
      title: `${compound.name} Monograph & Lab Specs`,
    });
  }

  // Categories (6 canonical hubs)
  for (const cat of RESEARCH_CATEGORIES) {
    routes.push({
      path: `/category/${cat.slug}/`,
      changefreq: 'weekly',
      priority: '0.8',
      section: 'categories',
      title: `${cat.name} Signaling Pathway Hub`,
    });
  }

  // Vendors (5 verified supplier profiles)
  const vendors = getAllVendors();
  for (const v of vendors) {
    routes.push({
      path: `/vendors/${v.id}/`,
      changefreq: 'weekly',
      priority: '0.8',
      section: 'vendors',
      title: `${v.name} Verified Laboratory Profile`,
    });
  }

  return routes;
}

export function generateUnifiedSitemapXml(): string {
  const routes = getAllCanonicalRoutes();
  const currentDate = new Date().toISOString().split('T')[0];

  const urlElements = routes
    .map(
      (r) => `  <url>
    <loc>${CANONICAL_BASE_URL}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

export function generateRobotsTxt(): string {
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
Sitemap: ${CANONICAL_BASE_URL}/sitemap.xml

# LLM Discovery Directives
# See /llms.txt for machine-readable chemical registry index
`;
}

export function generateLlmsTxt(): string {
  const routes = getAllCanonicalRoutes();
  return `# AminoAcidSupplements Chemical Monograph Registry
> British & Global analytical amino acid sequence and synthetic peptide research registry.

## Core Mandate & Compliance
All indexed entities are strictly for academic, educational, and laboratory analytical research in vitro.
Substances are unapproved research chemicals governed under UK Human Medicines Regulations 2012 (SI 2012/1916).

## Key Canonical Endpoints
- Homepage: ${CANONICAL_BASE_URL}/
- Research Blog: ${CANONICAL_BASE_URL}/blog/
- Verified Supplier Audits: ${CANONICAL_BASE_URL}/vendors/
- UK MHRA Tracker: ${CANONICAL_BASE_URL}/regulatory/mhra-tracker/
- Misuse of Drugs Act 1971 Matrix: ${CANONICAL_BASE_URL}/regulatory/uk-legal-status/
- Full Discovery Manifest: ${CANONICAL_BASE_URL}/llms-full.txt
- Machine Sitemap: ${CANONICAL_BASE_URL}/sitemap.xml

## Indexed Chemical Monographs (${PEPTIDE_COMPOUNDS.length} Compounds)
${PEPTIDE_COMPOUNDS.map((c) => `- [${c.name} (CAS ${c.casNumber})](${CANONICAL_BASE_URL}/peptides/${c.slug}/): ${c.molecularFormula}, ${c.molecularWeight}`).join('\n')}

## Signaling Pathways (${RESEARCH_CATEGORIES.length} Categories)
${RESEARCH_CATEGORIES.map((cat) => `- [${cat.name}](${CANONICAL_BASE_URL}/category/${cat.slug}/): ${cat.headline}`).join('\n')}
`;
}

export function generateLlmsFullTxt(): string {
  return `${generateLlmsTxt()}

## Comprehensive Route Index
${getAllCanonicalRoutes().map((r) => `- ${CANONICAL_BASE_URL}${r.path} (${r.title || r.path})`).join('\n')}
`;
}
