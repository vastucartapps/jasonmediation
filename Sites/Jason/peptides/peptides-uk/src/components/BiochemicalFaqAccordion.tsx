'use client';

import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Scale, FlaskConical, ShieldCheck, CheckCircle2, Filter } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'legal' | 'testing' | 'reconstitution' | 'vetting';
  categoryLabel: string;
  question: string;
  answer: string;
  statutoryReference?: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'legal-status-uk',
    category: 'legal',
    categoryLabel: 'UK Statutory Law',
    question: 'Are synthetic research peptides legal to purchase and possess in the United Kingdom?',
    answer: 'Yes. In the United Kingdom, non-scheduled synthetic research peptides (such as BPC-157, TB-500, Semax, GHK-Cu, and Ipamorelin) are entirely lawful to purchase, import, and possess for legitimate laboratory research and in vitro scientific experimentation. They are not controlled substances under the Misuse of Drugs Act 1971. However, under Regulation 46 of the Human Medicines Regulations 2012 (SI 2012/1916), it is a criminal offence to market, sell, or supply these unlicensed substances for human therapeutic administration or self-injection without a marketing authorisation granted by the MHRA.',
    statutoryReference: 'Human Medicines Regulations 2012 (SI 2012/1916), Reg 46; Misuse of Drugs Act 1971',
  },
  {
    id: 'research-vs-pharma',
    category: 'legal',
    categoryLabel: 'UK Statutory Law',
    question: 'What is the technical legal distinction between research reagents and licensed pharmaceutical drugs?',
    answer: 'Pharmaceutical-grade peptides are manufactured under Good Manufacturing Practice (cGMP) regulations with licensed marketing authorisation from the MHRA, requiring validated human clinical safety trials, documented sterile fill-finish operations, and batch-released endotoxin thresholds (<0.25 EU/mL). Research-grade reagents are synthesized for in vitro assay systems, pre-clinical animal models, or cell culture. They carry strict "For Research Use Only — Not for Human Consumption" designations and do not possess human clinical drug licensing.',
    statutoryReference: 'MHRA Guidance on Unlicensed Medicinal Products; ICH Q7 GMP Guidelines',
  },
  {
    id: 'mhra-sanctions',
    category: 'legal',
    categoryLabel: 'UK Statutory Law',
    question: 'What legal sanctions exist for marketing research peptides for human therapy in Great Britain?',
    answer: 'Under Regulation 268 of the Human Medicines Regulations 2012, promoting or advertising prescription-only medicines or unlicensed medicinal substances to the general public carries penalties including unlimited statutory fines and up to two years imprisonment on indictment. The MHRA actively coordinates with the Advertising Standards Authority (ASA) under UK CAP Code Rule 12.11 to issue cease-and-desist notices, seize non-compliant commercial inventories, and prosecute vendors claiming therapeutic efficacy for research chemicals.',
    statutoryReference: 'Human Medicines Regulations 2012 (SI 2012/1916), Regs 268 & 303; UK CAP Code 12.11',
  },
  {
    id: 'coshh-reach-compliance',
    category: 'legal',
    categoryLabel: 'UK Statutory Law',
    question: 'How do COSHH 2002 and UK REACH govern handling and disposal of peptide reagents in UK laboratories?',
    answer: 'Under the Control of Substances Hazardous to Health Regulations 2002 (COSHH), laboratory directors must conduct documented risk assessments before handling synthetic peptides, ensuring handling inside Class II biological safety cabinets or laminar flow hoods, use of BS EN 374 compliant nitrile gloves, and BS EN 166 safety goggles. Disposal of reconstituted solutions, spent vials, and needles must adhere to Hazardous Waste (England and Wales) Regulations 2005 using yellow UN 3291 sharps containers and licensed clinical incineration.',
    statutoryReference: 'COSHH Regulations 2002 (SI 2002/2677); Hazardous Waste Regulations 2005 (SI 2005/894)',
  },
  {
    id: 'hplc-vs-mass-spec',
    category: 'testing',
    categoryLabel: 'Analytical Testing & CoAs',
    question: 'Why is an HPLC purity percentage alone insufficient to authenticate peptide identity?',
    answer: 'High-Performance Liquid Chromatography (RP-HPLC) measures relative chromatographic area — the proportion of UV absorption at 214nm or 220nm attributable to the primary eluted peak. However, HPLC alone cannot determine whether that peak represents the intended 15-amino-acid peptide or a truncated 14-amino-acid synthesis error that co-elutes under similar retention conditions. Full chemical authentication requires Electrospray Ionization Mass Spectrometry (ESI-MS) or MALDI-TOF to confirm the exact monoisotopic molecular weight matching theoretical calculations within ±1.0 Dalton.',
    statutoryReference: 'British Pharmacopoeia Appendix III D (Chromatographic Separation Techniques)',
  },
  {
    id: 'independent-coa-auditing',
    category: 'testing',
    categoryLabel: 'Analytical Testing & CoAs',
    question: 'How do independent laboratories detect counterfeit or manipulated Certificates of Analysis (CoAs)?',
    answer: 'Counterfeit CoAs frequently exhibit mismatched font kerning, altered PDF creation metadata, missing raw chromatogram integration baselines, or lot numbers recycled across multiple production years. Legitimate independent ISO/IEC 17025 accredited laboratories (such as Janoshik, MZ Biolabs, or Chromate) maintain online public verification portals with unique QR codes, cryptographic verification hashes, or searchable ticket registries allowing researchers to confirm that the printed test report matches the laboratory\'s original unedited spectrometer output.',
    statutoryReference: 'ISO/IEC 17025:2017 General Requirements for the Competence of Testing and Calibration Laboratories',
  },
  {
    id: 'batch-purity-thresholds',
    category: 'testing',
    categoryLabel: 'Analytical Testing & CoAs',
    question: 'What is the acceptable minimum purity threshold for reproducible in vitro research?',
    answer: 'For rigorous academic and cellular assay models, the minimum analytical benchmark is ≥98.0% RP-HPLC purity, with no individual unknown chromatographic impurity exceeding 0.5% total area. Reagents exhibiting 95–97% purity contain synthesis truncation fragments, deamidated analogues, or incompletely cleaved protecting groups (e.g., Boc or Fmoc fragments) that can introduce uncontrolled biological noise, non-specific receptor binding, or premature cytotoxicity in culture.',
    statutoryReference: 'IUPAC Analytical Compendium Section 4; ICH Q3A Impurities in New Drug Substances',
  },
  {
    id: 'diluent-selection',
    category: 'reconstitution',
    categoryLabel: 'Reconstitution & Kinetics',
    question: 'Which diluent should be used for peptide reconstitution, and why is Bacteriostatic Water standard?',
    answer: 'Bacteriostatic Water for Injection (containing 0.9% w/v benzyl alcohol) is the recognized standard for laboratory multidose peptide vials because the bacteriostatic preservative inhibits microbial proliferation over repeat syringe punctures for up to 28 days at 2°C–8°C. Plain sterile water or sterile 0.9% sodium chloride (saline) lack antimicrobial preservatives; once unsealed, they must be used immediately or discarded. Furthermore, certain basic peptides (such as GHK-Cu) are highly stable in BAC water, whereas specific hydrophobic peptides may require initial solubilization in 0.1M sterile acetic acid before aqueous dilution.',
    statutoryReference: 'USP <797> Pharmaceutical Compounding; British Pharmacopoeia Monograph on Antimicrobial Preservatives',
  },
  {
    id: 'storage-temperatures',
    category: 'reconstitution',
    categoryLabel: 'Reconstitution & Kinetics',
    question: 'What are the precise temperature thresholds for peptide cake and aqueous solution stability?',
    answer: 'Lyophilized (freeze-dried) peptide cakes under vacuum purge remain chemically stable at room temperature (20°C–25°C) for short-term transit (up to 30 days) and at -20°C for long-term archival storage (24 to 36 months). Once reconstituted with an aqueous solvent, peptides become susceptible to enzymatic degradation, deamidation, and spontaneous peptide bond hydrolysis. Reconstituted solutions must be stored at 2°C–8°C in darkness and used within 21–28 days. Repeated freeze-thaw cycles of reconstituted peptides must be avoided as ice crystal formation shears delicate tertiary peptide structures.',
    statutoryReference: 'OECD GLP Consensus Document on the Application of GLP Principles to Short-Term Studies',
  },
  {
    id: 'preventing-mechanical-shear',
    category: 'reconstitution',
    categoryLabel: 'Reconstitution & Kinetics',
    question: 'Why must vortex mixing and high-velocity needle jets be avoided during dissolution?',
    answer: 'Peptides are chains of amino acids held together by amide covalent bonds, but their tertiary structural conformations and biological activity in receptor assays depend on delicate folding. Directing high-pressure solvent streams onto the lyophilized pellet or subjecting the solution to vigorous vortex agitation induces mechanical shear stress and interfacial air-water denaturation, causing aggregation into insoluble fibrils. Reconstitution should always proceed by slow wall-guided introduction followed by gentle horizontal swirling.',
    statutoryReference: 'Biochemical Engineering Journal: Shear-Induced Protein and Peptide Aggregation Kinetics',
  },
  {
    id: 'price-per-mg-normalization',
    category: 'vetting',
    categoryLabel: 'Supplier Vetting & Benchmarks',
    question: 'What does "price per mg" mean and why is sticker price misleading when comparing vendors?',
    answer: 'Different commercial vendors package peptides in varying vial sizes (e.g., 2mg, 5mg, 10mg, or 20mg). A vendor advertising a £30 vial may appear cheaper than one selling for £50, but if the former contains only 2mg (£15.00/mg) while the latter contains 10mg (£5.00/mg), the second source is three times more cost-effective. Normalizing every catalog listing to real cost per milligram allows laboratory procurement teams to evaluate genuine commercial value across all British and international vendors.',
    statutoryReference: 'UK Competition and Markets Authority (CMA) Unit Pricing Standards',
  },
  {
    id: 'trust-index-vial-checks',
    category: 'vetting',
    categoryLabel: 'Supplier Vetting & Benchmarks',
    question: 'What physical quality indicators should researchers inspect upon receiving peptide vials?',
    answer: 'Upon unboxing, researchers should verify: (1) Hermetic vacuum seal — when inserting the needle, negative pressure should draw the diluent into the vial without requiring plunger force; (2) Lyophilized cake uniformity — the pellet should be a clean white or light-coloured disk without discoloration, meltback, or sticky residue; (3) Lot number matching the accompanying independent Certificate of Analysis; and (4) Cold-chain insulated transit packaging with temperature tracking strips where appropriate.',
    statutoryReference: 'WHO Technical Report Series, No. 961: Good Distribution Practices for Pharmaceutical and Biological Products',
  },
];

