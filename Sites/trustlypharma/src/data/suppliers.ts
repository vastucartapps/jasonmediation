import { SupplierProfile } from '../types';

export const SUPPLIER_PROFILES: Record<string, SupplierProfile> = {
  pharmagrade: {
    id: 'pharmagrade',
    name: 'PharmaGrade',
    domain: 'pharmagrade.store',
    baseUrl: 'https://pharmagrade.store',
    establishedYear: 2018,
    dispatchLocations: ['United Kingdom', 'European Union', 'International'],
    productCatalogSummary: 'Commercial laboratory supplier distributing lyophilized peptide vials, reconstitution solutions, and research accessories.',
  },
  'direct-peptides': {
    id: 'direct-peptides',
    name: 'Direct Peptides',
    domain: 'direct-peptides.com',
    baseUrl: 'https://direct-peptides.com',
    establishedYear: 2017,
    dispatchLocations: ['United Kingdom', 'Europe', 'North America', 'Worldwide'],
    productCatalogSummary: 'Commercial distributor supplying single and blended synthetic peptides, nasal delivery formats, and laboratory consumables.',
  },
  'direct-sarms': {
    id: 'direct-sarms',
    name: 'Direct Sarms',
    domain: 'direct-sarms.com',
    baseUrl: 'https://direct-sarms.com',
    establishedYear: 2019,
    dispatchLocations: ['United Kingdom', 'Worldwide'],
    productCatalogSummary: 'Online laboratory retailer cataloging research compounds, peptide blends, and solvent supplies for pre-clinical assays.',
  },
  'peptide-works': {
    id: 'peptide-works',
    name: 'Peptide Works',
    domain: 'peptide-works.com',
    baseUrl: 'https://peptide-works.com',
    establishedYear: 2020,
    dispatchLocations: ['United Kingdom', 'Europe'],
    productCatalogSummary: 'Specialized chemical retailer supplying synthesized research peptides and calibrated dilution accessories across Europe.',
  },
  'pharmalab-global': {
    id: 'pharmalab-global',
    name: 'PharmaLab Global',
    domain: 'pharmalabglobal.com',
    baseUrl: 'https://pharmalabglobal.com',
    establishedYear: 2016,
    dispatchLocations: ['United Kingdom', 'Europe', 'Australia', 'Global'],
    productCatalogSummary: 'International research distributor supplying research vials, premixed cartridge pens, and laboratory reagents.',
  },
};
