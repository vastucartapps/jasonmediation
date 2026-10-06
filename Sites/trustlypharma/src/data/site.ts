export const GREEN = '#3fe0b0';
export const AMBER = '#f6c058';
export const RED = '#f0655c';

export interface NavItem {
  label: string;
  href: string;
  primary?: boolean;
}

export interface EvidenceLevel {
  label: string;
  color: string;
  pips: number;
  description: string;
}

export const topBanner = {
  href: '/#peptides-catalog',
  desktop: 'Worldwide Peptide Index: academic chemical profiles, verified PubMed citations, and laboratory sourcing links.',
  mobile: 'Worldwide Peptide Index & Citations',
  highlight: '45+ synthetic compounds · 300+ PubMed studies indexed',
};

export const navItems: NavItem[] = [
  { label: 'Peptides A–Z', href: '/#peptides-catalog', primary: true },
  { label: 'Pathways & Categories', href: '/#categories' },
  { label: 'Evidence Map', href: '/#evidence-map' },
  { label: 'Dilution Calculator', href: '/#calculator' },
  { label: 'Delivery Formats', href: '/formats/' },
  { label: 'Commercial Sourcing', href: '/suppliers/' },
];

export const searchTabs = [
  { id: 'peptides', label: 'Compounds', pills: ['BPC-157', 'TB-500', 'Semax', 'GHK-Cu', 'CJC-1295', 'Ipamorelin', 'Tirzepatide'] },
  { id: 'categories', label: 'Research Pathways', pills: ['Recovery & Repair', 'CNS & Nootropics', 'Growth Hormone', 'Metabolic', 'Dermal Matrix'] },
  { id: 'sellers', label: 'Commercial Outlets', pills: ['PharmaGrade', 'Direct Peptides', 'Peptide Works', 'Direct Sarms', 'PharmaLab Global'] },
] as const;

export const hero = {
  titleLine1: 'The Worldwide Peptide Index &',
  titleLine2: 'Chemical Encyclopedia.',
  quote:
    'Synthesized reference directory for laboratory researchers. Indexed with verified PubChem CIDs, UniProt entries, peer-reviewed PubMed citations, amino acid sequences, and commercial laboratory sourcing links.',
  lede:
    'Academic chemical data, molecular formulas, and receptor mechanisms cataloged strictly for laboratory and pre-clinical research. Zero therapeutic or consumer claims.',
  cta: { label: 'Explore Compound Directory →', href: '/#peptides-catalog' },
  secondary: { label: 'Dilution Calculator →', href: '/#calculator' },
  card: {
    eyebrow: 'Chemical Registry & Data Standards',
    title: 'Verified Scientific Sources',
    caption: 'Primary biochemical data indexed directly from international academic databases',
    sources: [
      { name: 'PubChem (NIH)', desc: 'Chemical structures, molecular weights & CAS registries' },
      { name: 'PubMed / NCBI', desc: 'Peer-reviewed studies, PMIDs & pre-clinical trial data' },
      { name: 'UniProtKB', desc: 'Universal protein sequence & functional annotations' },
      { name: 'RCSB PDB', desc: 'Three-dimensional macromolecular structure files' },
    ],
    stats: [
      { value: '45+', label: 'compounds' },
      { value: '304', label: 'PubMed citations' },
      { value: '5', label: 'sourcing outlets' },
    ],
    cta: { label: 'Browse All Compounds A–Z →', href: '/#peptides-catalog' },
    footnote: 'Academic reference repository · laboratory research materials only',
  },
};

export const scientificStandards = {
  heading: 'Database Architecture & Sourcing Structure',
  subheading: 'Clear separation between verified academic science and commercial laboratory procurement.',
  pillars: [
    {
      num: '01',
      title: 'Verified Scientific Sources',
      text: 'Molecular formulas, CAS numbers, amino acid sequence structures, and receptor binding data are retrieved directly from verified public databases: PubChem (NIH), UniProt, and RCSB Protein Data Bank.',
    },
    {
      num: '02',
      title: 'Peer-Reviewed PubMed Literature',
      text: 'Every compound dossier is cross-referenced with indexed scientific literature. Preclinical in vitro cell assays and animal in vivo findings are cited with verified PMIDs, authors, and publication journals.',
    },
    {
      num: '03',
      title: 'Commercial Laboratory Sourcing',
      text: 'We provide direct outbound links to established commercial chemical distributors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) where laboratories can source research-grade batches.',
    },
  ],
};

export const glance = {
  label: 'At a Glance',
  items: [
    { value: '45+', text: 'compounds cataloged' },
    { value: '304', text: 'peer-reviewed PubMed studies indexed' },
    { value: '100%', text: 'PubChem & UniProt verified entries' },
    { value: '5', text: 'commercial laboratory sourcing links' },
  ],
};

export const evidenceLevels: Record<'human' | 'mixed' | 'animal', EvidenceLevel> = {
  human: {
    label: 'Human Clinical RCTs',
    color: GREEN,
    pips: 3,
    description: 'Documented in peer-reviewed randomized, placebo-controlled clinical trials.',
  },
  mixed: {
    label: 'Mixed / In Vivo Evidence',
    color: AMBER,
    pips: 2,
    description: 'Documented in robust preclinical in vivo animal models and observational assays.',
  },
  animal: {
    label: 'Preclinical / In Vitro',
    color: RED,
    pips: 1,
    description: 'Documented in cell culture, tissue explant, or preclinical rodent models.',
  },
};

export const governance = {
  tag: 'Academic Governance & Non-Clinical Notice',
  lede:
    'Trustly Pharma serves as an independent biochemical index and research directory for scientific investigation.',
  columns: [
    {
      heading: 'Authoritative Scientific Citations',
      text:
        'All primary data originate from verified scientific databases: PubChem (National Library of Medicine), UniProt, and PubMed. Commercial distributors have no role in editorial scientific data.',
    },
    {
      heading: 'Laboratory Sourcing Links Only',
      text:
        'Outbound links to commercial retailers (such as PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, and PharmaLab Global) are provided solely as procurement resources for laboratory materials.',
    },
    {
      heading: 'Strict Preclinical Research Scope',
      text:
        'All molecular mechanisms and cellular pathways describe biochemical interactions in academic models. No compounds are presented for human or animal consumption, treatment, or therapeutic intervention.',
    },
  ],
};
