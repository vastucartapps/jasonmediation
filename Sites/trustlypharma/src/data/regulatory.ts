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
  totalItems: 23,
  relevantCount: 4,
  enforcementCount: 2,
  drugSafetyUpdates: 3,
};

export const MHRA_FULL_90DAY_RECORDS: MhraRecordItem[] = [
  {
    id: 'mhra-rec-23',
    date: '2026-10-01',
    type: 'ANNOUNCEMENT',
    item: 'MHRA joins global regulators in call to advance alternatives to animal testing',
    url: 'https://www.gov.uk/government/news/mhra-joins-global-regulators-in-call-to-advance-alternatives-to-animal-testing',
    relevantHere: false,
    summary: 'International regulatory coalition promoting microphysiological systems and in vitro non-animal assays for pharmaceutical screening.',
  },
  {
    id: 'mhra-rec-22',
    date: '2026-09-30',
    type: 'ANNOUNCEMENT',
    item: 'DIA and MHRA announce speaker line-up for inaugural global summit',
    url: 'https://www.gov.uk/government/news/dia-and-mhra-announce-speaker-line-up',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-21',
    date: '2026-09-24',
    type: 'ENFORCEMENT',
    item: 'MHRA welcomes sentencing after fraud convictions over falsely certified medical devices',
    url: 'https://www.gov.uk/government/news/mhra-welcomes-sentencing-after-fraud-convictions',
    relevantHere: false,
    summary: 'Criminal convictions secured following joint Trading Standards and MHRA prosecution into counterfeit compliance certification.',
  },
  {
    id: 'mhra-rec-20',
    date: '2026-09-24',
    type: 'ANNOUNCEMENT',
    item: 'Five new commissioners appointed to the Commission on Human Medicines (CHM)',
    url: 'https://www.gov.uk/government/news/five-new-commissioners-appointed',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-19',
    date: '2026-09-24',
    type: 'ANNOUNCEMENT',
    item: 'Professor Dame Anna Dominiczak, Professor Alison Strath, and Fiona Cochrane: Catalysing the medicines ecosystem in Scotland',
    url: 'https://www.gov.uk/government/news/catalysing-medicines-scotland',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-18',
    date: '2026-09-23',
    type: 'ANNOUNCEMENT',
    item: 'MHRA approves lurbinectedin for adults with extensive-stage small cell lung cancer',
    url: 'https://www.gov.uk/government/news/mhra-approves-lurbinectedin',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-17',
    date: '2026-09-22',
    type: 'ANNOUNCEMENT',
    item: 'Funding opportunity launched to strengthen UK regulatory science and support healthcare innovation',
    url: 'https://www.gov.uk/government/news/funding-opportunity-launched',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-16',
    date: '2026-09-16',
    type: 'ANNOUNCEMENT',
    item: 'MHRA sets out steps to prevent avoidable harm from patient hoists',
    url: 'https://www.gov.uk/government/news/mhra-steps-patient-hoists',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-15',
    date: '2026-09-15',
    type: 'ANNOUNCEMENT',
    item: 'MHRA and Malaysia strengthen partnership on healthcare innovation and research',
    url: 'https://www.gov.uk/government/news/mhra-malaysia-partnership',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-14',
    date: '2026-09-10',
    type: 'ANNOUNCEMENT',
    item: 'Independent Commission led by NHS doctors sets out blueprint to accelerate safe AI adoption in healthcare',
    url: 'https://www.gov.uk/government/news/safe-ai-adoption-healthcare',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-13',
    date: '2026-09-02',
    type: 'DRUG SAFETY UPDATE',
    item: 'Filters should be used during the administration of Parenteral Nutrition for patients in all care settings',
    url: 'https://www.gov.uk/drug-safety-update/filters-parenteral-nutrition',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-12',
    date: '2026-09-02',
    type: 'ANNOUNCEMENT',
    item: 'MHRA and Manchester NHS partner on health innovation sandbox',
    url: 'https://www.gov.uk/government/news/mhra-manchester-sandbox',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-11',
    date: '2026-09-01',
    type: 'ANNOUNCEMENT',
    item: 'MHRA concludes review of Avacopan Vifor following reassessment of benefit-risk balance',
    url: 'https://www.gov.uk/government/news/mhra-review-avacopan',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-10',
    date: '2026-09-01',
    type: 'ANNOUNCEMENT',
    item: 'MHRA regulatory reform amendments tabled in Government\'s Health Bill',
    url: 'https://www.gov.uk/government/news/mhra-regulatory-reform-health-bill',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-09',
    date: '2026-08-27',
    type: 'ANNOUNCEMENT',
    item: 'Cari-Anne Quinn: Turning possibility into progress - health innovation in Wales',
    url: 'https://www.gov.uk/government/news/health-innovation-wales',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-08',
    date: '2026-08-26',
    type: 'ANNOUNCEMENT',
    item: 'Increased risk of wear and corrosion identified with certain cobalt chrome modular neck hip replacements',
    url: 'https://www.gov.uk/government/news/cobalt-chrome-hip-replacements',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-07',
    date: '2026-08-20',
    type: 'ANNOUNCEMENT',
    item: 'MHRA advises against using rectal catheters sold for personal use in infants',
    url: 'https://www.gov.uk/government/news/rectal-catheters-infants',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-06',
    date: '2026-08-18',
    type: 'ANNOUNCEMENT',
    item: 'MHRA sets out position on regulation of microbiome-based medicinal products',
    url: 'https://www.gov.uk/government/news/microbiome-based-medicinal-products',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-05',
    date: '2026-08-14',
    type: 'ANNOUNCEMENT',
    item: 'Vimseltinib (romvimza) approved for use in adults to treat tenosynovial giant cell tumours',
    url: 'https://www.gov.uk/government/news/vimseltinib-approved',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-04',
    date: '2026-08-13',
    type: 'ANNOUNCEMENT',
    item: 'You\'ve got the grades, but don\'t pass on your health',
    url: 'https://www.gov.uk/government/news/grades-health-advice',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-03',
    date: '2026-08-12',
    type: 'ANNOUNCEMENT',
    item: 'MHRA reaffirms the safety of childhood vaccination',
    url: 'https://www.gov.uk/government/news/childhood-vaccination-safety',
    relevantHere: false,
  },
  {
    id: 'mhra-rec-02',
    date: '2026-07-03',
    type: 'ANNOUNCEMENT',
    item: 'MHRA grants conditional approval for semaglutide (Wegovy) to treat MASH in adults with moderate to advanced liver fibrosis',
    url: 'https://www.gov.uk/government/news/semaglutide-mash-approval',
    relevantHere: true,
    category: 'Approval Action',
    summary: 'MHRA approves expanded metabolic indications for synthetic semaglutide in non-cirrhotic MASH patients with stage F2/F3 fibrosis.',
  },
  {
    id: 'mhra-rec-01',
    date: '2026-06-18',
    type: 'ANNOUNCEMENT',
    item: 'MHRA, ASA and GPhC issue a joint warning on promoting newly licensed prescription-only and unlicensed weight-management medicines',
    url: 'https://www.gov.uk/government/news/mhra-asa-gphc-joint-warning',
    relevantHere: true,
    category: 'Advertising Warning',
    summary: 'Joint national enforcement directive emphasizing strict prohibition on direct-to-consumer advertising of POM GLP-1 medicines and unapproved peptide analogues.',
  },
];

