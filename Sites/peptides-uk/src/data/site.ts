export interface NavItem {
  label: string;
  href: string;
  primary?: boolean;
}

export const SITE_METADATA = {
  name: 'Peptides UK',
  title: 'Peptides UK | British Laboratory Peptide Index & Sourcing Matrix',
  description:
    'UK academic registry indexing synthetic peptides, amino acid sequences, PubChem molecular specifications, and verified laboratory supplier audits.',
  domain: 'peptides-uk.org',
  url: 'https://peptides-uk.org',
  locale: 'en_GB',
  region: 'United Kingdom',
  operatingHours: 'Monday – Friday, 08:30 – 17:30 GMT',
  laboratoryStandards: 'MHRA Compliance, Human Medicines Regulations 2012, Analytical Laboratory In Vitro Use Only',
  contactEmail: 'enquiries@peptides-uk.org',
  regulatoryBadge: 'UK Academic & Analytical Research Chemical Registry',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Reagent Catalog', href: '/#catalog' },
  { label: 'Signaling Pathways', href: '/#categories' },
  { label: 'Verified UK Suppliers', href: '/vendors/' },
  { label: 'Dilution Calculator', href: '/#calculator' },
  { label: 'Vial & Reagent Formats', href: '/formats/' },
  { label: 'Assay Standards', href: '/verification/' },
  { label: 'UK Regulatory Hub', href: '/regulatory/' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Laboratory Compounds',
    links: [
      { label: 'BPC-157 Pentadecapeptide', href: '/peptides/bpc-157/' },
      { label: 'TB-500 Active Hexapeptide', href: '/peptides/tb-500/' },
      { label: 'Semax Neuro-Heptapeptide', href: '/peptides/semax/' },
      { label: 'GHK-Cu Copper Complex', href: '/peptides/ghk-cu/' },
      { label: 'CJC-1295 (Mod GRF 1-29)', href: '/peptides/cjc-1295/' },
      { label: 'Ipamorelin Selective GHSR', href: '/peptides/ipamorelin/' },
      { label: 'Tirzepatide Dual Incretin', href: '/peptides/tirzepatide/' },
      { label: 'Semaglutide GLP-1 Analogue', href: '/peptides/semaglutide/' },
    ],
  },
  {
    title: 'Research Categories',
    links: [
      { label: 'Tissue Repair & Angiogenesis', href: '/category/tissue-repair-recovery/' },
      { label: 'Neuropeptides & CNS Signaling', href: '/category/neuropeptides-cognition/' },
      { label: 'Growth Hormone Secretagogues', href: '/category/growth-hormone-secretagogues/' },
      { label: 'Metabolic & Incretin Signaling', href: '/category/metabolic-regulation/' },
      { label: 'Dermal & Extracellular Matrix', href: '/category/dermal-extracellular-matrix/' },
      { label: 'Cellular Longevity Axis', href: '/category/cellular-longevity-mitochondrial/' },
    ],
  },
  {
    title: 'Verified UK Suppliers',
    links: [
      { label: 'PharmaGrade Store (London)', href: '/vendors/pharmagrade/' },
      { label: 'Direct Peptides (UK Hub)', href: '/vendors/direct-peptides/' },
      { label: 'Direct Sarms (London)', href: '/vendors/direct-sarms/' },
      { label: 'Peptide Works (Manchester)', href: '/vendors/peptide-works/' },
      { label: 'PharmaLab Global (London)', href: '/vendors/pharmalab-global/' },
      { label: 'UK Sourcing Matrix', href: '/vendors/' },
    ],
  },
  {
    title: 'Statutory Compliance & Standards',
    links: [
      { label: 'UK MHRA Regulatory Hub', href: '/regulatory/' },
      { label: 'MHRA Enforcement Tracker', href: '/regulatory/mhra-tracker/' },
      { label: 'Misuse of Drugs Act 1971 Status', href: '/regulatory/uk-legal-status/' },
      { label: 'HPLC & MS Analytical Verification', href: '/verification/' },
      { label: 'Laboratory Safety Standards', href: '/safety/' },
      { label: 'Visual HTML Sitemap', href: '/sitemap/' },
      { label: 'LLMs Discovery Manifesto', href: '/llms.txt' },
    ],
  },
];
