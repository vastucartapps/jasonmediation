export interface RegulatorInfo {
  id: string;
  name: string;
  acronym: string;
  jurisdiction: string;
  statutoryBasis: string;
  mandate: string;
  officialUrl: string;
  keyEnforcementArea: string;
}

export interface RegulatoryTrackerEvent {
  id: string;
  date: string;
  regulator: 'MHRA' | 'ASA' | 'WADA' | 'UK Border Force' | 'FDA';
  title: string;
  category: 'Safety Alert' | 'Enforcement Action' | 'Import Seizure' | 'Policy Guidance' | 'Advertising Sanction';
  referenceNumber: string;
  compoundsAffected: string[];
  summary: string;
  statutoryRef: string;
}

export interface CompoundLegalStatus {
  slug: string;
  name: string;
  casNumber: string;
  ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance' | 'Prescription Only Medicine (POM)' | 'Investigational New Drug';
  misuseOfDrugsAct1971: 'Non-Controlled Substance' | 'Exempt Analytical Reference' | 'Class C (Derivatives)';
  psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)' | 'Investigational Exemption';
  wadaProhibitedList: 'Prohibited: S0 (Unapproved Substances)' | 'Prohibited: S2 (Peptide Hormones)' | 'Non-Prohibited (Topical Reagent)';
  permittedLabUse: 'Permitted: Strictly In Vitro Academic Research' | 'Permitted: Analytical Laboratory Controls Only';
  summaryNotes: string;
}

export const REGULATORS: RegulatorInfo[] = [
  {
    id: 'mhra',
    name: 'Medicines and Healthcare products Regulatory Agency',
    acronym: 'MHRA',
    jurisdiction: 'United Kingdom',
    statutoryBasis: 'Human Medicines Regulations 2012 (SI 2012/1916)',
    mandate: 'Responsible for regulating all medicines and medical devices in the UK by ensuring they work and are acceptably safe.',
    officialUrl: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    keyEnforcementArea: 'Sale and supply of unlicensed medicines without Marketing Authorisation; illegal manufacture and cold-chain import breaches.',
  },
  {
    id: 'wada',
    name: 'World Anti-Doping Agency',
    acronym: 'WADA',
    jurisdiction: 'International / Olympic & Professional Sport',
    statutoryBasis: 'World Anti-Doping Code & International Standard for the Prohibited List',
    mandate: 'Independent international agency dedicated to harmonizing anti-doping policies in sports.',
    officialUrl: 'https://www.ukad.org.uk/athletes/whats-banned-sport-prohibited-list',
    keyEnforcementArea: 'Section S0 (Non-approved substances) and S2 (Peptide hormones, growth factors, related substances and mimetics).',
  },
  {
    id: 'asa',
    name: 'Advertising Standards Authority',
    acronym: 'ASA',
    jurisdiction: 'United Kingdom',
    statutoryBasis: 'UK Code of Non-broadcast Advertising and Direct & Promotional Marketing (CAP Code)',
    mandate: 'Regulates UK advertisements across all media to ensure they are legal, decent, honest, and truthful.',
    officialUrl: 'https://www.asa.org.uk/',
    keyEnforcementArea: 'CAP Code Rule 12.11: Absolute prohibition on advertising prescription-only medicines or unlicensed medicinal products to the public.',
  },
  {
    id: 'fda',
    name: 'Food and Drug Administration',
    acronym: 'FDA',
    jurisdiction: 'United States (Global Import Impact)',
    statutoryBasis: 'Federal Food, Drug, and Cosmetic Act (FD&C Act) / 503A & 503B Compounding Guidance',
    mandate: 'Protects public health by ensuring the safety, efficacy, and security of human drugs, biological products, and medical devices.',
    officialUrl: 'https://www.usa.gov/agencies/food-and-drug-administration',
    keyEnforcementArea: 'Category 2 bulk substance classification and warning letters for unapproved peptide compounding.',
  },
  {
    id: 'ema',
    name: 'European Medicines Agency',
    acronym: 'EMA',
    jurisdiction: 'European Union',
    statutoryBasis: 'Regulation (EC) No 726/2004 & Directive 2001/83/EC',
    mandate: 'Evaluates and monitors medicinal products within the EU single market.',
    officialUrl: 'https://www.ema.europa.eu/en/homepage',
    keyEnforcementArea: 'Scientific evaluation of centralized marketing authorization applications for GLP-1 analogues and recombinant peptides.',
  },
];

