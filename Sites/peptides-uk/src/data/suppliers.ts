import { VendorProfile } from '../types';

export const VENDOR_PROFILES: Record<string, VendorProfile> = {
  pharmagrade: {
    id: 'pharmagrade',
    name: 'PharmaGrade Store',
    domain: 'pharmagrade.store',
    baseUrl: 'https://pharmagrade.store',
    establishedYear: 2018,
    headquarters: 'London, United Kingdom',
    dispatchLocations: ['United Kingdom (Royal Mail Tracked 24)', 'European Union', 'International'],
    productCatalogSummary:
      'Premier UK-based chemical distributor supplying certified high-purity research peptides, lyophilized reagent vials, and laboratory reconstitution diluents to academic and corporate laboratories across Britain.',
    labTestingStandards: [
      'High-Performance Liquid Chromatography (HPLC) analytical batch purity profiling',
      'Electrospray Ionization Mass Spectrometry (ESI-MS) molecular identity confirmation',
      'Guaranteed purity threshold ≥98.0% for analytical reference assays',
      'Independent European contract laboratory third-party testing with published Certificates of Analysis (COA)',
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
    verifiedCompounds: [
      'bpc-157',
      'tb-500',
      'semax',
      'selank',
      'cjc-1295',
      'ipamorelin',
      'tirzepatide',
      'semaglutide',
      'ghk-cu',
      'mots-c',
    ],
    logoUrl: '/images/vendors/pharmagrade-logo.webp',
    faviconUrl: '/images/vendors/pharmagrade-favicon.png',
    hplcBaseline: 98.5,
  },
  'direct-peptides': {
    id: 'direct-peptides',
    name: 'Direct Peptides',
    domain: 'direct-peptides.com',
    baseUrl: 'https://direct-peptides.com',
    establishedYear: 2017,
    headquarters: 'Dublin, Ireland & UK Distribution Hub',
    dispatchLocations: ['United Kingdom Express Hub', 'European Union', 'North America', 'Worldwide'],
    productCatalogSummary:
      'Specialized British and European supplier offering an extensive catalog of automated solid-phase synthesis peptides, synergistic multi-compound research complexes, and calibrated spray matrices.',
    labTestingStandards: [
      'Batch-specific HPLC analytical chromatograms available on demand with every lot',
      'ESI-MS verification confirming exact monoisotopic mass and amino acid composition',
      'Reference analytical standard purity testing consistently exceeding ≥99.0%',
      'Accelerated degradation monitoring across simulated thermal transit corridors',
    ],
    packagingStandards:
      'Vacuum-sealed lyophilized vials in custom protective closed-cell foam inserts with moisture-barrier outer casing.',
    catalogCategories: [
      'Single Lyophilized Peptides',
      'Synergistic Peptide Blends & Stacks',
      'Calibrated Nasal Spray Delivery Formats',
      'Laboratory Reconstitution Diluents & Glassware',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Full Research Peptides Catalog',
        url: 'https://direct-peptides.com',
      },
      {
        categoryName: 'Synergistic Peptide Blends',
        url: 'https://direct-peptides.com',
      },
      {
        categoryName: 'Calibrated Nasal Spray Reagents',
        url: 'https://direct-peptides.com',
      },
      {
        categoryName: 'Laboratory Reconstitution Accessories',
        url: 'https://direct-peptides.com',
      },
    ],
    verifiedCompounds: [
      'bpc-157',
      'tb-500',
      'epithalon',
      'ghk-cu',
      'mots-c',
      'ipamorelin',
      'cjc-1295',
      'tirzepatide',
      'aod-9604',
    ],
    logoUrl: '/images/vendors/direct-peptides-logo.webp',
    faviconUrl: '/images/vendors/direct-peptides-favicon.png',
    hplcBaseline: 99.1,
  },
  'direct-sarms': {
    id: 'direct-sarms',
    name: 'Direct Sarms',
    domain: 'direct-sarms.com',
    baseUrl: 'https://direct-sarms.com',
    establishedYear: 2019,
    headquarters: 'London, United Kingdom',
    dispatchLocations: ['United Kingdom Hub', 'European Union', 'Worldwide'],
    productCatalogSummary:
      'British research biochemical provider stocking analytical-grade synthetic peptides, high-precision receptor ligands, and pre-clinical laboratory reference complexes.',
    labTestingStandards: [
      'Reverse-phase HPLC assays with UV diode array spectral detection at 214nm/254nm',
      'Carrier dissolution profiling for receptor-binding laboratory studies',
      'Minimum analytical purity baseline of ≥98.5% with lot-verified Certificates of Analysis',
    ],
    packagingStandards:
      'UV-blocking amber borosilicate containers with graduated laboratory transfer pipettes and induction-sealed tamper liners.',
    catalogCategories: [
      'Investigational Receptor Ligands',
      'Lyophilized Research Peptides',
      'Liquid Reagent Solutions',
      'Pre-Clinical Reference Blends',
    ],
    officialCategoryLinks: [
      {
        categoryName: 'Peptide Research Collection',
        url: 'https://direct-sarms.com',
      },
      {
        categoryName: 'Synergistic Research Combos',
        url: 'https://direct-sarms.com/product-category/blend-peptide-vials/',
      },
      {
        categoryName: 'Liquid Carrier Solutions',
        url: 'https://direct-sarms.com',
      },
    ],
    verifiedCompounds: [
      'bpc-157',
      'tb-500',
      'ghk-cu',
      'ipamorelin',
      'cjc-1295',
      'aod-9604',
      'tirzepatide',
    ],
    logoUrl: '/images/vendors/direct-sarms-logo.webp',
    faviconUrl: '/images/vendors/direct-sarms-favicon.png',
    hplcBaseline: 98.7,
  },
  'peptide-works': {
    id: 'peptide-works',
    name: 'Peptide Works',
    domain: 'peptide-works.com',
    baseUrl: 'https://peptide-works.com',
    establishedYear: 2020,
    headquarters: 'Manchester, United Kingdom',
    dispatchLocations: ['United Kingdom (Next Day Tracked)', 'European Union'],
    productCatalogSummary:
      'Specialized Northern England chemical laboratory supplying solid-phase synthesized peptide chains with full sequence verification and rigorous moisture controls for academic and biotech assays.',
    labTestingStandards: [
      'Automated solid-phase peptide synthesis (SPPS) sequence confirmation via Edman degradation and MS/MS',
      'Reverse-phase HPLC integration spectra verifying chromatographic purity ≥98.5%',
      'Karl Fischer volumetric titration measuring residual lyophilization moisture (<3.5%)',
      'Lot traceability with digital analytical certificate archive accessible 24/7',
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
        url: 'https://peptide-works.com',
      },
      {
        categoryName: 'Solvents, Water & Consumables',
        url: 'https://peptide-works.com',
      },
    ],
    verifiedCompounds: [
      'bpc-157',
      'tb-500',
      'semax',
      'selank',
      'epithalon',
      'tirzepatide',
      'semaglutide',
    ],
    logoUrl: '/images/vendors/peptide-works-logo.webp',
    faviconUrl: '/images/vendors/peptide-works-favicon.png',
    hplcBaseline: 98.8,
  },
  'pharmalab-global': {
    id: 'pharmalab-global',
    name: 'PharmaLab Global',
    domain: 'pharmalabglobal.com',
    baseUrl: 'https://pharmalabglobal.com',
    establishedYear: 2016,
    headquarters: 'London, United Kingdom (International Dispatch Hubs)',
    dispatchLocations: ['United Kingdom Hub', 'European Union', 'Australia', 'Global'],
    productCatalogSummary:
      'International reagent distributor maintaining UK dispatch hubs, supplying research peptides, pre-metered multidose cartridge delivery pens, and laboratory reconstitution consumables globally.',
    labTestingStandards: [
      'Triple-stage quality protocol (HPLC purity, ESI-MS identification, microbial bioburden testing)',
      'Blind third-party analytical verification across partner ISO-17025 accredited European testing facilities',
      'Standardized Certificate of Analysis accompanying each commercial batch lot with verifiable QR codes',
    ],
    packagingStandards:
      'Insulated isothermal dispatch packaging with temperature-monitoring chemical strips for thermally sensitive peptide chains.',
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
    verifiedCompounds: [
      'bpc-157',
      'tb-500',
      'ghk-cu',
      'mots-c',
      'ipamorelin',
      'cjc-1295',
      'semaglutide',
      'tirzepatide',
      'epithalon',
      'aod-9604',
      'semax',
      'selank',
    ],
    logoUrl: '/images/vendors/pharmalab-global-logo.webp',
    faviconUrl: '/images/vendors/pharmalab-global-favicon.png',
    hplcBaseline: 99.2,
  },
};

export const SUPPLIER_PROFILES = VENDOR_PROFILES;

export function getAllVendors(): VendorProfile[] {
  return Object.values(VENDOR_PROFILES);
}

export function getVendorById(id: string): VendorProfile | undefined {
  return VENDOR_PROFILES[id];
}
