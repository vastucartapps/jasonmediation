'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Scale, FlaskConical, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  statutoryReference?: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'legal-status-uk',
    question: 'Are synthetic peptides legal to purchase and possess in the United Kingdom?',
    answer: 'Yes. In the United Kingdom, non-scheduled synthetic research peptides (such as BPC-157, TB-500, Semax, GHK-Cu, and Ipamorelin) are entirely lawful to purchase, import, and possess for legitimate laboratory research and in vitro scientific experimentation. They are not controlled substances under the Misuse of Drugs Act 1971. However, under Regulation 46 of the Human Medicines Regulations 2012 (SI 2012/1916), it is a criminal offence to market, sell, or supply these unlicensed substances for human therapeutic administration or self-injection without a marketing authorisation granted by the MHRA.',
    statutoryReference: 'Human Medicines Regulations 2012 (SI 2012/1916), Reg 46; Misuse of Drugs Act 1971',
  },
  {
    id: 'research-vs-pharma',
    question: 'What is the technical distinction between research-grade peptides and pharmaceutical drugs?',
    answer: 'Pharmaceutical-grade peptides are manufactured under Good Manufacturing Practice (cGMP) regulations with licensed marketing authorisation, requiring validated clinical human safety trials, documented sterile fill-finish operations, and batch-released endotoxin thresholds (<0.25 EU/mL). Research-grade peptides are synthesized for in vitro assay systems, pre-clinical animal models, or cell culture. They carry strict "For Research Use Only — Not for Human Consumption" designations and do not possess human clinical drug licensing.',
    statutoryReference: 'MHRA Guidance on Unlicensed Medicinal Products; ICH Q7 GMP Guidelines',
  },
  {
    id: 'hplc-vs-mass-spec',
    question: 'Why is an HPLC purity percentage alone insufficient to verify peptide identity?',
    answer: 'High-Performance Liquid Chromatography (RP-HPLC) measures relative chromatographic area — the proportion of UV absorption at 214nm or 220nm attributable to the primary eluted peak. However, HPLC alone cannot determine whether that peak represents the intended 15-amino-acid peptide or a truncated 14-amino-acid synthesis error that co-elutes under similar retention conditions. Full chemical authentication requires Electrospray Ionization Mass Spectrometry (ESI-MS) or MALDI-TOF to confirm the exact monoisotopic molecular weight matching theoretical calculations within ±1.0 Dalton.',
    statutoryReference: 'British Pharmacopoeia Appendix III D (Chromatographic Separation Techniques)',
  },
  {
    id: 'diluent-selection',
    question: 'Which diluent should be used for peptide reconstitution, and why is Bacteriostatic Water standard?',
    answer: 'Bacteriostatic Water for Injection (containing 0.9% w/v benzyl alcohol) is the recognized standard for laboratory multidose peptide vials because the bacteriostatic preservative inhibits microbial proliferation over repeat syringe punctures for up to 28 days at 2°C–8°C. Plain sterile water or sterile 0.9% sodium chloride (saline) lack antimicrobial preservatives; once unsealed, they must be used immediately or discarded. Furthermore, certain basic peptides (such as GHK-Cu) are highly stable in BAC water, whereas specific hydrophobic peptides may require initial solubilization in 0.1M sterile acetic acid before aqueous dilution.',
    statutoryReference: 'USP <797> Pharmaceutical Compounding; British Pharmacopoeia Monograph on Antimicrobial Preservatives',
  },
  {
    id: 'storage-temperatures',
    question: 'What are the precise temperature thresholds for peptide cake and solution stability?',
    answer: 'Lyophilized (freeze-dried) peptide cakes under vacuum purge remain chemically stable at room temperature (20°C–25°C) for short-term transit (up to 30 days) and at -20°C for long-term archival storage (24 to 36 months). Once reconstituted with an aqueous solvent, peptides become susceptible to enzymatic degradation, deamidation, and spontaneous peptide bond hydrolysis. Reconstituted solutions must be stored at 2°C–8°C in darkness and used within 21–28 days. Repeated freeze-thaw cycles of reconstituted peptides must be avoided as ice crystal formation shears delicate tertiary peptide structures.',
    statutoryReference: 'OECD GLP Consensus Document on the Application of GLP Principles to Short-Term Studies',
  },
  {
    id: 'mhra-sanctions',
    question: 'What legal sanctions exist for marketing peptides for human therapy in Great Britain?',
    answer: 'Under Regulation 268 of the Human Medicines Regulations 2012, promoting or advertising prescription-only medicines or unlicensed medicinal substances to the general public carries penalties including unlimited statutory fines and up to two years imprisonment on indictment. The MHRA actively coordinates with the Advertising Standards Authority (ASA) under UK CAP Code Rule 12.11 to issue cease-and-desist notices, seize non-compliant commercial inventories, and prosecute vendors claiming therapeutic efficacy for research chemicals.',
    statutoryReference: 'Human Medicines Regulations 2012 (SI 2012/1916), Regs 268 & 303; UK CAP Code 12.11',
  },
  {
    id: 'independent-coa-auditing',
    question: 'How do independent laboratories detect counterfeit or manipulated Certificates of Analysis?',
    answer: 'Counterfeit CoAs frequently exhibit mismatched font kerning, altered PDF creation metadata, missing raw chromatogram integration baselines, or lot numbers recycled across multiple production years. Legitimate independent ISO/IEC 17025 accredited laboratories (such as Janoshik, MZ Biolabs, or Chromate) maintain online public verification portals with unique QR codes, cryptographic verification hashes, or searchable ticket registries allowing researchers to confirm that the printed test report matches the laboratory\'s original unedited spectrometer output.',
    statutoryReference: 'ISO/IEC 17025:2017 General Requirements for the Competence of Testing and Calibration Laboratories',
  },
  {
    id: 'coshh-reach-compliance',
    question: 'How does COSHH 2002 and UK REACH govern handling and disposal of peptide reagents in UK laboratories?',
    answer: 'Under the Control of Substances Hazardous to Health Regulations 2002 (COSHH), laboratory directors must conduct documented risk assessments before handling synthetic peptides, ensuring handling inside Class II biological safety cabinets or laminar flow hoods, use of BS EN 374 compliant nitrile gloves, and BS EN 166 safety goggles. Disposal of reconstituted solutions, spent vials, and reconstitution needles must adhere to Hazardous Waste (England and Wales) Regulations 2005 using yellow UN 3291 sharps containers and licensed clinical waste incineration.',
    statutoryReference: 'COSHH Regulations 2002 (SI 2002/2677); Hazardous Waste Regulations 2005 (SI 2005/894)',
  },
];

export function BiochemicalFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('legal-status-uk');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="container-wide space-y-8 scroll-mt-20" id="faq">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>REFERENCE Q&amp;A &amp; STATUTORY COMPLIANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Biochemical &amp; Regulatory Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Essential legal, analytical, and handling questions answered with statutory citations to UK statutes and pharmacopeial standards.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500">
          <strong>8</strong> Verified Dossier Answers
        </div>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`clinical-card bg-white border transition-all ${
                isOpen ? 'border-emerald-500/60 shadow-sm' : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3.5">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Q
                  </span>
                  <span className={`text-base sm:text-lg font-bold transition-colors leading-snug ${
                    isOpen ? 'text-emerald-900' : 'text-slate-900'
                  }`}>
                    {faq.question}
                  </span>
                </div>

                <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 sm:px-6 border-t border-slate-100 text-sm text-slate-700 leading-relaxed space-y-4">
                  <p className="pl-10.5">
                    {faq.answer}
                  </p>

                  {faq.statutoryReference && (
                    <div className="ml-10.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs font-mono text-slate-600">
                      <Scale className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800">Statutory Citation: </strong>
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
