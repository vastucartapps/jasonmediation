import { VendorProfile, SupplierProfile } from '../types';

export const VENDOR_PROFILES: Record<string, VendorProfile> = {
  pharmagrade: {
    id: 'pharmagrade',
    name: 'PharmaGrade Store',
    domain: 'pharmagrade.store',
    baseUrl: 'https://pharmagrade.store',
    establishedYear: 2018,
    headquarters: 'London, United Kingdom',
    dispatchLocations: ['United Kingdom', 'European Union', 'International'],
    productCatalogSummary:
      'Established UK-based chemical distributor specializing in high-purity research peptides, lyophilized reagent vials, and laboratory reconstitution solvents.',
    labTestingStandards: [
      'High-Performance Liquid Chromatography (HPLC) batch purity profiling',
      'Electrospray Ionization Mass Spectrometry (ESI-MS) molecular identity confirmation',
      'Certified purity threshold ≥98.0% for analytical reference assays',
      'Independent European contract laboratory third-party testing',
    ],
    packagingStandards:
      'Nitrogen-purged Type I neutral borosilicate glass vials with tamper-evident flip-off aluminum crimp seals and desiccant packs.',
    catalogCategories: [
      'Lyophilized Research Vials',
      'Pre-Mixed Multi-Dose Cartridges',
      'Metered Nasal Atomizers',
      'Bacteriostatic Water & Diluents',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Metabolic & GIP/GLP Reagents',
        url: 'https://pharmagrade.store/category/weight-loss/',
      },
      {
        categoryName: 'Growth Hormone Secretagogues',
        url: 'https://pharmagrade.store/category/growth-hormone/',
      },
      {
        categoryName: 'Tissue Repair & Angiogenesis Peptides',
        url: 'https://pharmagrade.store/category/healing/',
      },
      {
        categoryName: 'Neuropeptides & CNS Signaling Compounds',
        url: 'https://pharmagrade.store/category/nootropics/',
      },
    ],
    supportedCompoundSlugs: [
      'bpc-157',
      'tb-500',
      'semax',
      'selank',
      'cjc-1295-dac',
      'ipamorelin',
      'tirzepatide',
      'semaglutide',
      'ghk-cu',
      'mots-c',
    ],
    logoUrl: '/images/vendors/pharmagrade-logo.webp',
    faviconUrl: '/images/vendors/pharmagrade-favicon.png',
  },
  'direct-peptides': {
    id: 'direct-peptides',
    name: 'Direct Peptides',
    domain: 'direct-peptides.com',
    baseUrl: 'https://direct-peptides.com',
    establishedYear: 2017,
    headquarters: 'Dublin, Ireland & UK Hub',
    dispatchLocations: ['United Kingdom', 'European Union', 'North America', 'Worldwide'],
    productCatalogSummary:
      'International reagent supplier providing high-throughput synthesis catalogues of amino acid chains, synergistic multi-peptide blends, and calibrated spray matrices.',
    labTestingStandards: [
      'Batch-specific HPLC analytical chromatograms available on demand',
      'ESI-MS verification confirming exact monoisotopic mass',
      'Reference analytical standard purity testing exceeding ≥99.0%',
      'Accelerated degradation monitoring across simulated thermal transit',
    ],
    packagingStandards:
      'Vacuum-sealed lyophilized vials in custom protective closed-cell foam inserts with moisture-barrier outer casing.',
    catalogCategories: [
      'Single Lyophilized Peptides',
      'Synergistic Peptide Blends & Stacks',
      'Calibrated Nasal Spray Delivery Formats',
      'Reconstitution Diluents & Glassware',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Full Research Peptides Catalog',
        url: 'https://direct-peptides.com/product-category/peptides/',
      },
      {
        categoryName: 'Synergistic Peptide Blends',
        url: 'https://direct-peptides.com/product-category/peptide-blends/',
      },
      {
        categoryName: 'Calibrated Nasal Spray Reagents',
        url: 'https://direct-peptides.com/product-category/nasal-sprays/',
      },
      {
        categoryName: 'Laboratory Reconstitution Accessories',
        url: 'https://direct-peptides.com/product-category/reconstitution/',
      },
    ],
    supportedCompoundSlugs: [
      'bpc-157',
      'tb-500',
      'epitalon',
      'ghk-cu',
      'mots-c',
      'ipamorelin',
      'cjc-1295-dac',
      'tirzepatide',
      'aod-9604',
    ],
    logoUrl: '/images/vendors/direct-peptides-logo.webp',
    faviconUrl: '/images/vendors/direct-peptides-favicon.png',
  },
  'direct-sarms': {
    id: 'direct-sarms',
    name: 'Direct Sarms',
    domain: 'direct-sarms.com',
    baseUrl: 'https://direct-sarms.com',
    establishedYear: 2019,
    headquarters: 'London, United Kingdom',
    dispatchLocations: ['United Kingdom', 'European Union', 'Worldwide'],
    productCatalogSummary:
      'Online chemical retailer cataloging investigational biochemicals, multi-compound research combinations, and analytical grade control standards.',
    labTestingStandards: [
      'Gas chromatography-mass spectrometry (GC-MS) & reverse-phase HPLC assays',
      'Carrier dissolution profiling for liquid receptor-binding studies',
      'Minimum analytical purity baseline of ≥98.5% with Certificate of Analysis',
    ],
    packagingStandards:
      'UV-blocking amber borosilicate bottles with graduated laboratory transfer pipettes and induction-sealed tamper liners.',
    catalogCategories: [
      'Investigational Receptor Ligands',
      'Lyophilized Research Peptides',
      'Liquid Reagent Solutions',
      'Pre-Clinical Reference Blends',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Peptide Research Collection',
        url: 'https://direct-sarms.com/product-category/peptides/',
      },
      {
        categoryName: 'Synergistic Research Combos',
        url: 'https://direct-sarms.com/product-category/stacks/',
      },
      {
        categoryName: 'Liquid Carrier Solutions',
        url: 'https://direct-sarms.com/product-category/liquids/',
      },
    ],
    supportedCompoundSlugs: [
      'bpc-157',
      'tb-500',
      'ghk-cu',
      'ipamorelin',
      'cjc-1295-dac',
      'aod-9604',
      'tirzepatide',
    ],
    logoUrl: '/images/vendors/direct-sarms-logo.webp',
    faviconUrl: '/images/vendors/direct-sarms-favicon.png',
  },
  'peptide-works': {
    id: 'peptide-works',
    name: 'Peptide Works',
    domain: 'peptide-works.com',
    baseUrl: 'https://peptide-works.com',
    establishedYear: 2020,
    headquarters: 'Manchester, United Kingdom',
    dispatchLocations: ['United Kingdom', 'European Union'],
    productCatalogSummary:
      'Specialized UK chemical retailer focusing on high-purity solid-phase synthesis peptides with sequence validation for institutional laboratories.',
    labTestingStandards: [
      'Automated solid-phase peptide synthesis (SPPS) sequence confirmation',
      'Reverse-phase HPLC integration spectra verifying chromatographic purity ≥98.5%',
      'Karl Fischer volumetric titration measuring residual lyophilization moisture (<4%)',
      'Batch traceability with digital analytical certificate archive',
    ],
    packagingStandards:
      'High-grade neutral glass lyophilization vials capped with bromobutyl elastomer stoppers and anodized aluminum rings.',
    catalogCategories: [
      'Solid-Phase Synthesized Peptides',
      'Ultra-Pure Dilution Solvents',
      'Micro-Dosing Lab Dispensers',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Academic Peptide Catalog',
        url: 'https://peptide-works.com/category/peptides/',
      },
      {
        categoryName: 'Solvents, Water & Consumables',
        url: 'https://peptide-works.com/category/accessories/',
      },
    ],
    supportedCompoundSlugs: [
      'bpc-157',
      'tb-500',
      'semax',
      'selank',
      'epitalon',
      'tirzepatide',
      'semaglutide',
      'pt-141',
    ],
    logoUrl: '/images/vendors/peptide-works-logo.webp',
    faviconUrl: '/images/vendors/peptide-works-favicon.png',
  },
  'pharmalab-global': {
    id: 'pharmalab-global',
    name: 'PharmaLab Global',
    domain: 'pharmalabglobal.com',
    baseUrl: 'https://pharmalabglobal.com',
    establishedYear: 2016,
    headquarters: 'London, United Kingdom (International Dispatch Hubs)',
    dispatchLocations: ['United Kingdom', 'Europe', 'Australia', 'Global'],
    productCatalogSummary:
      'International reagent distribution network supplying research peptides, pre-metered multidose cartridge pens, and analytical testing consumables worldwide.',
    labTestingStandards: [
      'Triple-stage quality protocol (HPLC purity, ESI-MS identification, microbial load testing)',
      'Blind third-party analytical verification across partner European testing facilities',
      'Standardized Certificate of Analysis accompanying each commercial batch lot',
    ],
    packagingStandards:
      'Insulated isothermal dispatch packaging with temperature-monitoring chemical strips for temperature-sensitive compounds.',
    catalogCategories: [
      'Lyophilized Research Vials',
      'Pre-Mixed Multidose Pen Cartridges',
      'Nasal Spray Atomizers',
      'Cosmetic Peptide Research Reagents',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Full Peptides Inventory',
        url: 'https://pharmalabglobal.com/product-category/peptides/',
      },
      {
        categoryName: 'Pre-Mixed Cartridges & Pens',
        url: 'https://pharmalabglobal.com/product-category/pre-mixed-pens/',
      },
      {
        categoryName: 'Metered Nasal Spray Range',
        url: 'https://pharmalabglobal.com/product-category/nasal-sprays/',
      },
    ],
    supportedCompoundSlugs: [
      'bpc-157',
      'tb-500',
      'ghk-cu',
      'mots-c',
      'ipamorelin',
      'cjc-1295-dac',
      'semaglutide',
      'tirzepatide',
      'epitalon',
      'aod-9604',
      'pt-141',
      'semax',
    ],
    logoUrl: '/images/vendors/pharmalab-global-logo.webp',
    faviconUrl: '/images/vendors/pharmalab-global-favicon.png',
  },
};

export const SUPPLIER_PROFILES: Record<string, SupplierProfile> = VENDOR_PROFILES;

export function getAllVendors(): VendorProfile[] {
  return Object.values(VENDOR_PROFILES);
}

export function getVendorById(id: string): VendorProfile | undefined {
  return VENDOR_PROFILES[id];
}
