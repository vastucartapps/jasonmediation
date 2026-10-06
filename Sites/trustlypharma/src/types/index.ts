export type DeliveryFormatType = 'vial' | 'pen' | 'spray' | 'stack';
export type EvidenceType = 'human' | 'mixed' | 'animal';

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
  dispatchRegion: string;
  notes?: string;
  batchAssayVerification?: boolean;
}

export interface ReconstitutionSpecifications {
  recommendedDiluent: string;
  storageLyophilized: string;
  storageReconstituted: string;
  stabilityWindow: string;
  molecularWeightGPerMol: number;
  standardDoseMcg?: number;
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
  evidenceLevel: EvidenceType;
  evidencePips: 1 | 2 | 3;
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
  productCatalogSummary: string;
}

export interface ResearchCategory {
  slug: string;
  name: string;
  headline: string;
  description: string;
  signalingFocus: string;
  featuredCompoundSlugs: string[];
}