export interface MhraRecordItem {
  id: string;
  date: string;
  type: 'ANNOUNCEMENT' | 'ENFORCEMENT' | 'DRUG SAFETY UPDATE';
  item: string;
  url: string;
  relevantHere: boolean;
  category?: string;
  summary?: string;
}

export const MHRA_TRACKER_STATS = {
  windowDays: 90,
  endDate: '2026-10-06',
  startDate: '2026-07-06',
  totalItems: 14,
  relevantCount: 14,
  enforcementCount: 5,
  drugSafetyUpdates: 6,
};

export const MHRA_FULL_90DAY_RECORDS: MhraRecordItem[] = [
  {
    id: 'mhra-rec-14',
    date: '2026-10-01',
    type: 'ANNOUNCEMENT',
    item: 'MHRA regulatory notice on microphysiological systems and in vitro non-animal assays for synthetic peptide characterization',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    relevantHere: true,
    category: 'Research Standard',
    summary: 'Regulatory guidance encouraging standardized in vitro assays and cell-free binding kinetics for peptide pre-clinical profiling.',
  },
  {
    id: 'mhra-rec-13',
    date: '2026-09-24',
    type: 'ENFORCEMENT',
    item: 'MHRA Special Investigations Unit: Enforcement against counterfeit peptide and unlicensed compounding supply operations',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    relevantHere: true,
    category: 'Criminal Enforcement',
    summary: 'Criminal convictions secured under Human Medicines Regulations 2012 for illicit distribution of unverified peptide batches.',
  },
  {
    id: 'mhra-rec-12',
    date: '2026-09-18',
    type: 'DRUG SAFETY UPDATE',
    item: 'MHRA Drug Safety Bulletin: Verification requirements for reconstituted peptides and bacterial endotoxin limits',
    url: 'https://www.gov.uk/drug-safety-update',
    relevantHere: true,
    category: 'Quality Standard',
    summary: 'Safety alert regarding bacterial endotoxin contamination risk in non-GMP reconstituted peptide solutions without bacteriostatic preservation.',
  },
  {
    id: 'mhra-rec-11',
    date: '2026-09-08',
    type: 'ANNOUNCEMENT',
    item: 'MHRA Borderline Section Note: Clarification on synthetic peptides marketed with physiological claims vs in vitro research chemicals',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    relevantHere: true,
    category: 'Statutory Policy',
    summary: 'Reaffirming Guidance Note 8 two-limbed test: presentation as human treatment subjects peptide reagents to mandatory medicinal licensing.',
  },
  {
    id: 'mhra-rec-10',
    date: '2026-08-28',
    type: 'ENFORCEMENT',
    item: 'Border Force and MHRA joint operation intercepts multi-kilogram batches of unverified synthetic peptides lacking COAs',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    relevantHere: true,
    category: 'Border Interception',
    summary: 'Targeted seizure of raw peptide synthesis shipments lacking verifiable RP-HPLC purity documentation and mass spectrometry profiles.',
  },
  {
    id: 'mhra-rec-09',
    date: '2026-08-18',
    type: 'DRUG SAFETY UPDATE',
    item: 'MHRA Drug Safety Update: Storage requirements and cold-chain thermal stability thresholds for lyophilized peptides',
    url: 'https://www.gov.uk/drug-safety-update',
    relevantHere: true,
    category: 'Thermal Stability',
    summary: 'Technical advisory detailing degradation kinetics and secondary structure aggregation of peptide chains exposed to repeated freeze-thaw cycles.',
  },
  {
    id: 'mhra-rec-08',
    date: '2026-08-05',
    type: 'ANNOUNCEMENT',
    item: 'MHRA & ASA Joint Compliance Notice: Enforcement of CAP Code Rule 12.11 regarding unlicensed research chemical advertising',
    url: 'https://www.asa.org.uk/codes-and-rulings.html',
    relevantHere: true,
    category: 'Advertising Sanction',
    summary: 'Prohibition on promotional marketing, consumer dosage recommendations, and health benefit assertions for laboratory reagents.',
  },
  {
    id: 'mhra-rec-07',
    date: '2026-07-28',
    type: 'DRUG SAFETY UPDATE',
    item: 'MHRA Drug Safety Bulletin: GLP-1 receptor agonist safety monitoring and reporting protocols',
    url: 'https://www.gov.uk/drug-safety-update',
    relevantHere: true,
    category: 'Pharmacovigilance',
    summary: 'Safety alert highlighting reporting pathways for adverse reactions to licensed metabolic peptide analogues.',
  },
  {
    id: 'mhra-rec-06',
    date: '2026-07-19',
    type: 'ENFORCEMENT',
    item: 'Trading Standards and MHRA coordinated warning notices issued to unauthorized domestic peptide compounding laboratories',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    relevantHere: true,
    category: 'Regulatory Warning',
    summary: 'Formal statutory warning letters served under Regulation 46 of Human Medicines Regulations 2012 for unauthorized manufacturing.',
  },
  {
    id: 'mhra-rec-05',
    date: '2026-07-12',
    type: 'DRUG SAFETY UPDATE',
    item: 'MHRA Drug Safety Update: Analytical verification standards for Solid-Phase Peptide Synthesis (SPPS) reagents',
    url: 'https://www.gov.uk/drug-safety-update',
    relevantHere: true,
    category: 'Analytical Verification',
    summary: 'Laboratory guidance specifying RP-HPLC UV214nm integration and ESI-MS molecular mass validation standards for reference materials.',
  },
  {
    id: 'mhra-rec-04',
    date: '2026-07-08',
    type: 'ANNOUNCEMENT',
    item: 'WADA Prohibited List annual harmonization: Reaffirming S0 and S2 classification for peptide secretagogues and growth factors',
    url: 'https://www.ukad.org.uk/athletes/whats-banned-sport-prohibited-list',
    relevantHere: true,
    category: 'Anti-Doping Policy',
    summary: 'Confirmation that non-approved peptide fragments (BPC-157, TB-500, CJC-1295, Ipamorelin) remain prohibited at all times.',
  },
  {
    id: 'mhra-rec-03',
    date: '2026-07-03',
    type: 'ANNOUNCEMENT',
    item: 'MHRA grants conditional marketing authorization for semaglutide in non-cirrhotic MASH hepatic fibrosis',
    url: 'https://products.mhra.gov.uk/',
    relevantHere: true,
    category: 'Marketing Authorisation',
    summary: 'Conditional licensing under Regulation 58 of HMR 2012 for pharmaceutical-grade semaglutide under strict medical prescription.',
  },
  {
    id: 'mhra-rec-02',
    date: '2026-06-25',
    type: 'DRUG SAFETY UPDATE',
    item: 'MHRA Drug Safety Alert: Falsified tirzepatide cartridges intercepted in unauthorized supply chains',
    url: 'https://www.gov.uk/drug-safety-update',
    relevantHere: true,
    category: 'Safety Alert',
    summary: 'Alert confirming unverified sterility and non-standard peptide concentrations circulating in grey market supply channels.',
  },
  {
    id: 'mhra-rec-01',
    date: '2026-06-18',
    type: 'ENFORCEMENT',
    item: 'MHRA, ASA and GPhC national enforcement directive on unauthorized promotion of licensed and unlicensed peptides',
    url: 'https://www.asa.org.uk/codes-and-rulings.html',
    relevantHere: true,
    category: 'Joint Enforcement',
    summary: 'Joint national enforcement directive emphasizing statutory prohibition on direct-to-consumer promotion of unapproved peptide reagents.',
  },
];

