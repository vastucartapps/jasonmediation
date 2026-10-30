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

export const FAQS: FaqItem[] = [
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
    answer: 'Third-party analytical audits verify: (1) Verifiable laboratory credentials — testing performed by accredited ISO/IEC 17025 European contract analytical facilities; (2) Raw instrument chromatogram integration data, rather than cropped summary tables; (3) Lot-specific baseline stability showing baseline resolution and zero baseline drift; and (4) Direct QR code or cryptographic verification linking directly to the testing laboratory server.',
    statutoryReference: 'ISO/IEC 17025:2017 General requirements for testing laboratories',
  },
  {
    id: 'lyophilization-moisture',
    category: 'testing',
    categoryLabel: 'Analytical Testing & CoAs',
    question: 'What is the critical significance of residual moisture in lyophilized peptide vials?',
    answer: 'Excess residual moisture (>3.0% w/w) facilitates rapid hydrolytic cleavage of peptide bonds during storage, particularly at room temperature. High-end solid-phase synthesis protocols mandate Karl Fischer volumetric titration or thermogravimetric analysis to confirm moisture below 3.0%, combined with nitrogen-purged headspace capping with bromobutyl elastomer stoppers to prevent ambient atmospheric hygroscopic uptake.',
    statutoryReference: 'European Pharmacopoeia 2.5.12 (Water: Semi-micro Determination)',
  },
  {
    id: 'bac-vs-sterile-water',
    category: 'reconstitution',
    categoryLabel: 'Reconstitution & Storage',
    question: 'Why is bacteriostatic water required for multi-dose peptide storage instead of plain sterile saline?',
    answer: 'Plain sterile water for injection (SWFI) and sterile 0.9% saline lack antimicrobial preservatives. Once the rubber vial septum is punctured by a needle, atmospheric microorganisms can enter and proliferate rapidly in the protein-rich solution at 4°C. Bacteriostatic water contains 0.9% (9 mg/mL) benzyl alcohol, an effective bacteriostatic agent that inhibits microbial bioburden growth for up to 28 days when refrigerated.',
    statutoryReference: 'United States Pharmacopeia <51> Antimicrobial Effectiveness Testing',
  },
  {
    id: 'freeze-thaw-cycles',
    category: 'reconstitution',
    categoryLabel: 'Reconstitution & Storage',
    question: 'Why do repeated freeze-thaw cycles degrade aqueous peptide stability?',
    answer: 'Freezing an aqueous peptide solution causes water to crystallize into ice lattices, forcing peptide molecules into localized high-concentration interstitial pockets. This cryo-concentration induces hydrophobic aggregation, secondary structure denaturation, and mechanical shear stress that irreversibly reduces active peptide content. If long-term frozen storage of reconstituted peptide is necessary, it must be divided into single-use aliquots before freezing.',
    statutoryReference: 'ICH Q5C Quality of Biotechnological Products: Stability Testing',
  },
  {
    id: 'vetting-criteria',
    category: 'vetting',
    categoryLabel: 'Supplier Vetting',
    question: 'What four mandatory standards must a UK peptide vendor meet to be indexed in this registry?',
    answer: 'Vendors must demonstrate: (1) UK or European dispatch hubs providing tracked cold-chain delivery within 24–48 hours; (2) Batch-specific, verifiable third-party HPLC and ESI-MS Certificates of Analysis with purity ≥98.0%; (3) Nitrogen-purged, tamper-evident borosilicate glass packaging with desiccant protection; and (4) Full compliance with UK statutory disclaimers (strict in vitro research designation, zero human consumption claims).',
    statutoryReference: 'UK Chemical (Hazard Information and Packaging for Supply) Regulations',
  },
];

export function AminoFaqAccordion() {
  const [openIds, setOpenIds] = useState<string[]>(['legal-status-uk']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Regulatory Questions' },
    { id: 'legal', label: 'UK Statutory Law' },
    { id: 'testing', label: 'HPLC & Lab Testing' },
    { id: 'reconstitution', label: 'Reconstitution Standards' },
    { id: 'vetting', label: 'Supplier Vetting' },
  ];

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === 'all') return FAQS;
    return FAQS.filter((f) => f.category === selectedCategory);
  }, [selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-14 bg-white rounded-3xl border border-zinc-200/90 p-6 md:p-10 shadow-am-card space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 mb-2.5">
            <HelpCircle className="w-4 h-4 text-indigo-700" />
            <span>Biochemical &amp; Legal Reference FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            Frequently Asked Regulatory &amp; Chemical Questions
          </h2>
          <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
            Statutory legal guidance under UK SI 2012/1916, analytical testing benchmarks, and laboratory reconstitution protocols.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
              selectedCategory === cat.id
                ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-zinc-50/70 border-indigo-300/80 shadow-xs'
                  : 'bg-white border-zinc-200/90 hover:border-zinc-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">
                    {faq.categoryLabel}
                  </span>
                  <span className="text-base font-bold text-zinc-950 tracking-tight">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 p-1 rounded-lg bg-zinc-100 text-zinc-700">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-700" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-zinc-100 space-y-3">
                  <p className="text-sm text-zinc-800 leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.statutoryReference && (
                    <div className="p-3 rounded-xl bg-white border border-zinc-200/80 text-xs font-mono text-zinc-700 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-700 flex-shrink-0" />
                      <span>
                        <strong className="text-zinc-900">Statutory Citation:</strong> {faq.statutoryReference}
                      </span>
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
