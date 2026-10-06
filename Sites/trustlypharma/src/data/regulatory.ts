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
    officialUrl: 'https://www.wada-ama.org/',
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
    officialUrl: 'https://www.fda.gov/',
    keyEnforcementArea: 'Category 2 bulk substance classification and warning letters for unapproved peptide compounding.',
  },
  {
    id: 'ema',
    name: 'European Medicines Agency',
    acronym: 'EMA',
    jurisdiction: 'European Union',
    statutoryBasis: 'Regulation (EC) No 726/2004 & Directive 2001/83/EC',
    mandate: 'Evaluates and monitors medicinal products within the EU single market.',
    officialUrl: 'https://www.ema.europa.eu/',
    keyEnforcementArea: 'Scientific evaluation of centralized marketing authorization applications for GLP-1 analogues and recombinant peptides.',
  },
];

export const MHRA_TRACKER_EVENTS: RegulatoryTrackerEvent[] = [
  {
    id: 'mhra-glp1-alert-2024',
    date: '2024-11-14',
    regulator: 'MHRA',
    title: 'Drug Safety Update: Unlicensed Pre-Filled Peptide Injections Intercepted',
    category: 'Safety Alert',
    referenceNumber: 'MHRA-DSU-2024-882',
    compoundsAffected: ['Semaglutide', 'Tirzepatide'],
    summary:
      'National safety notice warning healthcare practitioners and academic researchers against counterfeit and unapproved multidose injection devices masquerading as clinical grade pens without UK marketing authorization.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 46',
  },
  {
    id: 'asa-cap-ruling-peptides',
    date: '2024-10-02',
    regulator: 'ASA',
    title: 'Enforcement Action: Prohibited Direct-to-Consumer Digital Promotion',
    category: 'Advertising Sanction',
    referenceNumber: 'ASA-CAP-ENF-7419',
    compoundsAffected: ['BPC-157', 'TB-500', 'GHK-Cu'],
    summary:
      'Compliance notice upheld against commercial retailers publishing consumer health claims for synthetic research peptides. Reaffirmed that in vitro biochemicals cannot be promoted with end-user therapy representations.',
    statutoryRef: 'CAP Code Section 12 (Medicines & Health Claims)',
  },
  {
    id: 'wada-prohibited-list-2025',
    date: '2024-09-28',
    regulator: 'WADA',
    title: '2025 Prohibited List Finalized: S0 and S2 Peptides Explicitly Categorized',
    category: 'Policy Guidance',
    referenceNumber: 'WADA-DOC-2025-S0',
    compoundsAffected: ['BPC-157', 'CJC-1295-DAC', 'Ipamorelin', 'MOTS-c'],
    summary:
      'Annual revision confirmed that all non-approved synthetic peptide analogues remain strictly prohibited at all times (in-competition and out-of-competition) under section S0 (Non-approved substances) or S2 (Peptide Hormones).',
    statutoryRef: 'World Anti-Doping Code Article 4.2.2',
  },
  {
    id: 'ukbf-customs-advisory-bulk',
    date: '2024-08-15',
    regulator: 'UK Border Force',
    title: 'Border Control Advisory: Declaration Protocols for Bulk Lyophilized Research Powders',
    category: 'Import Seizure',
    referenceNumber: 'UKBF-TARIC-2937-19',
    compoundsAffected: ['TB-500', 'Epitalon', 'Semax', 'Selank'],
    summary:
      'UK Border Force updated customs clearance guidelines requiring verified institutional consignees and formal scientific End-User Declarations for laboratory imports under HS Code 2937 (Peptide Hormones & Derivatives).',
    statutoryRef: 'Customs and Excise Management Act 1979 / UK Integrated Tariff',
  },
  {
    id: 'mhra-criminal-enforcement-lab',
    date: '2024-06-20',
    regulator: 'MHRA',
    title: 'Criminal Enforcement: Closure of Unlicensed Commercial Reconstitution Facility',
    category: 'Enforcement Action',
    referenceNumber: 'MHRA-ENF-CASE-319',
    compoundsAffected: ['BPC-157', 'Tirzepatide'],
    summary:
      'MHRA Special Investigations Unit seized non-sterile compounding equipment and unregistered chemical batches from an unapproved warehouse distributing reconstituted vials without a Manufacturer Specials (MS) licence.',
    statutoryRef: 'Human Medicines Regulations 2012, Regulation 17 (Manufacturing Licences)',
  },
  {
    id: 'fda-503a-category2-notice',
    date: '2024-04-11',
    regulator: 'FDA',
    title: 'Federal Compounding Advisory: Category 2 Bulk Drug Substance Nominations',
    category: 'Policy Guidance',
    referenceNumber: 'FDA-CDER-BULK-2024-04',
    compoundsAffected: ['BPC-157', 'AOD-9604'],
    summary:
      'FDA reaffirmed placement of BPC-157 and AOD-9604 into Category 2, prohibiting 503A and 503B compounding due to safety risks and insufficient human pharmacokinetic documentation.',
    statutoryRef: 'Section 503A of the Federal Food, Drug, and Cosmetic Act',
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
    slug: 'cjc-1295-dac',
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
    slug: 'epitalon',
    name: 'Epitalon (Epithalamin Synthetic Tetrapeptide)',
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