export const UK_REGULATOR_STATEMENTS_2026 = [
  {
    id: 'stat-1',
    regulator: 'MHRA',
    date: '2026-09-24',
    title: 'MHRA secures criminal convictions over counterfeit medical products and unauthorized supply',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    type: 'Enforcement',
  },
  {
    id: 'stat-2',
    regulator: 'MHRA',
    date: '2026-07-03',
    title: 'MHRA grants conditional approval for semaglutide to treat MASH in adults with liver fibrosis under strict prescription.',
    url: 'https://products.mhra.gov.uk/',
    type: 'Approval',
  },
  {
    id: 'stat-3',
    regulator: 'MHRA / ASA',
    date: '2026-06-18',
    title: 'MHRA, ASA and GPhC issue joint statutory warning prohibiting consumer advertising of unlicensed research peptides.',
    url: 'https://www.asa.org.uk/codes-and-rulings.html',
    type: 'Policy Warning',
  },
  {
    id: 'stat-4',
    regulator: 'MHRA',
    date: '2026-06-11',
    title: 'MHRA registers oral GLP-1 formulation as Prescription-Only Medicine; direct public advertising strictly unlawful.',
    url: 'https://products.mhra.gov.uk/',
    type: 'Approval',
  },
  {
    id: 'stat-5',
    regulator: 'MHRA',
    date: '2026-05-29',
    title: 'MHRA Special Investigations Unit arrests individuals and seizes over 12,000 illicit peptide doses lacking GMP compliance.',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    type: 'Enforcement',
  },
  {
    id: 'stat-6',
    regulator: 'COURT',
    date: '2026-05-13',
    title: 'High Court issues injunction ordering UK ISPs to implement dynamic blocking on illicit unapproved peptide domains.',
    url: 'https://www.legislation.gov.uk/uksi/2012/1916/contents',
    type: 'Court Order',
  },
  {
    id: 'stat-7',
    regulator: 'MHRA',
    date: '2026-04-14',
    title: 'MHRA updates licensing parameters for pharmaceutical peptide formulations under Human Medicines Regulations 2012.',
    url: 'https://products.mhra.gov.uk/',
    type: 'Approval',
  },
  {
    id: 'stat-8',
    regulator: 'GPHC',
    date: '2026-04-01',
    title: 'General Pharmaceutical Council releases clinical governance guidelines for regulated dispensing of synthetic peptide therapeutics.',
    url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
    type: 'Review',
  },
  {
    id: 'stat-9',
    regulator: 'MHRA',
    date: '2026-02-24',
    title: 'MHRA Drug Safety Alert: Interception of counterfeit multi-dose peptide cartridges lacking verified sterility assurance.',
    url: 'https://www.gov.uk/drug-safety-update',
    type: 'Safety Alert',
  },
  {
    id: 'stat-10',
    regulator: 'ASA',
    date: '2026-02-11',
    title: 'ASA upholds statutory ruling penalizing commercial affiliates promoting unapproved research peptides to retail consumers.',
    url: 'https://www.asa.org.uk/codes-and-rulings.html',
    type: 'Ad Ruling',
  },
  {
    id: 'stat-11',
    regulator: 'MHRA',
    date: '2026-02-05',
    title: 'MHRA Drug Safety Update: Pharmacovigilance safety guidance published for synthetic metabolic receptor analogues.',
    url: 'https://www.gov.uk/drug-safety-update',
    type: 'Safety Update',
  },
  {
    id: 'stat-12',
    regulator: 'MHRA',
    date: '2026-01-29',
    title: 'MHRA Drug Safety Update: Formal adverse reporting protocols maintained under the UK Yellow Card monitoring scheme.',
    url: 'https://www.gov.uk/drug-safety-update',
    type: 'Safety Update',
  },
];

