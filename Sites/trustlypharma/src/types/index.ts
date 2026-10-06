export type DeliveryFormatType = 'vial' | 'pen' | 'spray' | 'stack';

export interface AcademicCitation {
  title: string;
  journal: string;
  year: number;
  authors: string;
  pubmedId?: string;
  doi?: string;
  keyFindings: string;
}

export interface SupplierProductLink {
  supplierId: 'pharmagrade' | 'direct-peptides' | 'direct-sarms' | 'peptide-works' | 'pharmalab-global';
  supplierName: string;
  url: string;
  format: DeliveryFormatType;
  puritySpecification: string;
  batchAssayVerification: boolean;
  dispatchRegion: string;
  notes?: string;
}

export interface ReconstitutionSpecifications {
  recommendedDiluent: string;
  storageLyophilized: string;
  storageReconstituted: string;
  stabilityWindow: string;
  molecularWeightGPerMol: number;
}

export interface PeptideCompound {
  slug: string;
  name: string;
  systematicName: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  pubchemCid?: string;
  sequence?: string[];
  categorySlug: string;
  categoryName: string;
  shortOverview: string;
  mechanismOfAction: string[];
  preclinicalResearchNotes: string;
  availableFormats: DeliveryFormatType[];
  reconstitution: ReconstitutionSpecifications;
  supplierLinks: SupplierProductLink[];
  citations: AcademicCitation[];
}

export interface SupplierProfile {
  id: 'pharmagrade' | 'direct-peptides' | 'direct-sarms' | 'peptide-works' | 'pharmalab-global';
  name: string;
  domain: string;
  baseUrl: string;
  establishedYear: number;
  dispatchLocations: string[];
  analyticalAssays: string[];
  reputationSummary: string;
  verifiedScore: number;
}

export interface ResearchCategory {
  slug: string;
  name: string;
  headline: string;
  description: string;
  signalingFocus: string;
  featuredCompoundSlugs: string[];
}
