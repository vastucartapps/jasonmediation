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
  linkType?: 'category' | 'product';
}

export interface ReconstitutionSpecifications {
  recommendedDiluent: string;
  storageLyophilized: string;
  storageReconstituted: string;
  stabilityWindow: string;
  molecularWeightGPerMol: number;
  standardDoseMcg?: number;
}

export interface ReceptorPharmacology {
  primaryTarget: string;
  receptorFamily: string;
  bindingAffinity: string;
  downstreamEffectors: string[];
}

export interface PharmacokineticData {
  eliminationHalfLife: string;
  primaryDegradationPath: string;
  bioavailabilityModel: string;
  renalClearanceIndex: string;
}

export interface SynthesisParameters {
  synthesisMethod: string;
  cTerminalModification: string;
  nTerminalModification: string;
  cleavageCocktail: string;
  hplcRetentionTimeStandard: string;
  massSpectrometryStandard: string;
}

export interface StructuredEvidenceTrial {
  studyDesign: 'In Vitro Assay' | 'Preclinical In Vivo' | 'Double-Blind RCT' | 'Observational Cohort';
  sampleSize: string;
  endpointMeasured: string;
  statisticalSignificance: string;
  pubmedId: string;
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
  receptorPharmacology?: ReceptorPharmacology;
  pharmacokinetics?: PharmacokineticData;
  synthesisParameters?: SynthesisParameters;
  structuredTrials?: StructuredEvidenceTrial[];
}

export interface ResearchCategory {
  slug: string;
  name: string;
  headline: string;
  description: string;
  signalingFocus: string;
  featuredCompoundSlugs: string[];
}

export interface VendorCategoryLink {
  categoryName: string;
  url: string;
}

export interface VendorProfile {
  id: string;
  name: string;
  domain: string;
  baseUrl: string;
  establishedYear: number;
  headquarters: string;
  dispatchLocations: string[];
  productCatalogSummary: string;
  labTestingStandards: string[];
  packagingStandards: string;
  catalogCategories: string[];
  officialCategoryLinks: VendorCategoryLink[];
  verifiedCompounds: string[];
  logoUrl?: string;
  faviconUrl?: string;
  hplcBaseline?: number;
}