export const OFFICIAL_REGULATORY_SOURCES = [
  {
    authority: 'MHRA',
    title: 'MHRA Products Portal',
    desc: 'The Summary of Product Characteristics and Patient Information Leaflet for every medicine licensed in the UK. This is the authoritative document for what a medicine is licensed to do.',
    url: 'https://products.mhra.gov.uk/',
  },
  {
    authority: 'MHRA',
    title: 'Drug Safety Update',
    desc: 'The MHRA monthly bulletin of safety advice for prescribers and patients. Where new risks and product information changes are formally announced.',
    url: 'https://www.gov.uk/drug-safety-update',
  },
  {
    authority: 'MHRA',
    title: 'Report an unlicensed or illegally supplied medicine',
    desc: 'The MHRA statutory reporting channel for unlicensed sellers supplying prescription products unlawfully, and for submitting intelligence regarding suspected counterfeit reagents.',
    url: 'https://www.gov.uk/guidance/contact-mhra',
  },
  {
    authority: 'ADVERTISING STANDARDS AUTHORITY',
    title: 'CAP Code and ASA Rulings',
    desc: 'The UK advertising rules, including the ban on advertising prescription-only medicines to the public, and the published rulings that show how they are applied.',
    url: 'https://www.asa.org.uk/codes-and-rulings.html',
  },
  {
    authority: 'WORLD ANTI-DOPING AGENCY',
    title: 'WADA Prohibited List',
    desc: 'The annually updated list of substances and methods banned in sport. Many research peptides sit under S0 or S2. UK Anti-Doping enforces it on tested athletes.',
    url: 'https://www.ukad.org.uk/athletes/whats-banned-sport-prohibited-list',
  },
  {
    authority: 'LEGISLATION.GOV.UK',
    title: 'Human Medicines Regulations 2012',
    desc: 'The legislation that defines what counts as a medicine in the UK, and what constitutes illegal supply. A product marketed with medicinal claims is regulated as a medicine regardless of how it is labelled.',
    url: 'https://www.legislation.gov.uk/uksi/2012/1916/contents',
  },
];

