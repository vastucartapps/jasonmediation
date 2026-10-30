export interface NavItem {
  label: string;
  href: string;
  primary?: boolean;
}

export const SITE_METADATA = {
  name: 'AminoAcidSupplements',
  title: 'AminoAcidSupplements | Biochemical Monograph Registry',
  description:
    'British & global chemical monograph registry indexing analytical amino acid sequences, synthetic research peptides, and verified laboratory supplier audits.',
  domain: 'aminoacidsupplements.co',
  url: 'https://aminoacidsupplements.co',
  locale: 'en_GB',
  region: 'United Kingdom',
  operatingHours: 'Monday – Friday, 08:30 – 17:30 GMT',
  laboratoryStandards: 'MHRA In Vitro Standard, Human Medicines Regulations 2012, Analytical Laboratory Use Only',
  contactEmail: 'enquiries@aminoacidsupplements.co',
  regulatoryBadge: 'Analytical Amino Acid Sequence & Peptide Monograph Register',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Monographs', href: '/#catalog' },
  { label: 'Pathways', href: '/#categories' },
  { label: 'Suppliers', href: '/vendors/' },
  { label: 'Calculator', href: '/#calculator' },
  { label: 'Formats', href: '/formats/' },
  { label: 'Standards', href: '/verification/' },
  { label: 'Regulatory', href: '/regulatory/' },
  { label: 'Blog', href: '/blog/' },
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
      { label: 'KPV Anti-Inflammatory Tripeptide', href: '/peptides/kpv/' },
      { label: 'PT-141 Bremelanotide Standard', href: '/peptides/pt-141/' },
    ],
  },
  {
    title: 'Signaling Pathways',
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
    title: 'Verified Suppliers',
    links: [
      { label: 'PharmaGrade Store (London)', href: '/vendors/pharmagrade/' },
      { label: 'Direct Peptides (UK & EU)', href: '/vendors/direct-peptides/' },
      { label: 'Direct Sarms (Receptors)', href: '/vendors/direct-sarms/' },
      { label: 'Peptide Works (Manchester)', href: '/vendors/peptide-works/' },
      { label: 'PharmaLab Global (Global)', href: '/vendors/pharmalab-global/' },
    ],
  },
  {
    title: 'Regulatory & Research',
    links: [
      { label: 'UK MHRA Reagent Tracker', href: '/regulatory/mhra-tracker/' },
      { label: 'Misuse of Drugs Act 1971', href: '/regulatory/uk-legal-status/' },
      { label: 'HPLC & ESI-MS Protocols', href: '/verification/' },
      { label: 'COSHH Safety Guidelines', href: '/safety/' },
      { label: 'Research Blog & Analysis', href: '/blog/' },
      { label: 'Visual HTML Sitemap', href: '/sitemap/' },
    ],
  },
];