export function BiochemicalFaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('legal-status-uk');

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return FAQS;
    return FAQS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const categories = [
    { id: 'all', label: 'All Topics', count: FAQS.length },
    { id: 'legal', label: 'UK Statutory Law', count: FAQS.filter((f) => f.category === 'legal').length },
    { id: 'testing', label: 'Analytical Testing & CoAs', count: FAQS.filter((f) => f.category === 'testing').length },
    { id: 'reconstitution', label: 'Reconstitution & Storage', count: FAQS.filter((f) => f.category === 'reconstitution').length },
    { id: 'vetting', label: 'Supplier Vetting', count: FAQS.filter((f) => f.category === 'vetting').length },
  ];

  return (
    <section className="container-wide space-y-6 scroll-mt-20" id="faq">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-300 text-xs font-mono font-bold text-sky-800">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>AUTHORITATIVE Q&amp;A &amp; STATUTORY COMPLIANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curated Biochemical &amp; Regulatory FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Essential legal, analytical, and handling questions answered with statutory citations to UK statutes, pharmacopeial monographs, and ISO 17025 verification standards.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 shrink-0 self-start md:self-auto font-bold">
          {FAQS.length} Curated Dossier Questions
        </div>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              // Open the first item of the selected category if available
              const first = cat.id === 'all' ? FAQS[0] : FAQS.find((f) => f.category === cat.id);
              if (first) setOpenId(first.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.id ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openId === faq.id;
          const triggerId = `faq-trigger-${faq.id}`;
          const panelId = `faq-panel-${faq.id}`;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-sky-50/40 border-sky-300 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                type="button"
                id={triggerId}
                onClick={() => toggleItem(faq.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border transition-colors ${
                      isOpen
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug block">
                      {faq.question}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider block mt-0.5">
                      {faq.categoryLabel}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-lg border transition-all shrink-0 mt-0.5 ${
                    isOpen
                      ? 'bg-sky-100 text-sky-800 border-sky-200 rotate-180'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-white space-y-3"
                >
                  <p className="pt-1">{faq.answer}</p>

                  {faq.statutoryReference && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs font-mono text-emerald-900">
                      <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-950">Statutory Citation: </strong>
                        <span>{faq.statutoryReference}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