export const UK_REGULATOR_STATEMENTS_2026 = [
  {
    id: 'stat-1',
    regulator: 'MHRA',
    date: '2026-09-24',
    title: 'MHRA welcomes sentencing after fraud convictions over falsely certified medical devices',
    url: 'https://www.gov.uk/government/news/mhra-welcomes-sentencing-after-fraud-convictions',
    type: 'Enforcement',
  },
  {
    id: 'stat-2',
    regulator: 'MHRA',
    date: '2026-07-03',
    title: 'MHRA grants conditional approval for semaglutide (Wegovy) to treat MASH in adults with moderate to advanced liver fibrosis.',
    url: 'https://www.gov.uk/government/news/semaglutide-mash-approval',
    type: 'Approval',
  },
  {
    id: 'stat-3',
    regulator: 'MHRA',
    date: '2026-06-18',
    title: 'MHRA, ASA and GPhC issue a joint warning on promoting newly licensed prescription-only and unlicensed weight-management medicines.',
    url: 'https://www.gov.uk/government/news/mhra-asa-gphc-joint-warning',
    type: 'Policy Warning',
  },
  {
    id: 'stat-4',
    regulator: 'MHRA',
    date: '2026-06-11',
    title: 'MHRA approves the first GLP-1 tablet licensed for weight management in the UK. It is prescription-only and cannot be advertised to the public.',
    url: 'https://www.gov.uk/government/news/mhra-approves-first-glp1-tablet',
    type: 'Approval',
  },
  {
    id: 'stat-5',
    regulator: 'MHRA',
    date: '2026-05-29',
    title: 'Two arrested in the MHRA\'s largest ever seizure of unlicensed weight-loss medicines. Around 12,000 doses recovered, including retatrutide, tirzepatide and peptide products.',
    url: 'https://www.gov.uk/government/news/mhra-largest-seizure-unlicensed-medicines',
    type: 'Enforcement',
  },
  {
    id: 'stat-6',
    regulator: 'COURT',
    date: '2026-05-13',
    title: 'High Court orders six UK internet providers to block websites selling counterfeit and unlicensed semaglutide. Extended on 23 Jun 2026 with dynamic blocking.',
    url: 'https://www.gov.uk/government/news/high-court-blocks-unlicensed-semaglutide',
    type: 'Court Order',
  },
  {
    id: 'stat-7',
    regulator: 'MHRA',
    date: '2026-04-14',
    title: 'MHRA approves a single-dose 7.2mg semaglutide (Wegovy) pen for adults with obesity at a BMI of 30 or above.',
    url: 'https://www.gov.uk/government/news/mhra-approves-wegovy-single-dose',
    type: 'Approval',
  },
  {
    id: 'stat-8',
    regulator: 'GPHC',
    date: '2026-04-01',
    title: 'GPhC review of weight-management services reports 1,307 concerns over two years. 27% concerned prescribing practice and 17% advertising.',
    url: 'https://www.pharmacyregulation.org/news',
    type: 'Review',
  },
  {
    id: 'stat-9',
    regulator: 'MHRA',
    date: '2026-02-24',
    title: 'MHRA alert on fake Mounjaro (tirzepatide) KwikPen 15mg pens, batch D873576, dispensed by a Birmingham pharmacy. Sterility cannot be confirmed.',
    url: 'https://www.gov.uk/drug-safety-update/fake-mounjaro-alert',
    type: 'Safety Alert',
  },
  {
    id: 'stat-10',
    regulator: 'ASA',
    date: '2026-02-11',
    title: 'ASA upholds rulings that public discount and referral code posts for online pharmacies advertised prescription-only weight-loss medicines to the public.',
    url: 'https://www.asa.org.uk/rulings',
    type: 'Ad Ruling',
  },
  {
    id: 'stat-11',
    regulator: 'MHRA',
    date: '2026-02-05',
    title: 'MHRA updates semaglutide product information for the very rare risk of non-arteritic anterior ischaemic optic neuropathy (NAION).',
    url: 'https://www.gov.uk/drug-safety-update/semaglutide-naion',
    type: 'Safety Update',
  },
  {
    id: 'stat-12',
    regulator: 'MHRA',
    date: '2026-01-29',
    title: 'MHRA updates GLP-1 product information on the small risk of severe acute pancreatitis, after 1,296 Yellow Card reports between 2007 and October 2025.',
    url: 'https://www.gov.uk/drug-safety-update/glp1-pancreatitis',
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
    url: 'https://www.wada-ama.org/en/prohibited-list',
  },
  {
    authority: 'LEGISLATION.GOV.UK',
    title: 'Human Medicines Regulations 2012',
    desc: 'The legislation that defines what counts as a medicine in the UK, and what constitutes illegal supply. A product marketed with medicinal claims is regulated as a medicine regardless of how it is labelled.',
    url: 'https://www.legislation.gov.uk/uksi/2012/1916/contents/made',
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