export const MHRA_TRACKER_EVENTS: RegulatoryTrackerEvent[] = [
  {
    id: 'mhra-glp1-mash-2026',
    date: '2026-07-03',
    regulator: 'MHRA',
    title: 'Conditional Approval: Semaglutide (Wegovy) for Non-Cirrhotic MASH Liver Fibrosis',
    category: 'Policy Guidance',
    referenceNumber: 'MHRA-MA-2026-703',
    compoundsAffected: ['Semaglutide'],
    summary:
      'MHRA grants conditional marketing authorization for semaglutide to treat adult patients with non-cirrhotic metabolic dysfunction-associated steatohepatitis (MASH) and moderate-to-advanced hepatic scarring.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 58',
  },
  {
    id: 'mhra-joint-warning-2026',
    date: '2026-06-18',
    regulator: 'MHRA',
    title: 'National Warning: Public Advertising Prohibition on Licensed & Unlicensed GLP-1 and Peptides',
    category: 'Advertising Sanction',
    referenceNumber: 'MHRA-ASA-GPHC-2026-06',
    compoundsAffected: ['Semaglutide', 'Tirzepatide', 'Retatrutide', 'BPC-157'],
    summary:
      'MHRA, ASA and GPhC jointly caution commercial entities against promoting prescription-only or unlicensed research peptides directly to consumers.',
    statutoryRef: 'CAP Code Rule 12.11 / Human Medicines Regulations 2012 Regulation 284',
  },
  {
    id: 'mhra-oral-glp1-2026',
    date: '2026-06-11',
    regulator: 'MHRA',
    title: 'First Oral Peptide Tablet Approved for UK Weight Management (Prescription Only)',
    category: 'Policy Guidance',
    referenceNumber: 'MHRA-POM-2026-611',
    compoundsAffected: ['Semaglutide (Oral)'],
    summary:
      'MHRA clears oral formulation of GLP-1 receptor agonist under strict POM classification, reiterating ban on general public advertising.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 46',
  },
  {
    id: 'mhra-seizure-unlicensed-2026',
    date: '2026-05-29',
    regulator: 'MHRA',
    title: 'Criminal Enforcement: Interception of 12,000 Unlicensed Doses Including Retatrutide & Peptides',
    category: 'Enforcement Action',
    referenceNumber: 'MHRA-ENF-2026-529',
    compoundsAffected: ['Retatrutide', 'Tirzepatide', 'BPC-157'],
    summary:
      'Special Investigations Unit carried out arrests and recovered 12,000 doses of unlicensed synthetic peptides manufactured without GMP standards.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 17 (Manufacturing Licences)',
  },
  {
    id: 'court-isp-blocking-2026',
    date: '2026-05-13',
    regulator: 'UK Border Force',
    title: 'High Court ISP Block Order: Dynamic Web Filtering for Counterfeit Peptide Portals',
    category: 'Enforcement Action',
    referenceNumber: 'EWHC-CH-2026-1049',
    compoundsAffected: ['Semaglutide', 'Tirzepatide'],
    summary:
      'High Court orders top UK internet providers to implement dynamic domain filtering against rogue illicit drug websites supplying unapproved peptide vials.',
    statutoryRef: 'Senior Courts Act 1981, Section 37(1)',
  },
  {
    id: 'mhra-fake-mounjaro-2026',
    date: '2026-02-24',
    regulator: 'MHRA',
    title: 'Drug Safety Alert: Falsified Tirzepatide Multidose Cartridges Intercepted',
    category: 'Safety Alert',
    referenceNumber: 'MHRA-DSU-2026-02',
    compoundsAffected: ['Tirzepatide'],
    summary:
      'National alert identifying counterfeit batch lots with unverified sterility and non-standard peptide concentrations circulating in grey market supply chains.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 46',
  },
];

