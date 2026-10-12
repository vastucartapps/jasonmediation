import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { getAllVendors } from '../data/suppliers';

export const BASE_URL = 'https://trustlypharma.uk';

export interface DiscoveryRoute {
  loc: string;
  path: string;
  title: string;
  description: string;
  section:
    | 'Core Platform'
    | 'Peptide Compounds'
    | 'Research Pathways'
    | 'Commercial Vendors'
    | 'Regulatory Hub'
    | 'Governance & Legal';
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  meta?: {
    casNumber?: string;
    molecularFormula?: string;
    molecularWeight?: string;
    domain?: string;
    citationCount?: number;
  };
}

export const CORE_STATIC_ROUTES: Omit<DiscoveryRoute, 'lastmod'>[] = [
  {
    loc: `${BASE_URL}/`,
    path: '/',
    title: 'Index Home & Chemical Repository',
    description: 'Curated PubChem molecular profiles, peer-reviewed PubMed citations, and independent vendor directories.',
    section: 'Core Platform',
    changefreq: 'daily',
    priority: '1.0',
  },
  {
    loc: `${BASE_URL}/vendors/`,
    path: '/vendors/',
    title: 'Commercial Vendors Directory',
    description: 'Independent directory and analytical dossier registry for verified research peptide suppliers.',
    section: 'Commercial Vendors',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    loc: `${BASE_URL}/regulatory/`,
    path: '/regulatory/',
    title: 'Regulatory Intelligence Hub',
    description: 'UK & European statutory frameworks, OECD GLP standards, and chemical handling guidelines.',
    section: 'Regulatory Hub',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    loc: `${BASE_URL}/regulatory/mhra-tracker/`,
    path: '/regulatory/mhra-tracker/',
    title: 'MHRA Enforcement Tracker',
    description: 'Live timeline of UK Medicines & Healthcare products Regulatory Agency compliance actions and border advisories.',
    section: 'Regulatory Hub',
    changefreq: 'daily',
    priority: '0.85',
  },
  {
    loc: `${BASE_URL}/regulatory/uk-legal-status/`,
    path: '/regulatory/uk-legal-status/',
    title: 'UK Legal Status Matrix',
    description: 'Misuse of Drugs Act 1971 schedules, Prescription Only Medicine (POM) boundaries, and laboratory handling exemptions.',
    section: 'Regulatory Hub',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    loc: `${BASE_URL}/formats/`,
    path: '/formats/',
    title: 'Delivery Formats Standards',
    description: 'Physical reagent delivery specifications: lyophilized vials, sterile cartridges, atomizers, and bacteriostatic diluents.',
    section: 'Core Platform',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    loc: `${BASE_URL}/verification/`,
    path: '/verification/',
    title: 'Analytical Verification Standards',
    description: 'HPLC purity verification threshold assays and electrospray ionization mass spectrometry (ESI-MS) standards.',
    section: 'Core Platform',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    loc: `${BASE_URL}/about/`,
    path: '/about/',
    title: 'About & Methodology Charter',
    description: 'Editorial charter, 5-stage chemical evaluation protocol, and PubMed evidence tiering methodology.',
    section: 'Governance & Legal',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    loc: `${BASE_URL}/contact/`,
    path: '/contact/',
    title: 'Academic Desk & Inquiries',
    description: 'Direct communication desk for academic researchers, analytical errata submissions, and citation peer review.',
    section: 'Governance & Legal',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    loc: `${BASE_URL}/safety/`,
    path: '/safety/',
    title: 'Laboratory Research Safety Policy',
    description: 'OECD Good Laboratory Practice (GLP) standards, cold-chain storage thresholds, and UK COSHH safety guidelines.',
    section: 'Governance & Legal',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    loc: `${BASE_URL}/privacy/`,
    path: '/privacy/',
    title: 'Privacy Policy',
    description: 'UK GDPR data handling disclosures and analytical privacy statement.',
    section: 'Governance & Legal',
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    loc: `${BASE_URL}/terms/`,
    path: '/terms/',
    title: 'Terms of Service',
    description: 'Academic terms of access, research reagent disclaimers, and user terms.',
    section: 'Governance & Legal',
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    loc: `${BASE_URL}/sitemap/`,
    path: '/sitemap/',
    title: 'HTML Index Sitemap',
    description: 'Navigational catalog indexing 100% of chemical dossiers, signaling pathways, and partner suppliers.',
    section: 'Core Platform',
    changefreq: 'weekly',
    priority: '0.7',
  },
];

