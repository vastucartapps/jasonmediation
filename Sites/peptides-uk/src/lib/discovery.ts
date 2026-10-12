import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { getAllVendors } from '../data/suppliers';

export const CANONICAL_BASE_URL = 'https://peptides-uk.org';

export interface RouteMetadata {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  section: 'core' | 'compounds' | 'categories' | 'vendors' | 'regulatory' | 'governance';
  title?: string;
}

export function getAllCanonicalRoutes(): RouteMetadata[] {
  const routes: RouteMetadata[] = [
    { path: '/', changefreq: 'daily', priority: '1.0', section: 'core', title: 'Home - British Laboratory Peptide Index' },
    { path: '/vendors/', changefreq: 'weekly', priority: '0.8', section: 'vendors', title: 'Verified UK Peptide Suppliers Directory' },
    { path: '/regulatory/', changefreq: 'weekly', priority: '0.8', section: 'regulatory', title: 'UK Regulatory & MHRA Compliance Hub' },
    { path: '/regulatory/mhra-tracker/', changefreq: 'weekly', priority: '0.7', section: 'regulatory', title: 'MHRA Statutory Enforcement & Alerts' },
    { path: '/regulatory/uk-legal-status/', changefreq: 'weekly', priority: '0.7', section: 'regulatory', title: 'Misuse of Drugs Act 1971 Legal Classification' },
    { path: '/formats/', changefreq: 'monthly', priority: '0.7', section: 'core', title: 'Reagent Formats & Vial Specifications' },
    { path: '/verification/', changefreq: 'monthly', priority: '0.7', section: 'core', title: 'HPLC & Mass Spectrometry Analytical Protocols' },
    { path: '/about/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'About Peptides UK & Editorial Governance' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'Laboratory Desk Contact & Enquiries' },
    { path: '/safety/', changefreq: 'monthly', priority: '0.5', section: 'governance', title: 'Laboratory Safety Standards & COSHH Protocols' },
    { path: '/privacy/', changefreq: 'monthly', priority: '0.3', section: 'governance', title: 'Privacy Policy & GDPR Compliance' },
    { path: '/terms/', changefreq: 'monthly', priority: '0.3', section: 'governance', title: 'Terms of Service & Research Use Warranty' },
    { path: '/sitemap/', changefreq: 'weekly', priority: '0.4', section: 'core', title: 'Visual HTML Sitemap' },
  ];

  // Compounds (12 canonical monographs)
  for (const compound of PEPTIDE_COMPOUNDS) {
    routes.push({
      path: `/peptides/${compound.slug}/`,
      changefreq: 'weekly',
      priority: '0.9',
      section: 'compounds',
      title: `${compound.name} Research Monograph & UK Lab Specs`,
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
      title: `${v.name} Verified UK Supplier Dossier`,
    });
  }

  return routes;
}

export function generateUnifiedSitemapXml(dateOverride?: string): string {
  const routes = getAllCanonicalRoutes();
  const lastmod = dateOverride || new Date().toISOString().split('T')[0];

  const urlsXml = routes
    .map(
      (r) => `  <url>
    <loc>${CANONICAL_BASE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `# ----------------------------------------------------------------------
# Robots.txt for Peptides UK (peptides-uk.org)
# United Kingdom Clinical & Academic Laboratory Peptide Directory
# ----------------------------------------------------------------------

User-agent: *
Allow: /
Disallow: /api/

# Audit Crawler Hygiene (Prevents cluttering audit reports with internal Next.js JS chunks)
User-agent: AhrefsBot
Allow: /
Disallow: /_next/
Disallow: /api/

# Canonical Single Dynamic XML Sitemap
Sitemap: ${CANONICAL_BASE_URL}/sitemap.xml

# LLM & WebMCP Discovery Agents
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /
`;
}

export function generateLlmsTxt(): string {
  const compounds = PEPTIDE_COMPOUNDS;
  const vendors = getAllVendors();

  return `# Peptides-UK.org - British Laboratory Chemical Directory

> Authoritative United Kingdom clinical and academic registry indexing synthetic peptides, amino acid sequences, PubChem molecular specifications, PubMed research citations, and verified British laboratory suppliers. Strictly intended for in vitro academic and biotechnology research under UK Human Medicines Regulations 2012.

## Machine Discoverable Resources
- Canonical XML Sitemap: ${CANONICAL_BASE_URL}/sitemap.xml
- Full Technical Compendium: ${CANONICAL_BASE_URL}/llms-full.txt
- Visual HTML Sitemap: ${CANONICAL_BASE_URL}/sitemap/
- UK MHRA Compliance Hub: ${CANONICAL_BASE_URL}/regulatory/
- Verified Supplier Directory: ${CANONICAL_BASE_URL}/vendors/

## Verified UK Research Reagents Indexed
${compounds
  .map(
    (c) =>
      `- [${c.name} (${c.systematicName})](${CANONICAL_BASE_URL}/peptides/${c.slug}/): CAS ${c.casNumber} | Formula: ${c.molecularFormula} | MW: ${c.molecularWeight} | Category: ${c.categoryName}`
  )
  .join('\n')}

## Research Signaling Pathway Hubs
${RESEARCH_CATEGORIES.map(
  (cat) => `- [${cat.name}](${CANONICAL_BASE_URL}/category/${cat.slug}/): ${cat.headline}`
).join('\n')}

## Verified UK Chemical Suppliers
${vendors
  .map(
    (v) =>
      `- [${v.name}](${CANONICAL_BASE_URL}/vendors/${v.id}/): HQ: ${v.headquarters} | Baseline HPLC Purity: ≥${v.hplcBaseline}% | Dispatch: ${v.dispatchLocations.join(', ')}`
  )
  .join('\n')}

## Statutory Regulatory Notice
All biochemical entries cataloged on Peptides-UK.org are classified strictly as analytical reference standards and chemical reagents for in vitro laboratory evaluation. They are not medicinal products under the UK Human Medicines Regulations 2012 and are strictly not for human or animal consumption.
`;
}

export function generateLlmsFullTxt(): string {
  const compounds = PEPTIDE_COMPOUNDS;
  const categories = RESEARCH_CATEGORIES;
  const vendors = getAllVendors();

  let md = `# Peptides-UK.org — Full Technical & Academic Compendium
Version: 2026.1-UK
Jurisdiction: United Kingdom
Regulatory Standard: UK Human Medicines Regulations 2012 (In Vitro Laboratory Research Only)

---

## 1. Executive Directory Overview
Peptides-UK.org provides an independent, peer-reviewed academic registry of synthetic research peptides. It provides biochemical formulas, systematic IUPAC nomenclature, sequence data, preclinical signaling mechanisms, reconstitution standard operating procedures (SOPs), and supplier batch purity verifications.

---

## 2. Research Categories & Signaling Pathways
`;

  for (const cat of categories) {
    md += `\n### ${cat.name} (\`${cat.slug}\`)
- **Headline**: ${cat.headline}
- **Description**: ${cat.description}
- **Signaling Focus**: ${cat.signalingFocus}
- **Featured Compounds**: ${cat.featuredCompoundSlugs.join(', ')}
- **Canonical URL**: ${CANONICAL_BASE_URL}/category/${cat.slug}/\n`;
  }

  md += `\n---\n\n## 3. Comprehensive Compound Monographs\n`;

  for (const c of compounds) {
    md += `\n### ${c.name} — ${c.systematicName}
- **Canonical URL**: ${CANONICAL_BASE_URL}/peptides/${c.slug}/
- **CAS Registry Number**: ${c.casNumber}
- **Molecular Formula**: ${c.molecularFormula}
- **Molecular Weight**: ${c.molecularWeight}
- **PubChem CID**: ${c.pubchemCid || 'N/A'}
- **Amino Acid Sequence**: ${c.sequence ? c.sequence.join(' - ') : 'Custom Acylated Chain'}
- **Research Category**: ${c.categoryName} (\`${c.categorySlug}\`)
- **Evidence Level**: ${c.evidenceLevel} (${c.evidencePips}/3 stars)

#### Preclinical Overview
${c.shortOverview}

#### Biochemical Mechanisms of Action
${c.mechanismOfAction.map((m) => `- ${m}`).join('\n')}

#### Laboratory Handling & Research Notes
${c.preclinicalResearchNotes}

#### Reconstitution & Stability Protocols
- **Recommended Diluent**: ${c.reconstitution.recommendedDiluent}
- **Lyophilized Storage**: ${c.reconstitution.storageLyophilized}
- **Reconstituted Solution Storage**: ${c.reconstitution.storageReconstituted}
- **Stability Window**: ${c.reconstitution.stabilityWindow}
- **Molecular Weight Baseline**: ${c.reconstitution.molecularWeightGPerMol} g/mol
- **Standard Experimental Baseline**: ${c.reconstitution.standardDoseMcg || 250} mcg

#### Verified Supplier Sources
${c.supplierLinks
  .map(
    (s) =>
      `- **${s.supplierName}**: Format: ${s.format.toUpperCase()} | Purity: ${s.puritySpecification} | Dispatch: ${s.dispatchRegion} | [Supplier Catalog Link](${s.url})`
  )
  .join('\n')}

#### Peer-Reviewed Academic Citations
${c.citations
  .map(
    (cit) =>
      `- **${cit.title}** (${cit.year})\n  *${cit.journal}* by ${cit.authors}. PMID: ${cit.pubmedId || 'N/A'}. DOI: ${cit.doi || 'N/A'}\n  *Key Finding*: ${cit.keyFindings}`
  )
  .join('\n')}
\n---\n`;
  }

  md += `\n## 4. Verified UK Laboratory Suppliers Directory\n`;

  for (const v of vendors) {
    md += `\n### ${v.name} (\`${v.id}\`)
- **Headquarters**: ${v.headquarters}
- **Established Year**: ${v.establishedYear}
- **Baseline HPLC Purity**: ≥${v.hplcBaseline}%
- **Website Domain**: [${v.domain}](${v.baseUrl})
- **Dispatch Corridors**: ${v.dispatchLocations.join(', ')}
- **Catalog Summary**: ${v.productCatalogSummary}
- **Testing Protocols**:
${v.labTestingStandards.map((t) => `  - ${t}`).join('\n')}
- **Packaging Standards**: ${v.packagingStandards}
- **Official Category Hubs**:
${v.officialCategoryLinks.map((link) => `  - [${link.categoryName}](${link.url})`).join('\n')}
\n`;
  }

  md += `\n---
## 5. UK Regulatory & Legal Framework
In the United Kingdom, synthetic peptides supplied for research purposes are governed by the **Human Medicines Regulations 2012 (SI 2012/1916)** and the **Misuse of Drugs Act 1971**. 

Compounds distributed without Marketing Authorisation (MA) are strictly prohibited from being advertised or sold with medicinal claims, human dosing instructions, or therapeutic efficacy representations. They are legally restricted to bona fide laboratory, academic, and industrial research in vitro.
`;

  return md;
}