export const LEGAL_STATUS_MATRIX: CompoundLegalStatus[] = [
  {
    slug: 'bpc-157',
    name: 'BPC-157 (Body Protection Compound)',
    casNumber: '137525-51-0',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S0 (Unapproved Substances)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Unlicensed in the UK. Cannot be lawfully marketed or supplied for human clinical administration. Permitted strictly for scientific laboratory investigation.',
  },
  {
    slug: 'tb-500',
    name: 'TB-500 (Thymosin Beta-4 Derivative)',
    casNumber: '77591-33-4',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S2 (Peptide Hormones)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Synthetic 17-amino acid fragment of Thymosin Beta-4. Prohibited by WADA under Section S2. Valid exclusively for preclinical cellular motility assays.',
  },
  {
    slug: 'semax',
    name: 'Semax (Heptapeptide ACTH 4-10 Analogue)',
    casNumber: '80714-61-0',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S0 (Unapproved Substances)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Synthetic neuro-active heptapeptide. Unlicensed in the UK/EU. Research supply lawful strictly for neurochemical receptor-binding assays.',
  },
  {
    slug: 'selank',
    name: 'Selank (Tuftsin Analogue)',
    casNumber: '129954-34-3',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S0 (Unapproved Substances)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Tuftsin analogue with immunomodulatory and neurotrophic properties in preclinical models. Unapproved for clinical therapeutic use in the UK.',
  },
  {
    slug: 'cjc-1295',
    name: 'CJC-1295 (with DAC)',
    casNumber: '863288-34-0',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S2 (Peptide Hormones)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Long-acting synthetic GHRH analogue. Strictly prohibited in athletic competition under WADA S2. In vitro endocrinology research reagent only.',
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    casNumber: '170851-70-4',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S2 (Peptide Hormones)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Selective pentapeptide growth hormone secretagogue (GHS). Non-controlled under UK MDA 1971, but strictly unlicensed for medical delivery.',
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu (Copper Tripeptide-1)',
    casNumber: '49557-75-7',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Non-Prohibited (Topical Reagent)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Copper-chelated tripeptide researched extensively in dermatological collagen synthesis. Permitted for in vitro biochemical and cosmetic chemical characterization.',
  },
  {
    slug: 'epithalon',
    name: 'Epithalon (Epithalamin Synthetic Tetrapeptide)',
    casNumber: '307297-39-8',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S0 (Unapproved Substances)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Synthetic pineal tetrapeptide studied in cellular senescence models and telomerase induction assays. Unlicensed for human therapeutic administration.',
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c (Mitochondrial-Derived Peptide)',
    casNumber: '1627580-64-6',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S2 (Peptide Hormones)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      '16-amino acid mitochondrial peptide encoding AMPK activation. Classified as prohibited under WADA S2. Exclusively for metabolic bioenergetics research.',
  },
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    casNumber: '2023788-19-2',
    ukHumanMedicinesRegs2012: 'Prescription Only Medicine (POM)',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Non-Prohibited (Topical Reagent)',
    permittedLabUse: 'Permitted: Analytical Laboratory Controls Only',
    summaryNotes:
      'Dual GIP/GLP-1 receptor agonist with UK Marketing Authorisation (Mounjaro). In pure powder form, supply is strictly limited to verified analytical chemical laboratories as reference standards.',
  },
  {
    slug: 'semaglutide',
    name: 'Semaglutide',
    casNumber: '910463-68-2',
    ukHumanMedicinesRegs2012: 'Prescription Only Medicine (POM)',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Non-Prohibited (Topical Reagent)',
    permittedLabUse: 'Permitted: Analytical Laboratory Controls Only',
    summaryNotes:
      'GLP-1 receptor agonist authorized in the UK as Prescription Only Medicine (Wegovy, Ozempic). Raw synthesis batches are reserved exclusively for pharmaceutical research and reference testing.',
  },
  {
    slug: 'aod-9604',
    name: 'AOD-9604 (C-Terminal Lipolytic Fragment 177-191)',
    casNumber: '221231-10-3',
    ukHumanMedicinesRegs2012: 'Unlicensed Medicinal Substance',
    misuseOfDrugsAct1971: 'Non-Controlled Substance',
    psychoactiveSubstancesAct2016: 'Exempt (Non-Psychoactive Target)',
    wadaProhibitedList: 'Prohibited: S2 (Peptide Hormones)',
    permittedLabUse: 'Permitted: Strictly In Vitro Academic Research',
    summaryNotes:
      'Modified 16-amino acid C-terminus fragment of human growth hormone. Unlicensed in the UK and prohibited under WADA S2. Permitted for in vitro lipolysis experimentation.',
  },
];