/**
 * Returns all site routes dynamically populated from data sources.
 * Whenever compounds, categories, or suppliers change, this registry updates automatically.
 */
export function getAllDiscoveryRoutes(): DiscoveryRoute[] {
  const today = new Date().toISOString().split('T')[0];

  const routes: DiscoveryRoute[] = [];

  // 1. Core Platform Pages
  CORE_STATIC_ROUTES.forEach((r) => {
    routes.push({
      ...r,
      lastmod: today,
    });
  });

  // 2. Dynamic Chemical Compound Dossiers (auto-populated from PEPTIDE_COMPOUNDS)
  PEPTIDE_COMPOUNDS.forEach((compound) => {
    routes.push({
      loc: `${BASE_URL}/peptides/${compound.slug}/`,
      path: `/peptides/${compound.slug}/`,
      title: `${compound.name} Chemical Reference Dossier`,
      description: `CAS ${compound.casNumber} · Formula: ${compound.molecularFormula} · ${compound.shortOverview}`,
      section: 'Peptide Compounds',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.95',
      meta: {
        casNumber: compound.casNumber,
        molecularFormula: compound.molecularFormula,
        molecularWeight: compound.molecularWeight,
        citationCount: compound.citations.length,
      },
    });
  });

  // 3. Dynamic Research Categories (auto-populated from RESEARCH_CATEGORIES)
  RESEARCH_CATEGORIES.forEach((cat) => {
    routes.push({
      loc: `${BASE_URL}/category/${cat.slug}/`,
      path: `/category/${cat.slug}/`,
      title: `${cat.name} Pathway Index`,
      description: cat.description,
      section: 'Research Pathways',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // 4. Dynamic Verified Commercial Vendors (auto-populated from suppliers)
  getAllVendors().forEach((vendor) => {
    routes.push({
      loc: `${BASE_URL}/vendors/${vendor.id}/`,
      path: `/vendors/${vendor.id}/`,
      title: `${vendor.name} Commercial Supplier Dossier`,
      description: `${vendor.productCatalogSummary} Base: ${vendor.headquarters} (${vendor.domain})`,
      section: 'Commercial Vendors',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
      meta: {
        domain: vendor.domain,
      },
    });
  });

  return routes;
}

/**
 * Generates standards-compliant XML sitemap adhering to Sitemaps.org 0.9 schema,
 * with styled XSL stylesheet reference for browser readability.
 */
export function generateXmlSitemap(): string {
  const routes = getAllDiscoveryRoutes();

  const xmlEntries = routes
    .map(
      (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>
`;
}

/**
 * Generates standards-compliant XML Sitemap Index.
 * Essential for search engines and SEO auditors querying sitemap_index.xml.
 */
export function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

/**
 * Generates standards-compliant robots.txt.
 * Fully permissive to major search engines and AI discovery bots,
 * with explicit sitemap and host pointers.
 */
export function generateRobotsTxt(): string {
  return `# Trustly Pharma - Robots Specification
# Canonical Host: ${BASE_URL}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# AI Discovery & Agentic Browsing Crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Machine Discovery Feeds
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap_index.xml

# Host Directive
Host: trustlypharma.uk
`;
}

/**
 * Generates dynamic llms.txt strictly compliant with the llmstxt.org specification.
 * Auto-populates all compounds, categories, and vendors directly from data files.
 */
export function generateLlmsTxt(): string {
  const compounds = PEPTIDE_COMPOUNDS;
  const categories = RESEARCH_CATEGORIES;
  const vendors = getAllVendors();

  return `# Trustly Pharma

> UK & International Peptide Research Index, Chemical Reconstitution Guide & Analytical Verification Directory.

## Core Documentation

- [Home & Chemical Repository Index](${BASE_URL}/): Comprehensive directory of synthetic research peptides, verified PubChem chemical structures, and peer-reviewed literature.
- [Peptide Reconstitution & Dilution Calculator](${BASE_URL}/#calculator): Interactive laboratory tool for calculating stock concentrations, micro-pipetting draw volumes, and U-100 syringe units.
- [Analytical Verification & Testing Standards](${BASE_URL}/verification/): Analytical methodology covering HPLC purity verification, mass spectrometry (ESI-MS), and COA validation standards.
- [Delivery Formats & Laboratory Specifications](${BASE_URL}/formats/): Physical delivery formats including lyophilized powder vials, nasal sprays, sublingual troches, and bacteriostatic reconstitution water.
- [Preclinical & Clinical Evidence Map](${BASE_URL}/#evidence-map): Evidence matrix indexing PubMed studies across human clinical trials, in vivo animal models, and in vitro cellular assays.
- [Institutional Contact & Citation Desk](${BASE_URL}/contact/): Institutional inquiry desk for academic researchers, analytical questions, and peer-reviewed citation submissions.
- [HTML Sitemap Directory](${BASE_URL}/sitemap/): Complete navigational hierarchy of all chemical dossiers, research categories, and vendor profiles.

## Research Peptides & Chemical Dossiers

${compounds
  .map(
    (c) =>
      `- [${c.name} Research Dossier](${BASE_URL}/peptides/${c.slug}/): CAS ${c.casNumber} ${c.systematicName}, Formula ${c.molecularFormula}, MW ${c.molecularWeight} g/mol. ${c.shortOverview}`
  )
  .join('\n')}

## Research Categories & Signaling Pathways

${categories
  .map((cat) => `- [${cat.name}](${BASE_URL}/category/${cat.slug}/): ${cat.description}`)
  .join('\n')}

## Verified Commercial Chemical Suppliers

${vendors
  .map(
    (v) =>
      `- [${v.name} Dossier](${BASE_URL}/vendors/${v.id}/): ${v.productCatalogSummary} Base: ${v.headquarters}. Domain: ${v.domain}. Dispatch: ${v.dispatchLocations.join(', ')}.`
  )
  .join('\n')}

## Regulatory Framework & Safety

- [Regulatory Intelligence Hub](${BASE_URL}/regulatory/): UK and EU statutory classification, OECD GLP standards, and chemical handling guidelines.
- [MHRA Enforcement Tracker](${BASE_URL}/regulatory/mhra-tracker/): Statutory medicine classification and regulatory advisories from the UK Medicines & Healthcare products Regulatory Agency.
- [UK Legal Status Matrix](${BASE_URL}/regulatory/uk-legal-status/): Misuse of Drugs Act 1971, Prescription Only Medicine (POM), and laboratory research chemical boundaries.
- [Laboratory Research Safety Policy](${BASE_URL}/safety/): Good Laboratory Practice (GLP) and UK COSHH chemical safety protocols.

## Discovery Endpoints & Agent Catalogs

- [Full Markdown Technical Catalog](${BASE_URL}/llms-full.txt): Complete uncompressed markdown dossiers, molecular structures, and laboratory operating procedures.
- [XML Sitemap Feed](${BASE_URL}/sitemap.xml): Machine-readable XML sitemap index.
- [XML Sitemap Index](${BASE_URL}/sitemap_index.xml): Master XML sitemap index pointer.
- [Robots Policy](${BASE_URL}/robots.txt): Machine crawler indexation policy.
`;
}

/**
 * Generates dynamic llms-full.txt containing complete technical monographs for every compound.
 * This delivers deep context to AI models and satisfies Agentic Browsing audits.
 */
export function generateLlmsFullTxt(): string {
  const compounds = PEPTIDE_COMPOUNDS;
  const categories = RESEARCH_CATEGORIES;
  const vendors = getAllVendors();

  return `# Trustly Pharma - Comprehensive Chemical & Regulatory Compendium

> Complete Technical Dossier & Laboratory Specification Manual for UK & International Synthetic Peptides.
> Website: ${BASE_URL}/
> Canonical Sitemaps: ${BASE_URL}/sitemap.xml | ${BASE_URL}/sitemap_index.xml

---

## 1. Complete Chemical Monograph Directory

${compounds
  .map(
    (c) => `### ${c.name} (${c.systematicName})
- **CAS Registry Number**: ${c.casNumber}
- **PubChem CID**: ${c.pubchemCid || 'Indexed'}
- **Empirical Formula**: ${c.molecularFormula}
- **Molecular Weight**: ${c.molecularWeight} g/mol
- **Amino Acid Sequence**: ${c.sequence && c.sequence.length > 0 ? c.sequence.join('-') : 'Synthetic Polypeptide / Cyclized'}
- **Research Category**: ${c.categoryName} (${BASE_URL}/category/${c.categorySlug}/)
- **Canonical Dossier URL**: ${BASE_URL}/peptides/${c.slug}/
- **Overview**: ${c.shortOverview}
- **Primary Mechanism of Action**: ${c.mechanismOfAction.join(' ')}
- **Reconstitution Standard**: Diluent: ${c.reconstitution.recommendedDiluent} | Lyophilized Storage: ${c.reconstitution.storageLyophilized} | Solution Storage: ${c.reconstitution.storageReconstituted} | Stability: ${c.reconstitution.stabilityWindow}
- **Documented Research Citations**: ${c.citations.length} indexed PubMed studies.
${c.citations
  .slice(0, 3)
  .map(
    (cit) =>
      `  * "${cit.title}" (${cit.authors}, ${cit.year})${cit.pubmedId ? ` - PMID: ${cit.pubmedId}` : ''}`
  )
  .join('\n')}
`
  )
  .join('\n---\n\n')}

---

## 2. Research Pathways & Molecular Targets

${categories
  .map(
    (cat) => `### ${cat.name}
- **URL**: ${BASE_URL}/category/${cat.slug}/
- **Headline**: ${cat.headline}
- **Description**: ${cat.description}
- **Signaling Focus**: ${cat.signalingFocus}
`
  )
  .join('\n')}

---

## 3. Verified Commercial Supplier Directory

${vendors
  .map(
    (v) => `### ${v.name}
- **Dossier URL**: ${BASE_URL}/vendors/${v.id}/
- **Domain**: ${v.domain}
- **Headquarters**: ${v.headquarters}
- **Established**: ${v.establishedYear}
- **Testing Standards**: ${v.labTestingStandards.join('; ')}
- **Catalog Summary**: ${v.productCatalogSummary}
`
  )
  .join('\n')}

---

## 4. UK Statutory & Regulatory Framework

- **Medicines & Healthcare products Regulatory Agency (MHRA)**: Regulates medicinal claims under Human Medicines Regulations 2012 (SI 2012/1916). Research chemicals must not be marketed or sold for human consumption.
- **Misuse of Drugs Act 1971**: Specific synthetic peptide analogues are monitored for controlled substance classification. Analytical reference materials require standard laboratory handling.
- **World Anti-Doping Agency (WADA)**: Sections S0 (Non-approved substances) and S2 (Peptide hormones and growth factors) prohibit in-competition and out-of-competition use.
- **OECD Good Laboratory Practice (GLP)**: Reconstitution protocols require sterile air laminar flow, bacteriostatic 0.9% benzyl alcohol preserved water, and cold-chain maintenance at 2°C–8°C.
`
}
