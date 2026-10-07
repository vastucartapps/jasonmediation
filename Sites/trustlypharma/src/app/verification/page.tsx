import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Microscope, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chemical Purity & Analytical Testing Standards (HPLC & MS)',
  description:
    'Technical criteria and analytical testing standards required for research-grade synthetic peptides, including HPLC assay chromatography and electrospray mass spectrometry.',
};

export default function VerificationPage() {
  return (
    <div className="relative pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Analytical Standards</span>
          </nav>
        </div>
      </div>

      <div className="container-wide max-w-4xl mt-12 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Microscope className="w-3.5 h-3.5" />
            <span>Analytical Quality Assurance Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Chemical Purity & Analytical Standards
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Analytical benchmarks applied to research peptide compounds. In pre-clinical biochemistry, synthetic peptides must satisfy rigorous chromatographic and spectroscopic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#0a2149] to-[#061838] border border-[rgba(141,168,195,0.25)] hover:border-sky-400/50 transition-all space-y-4 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-400/35 text-sky-300 flex items-center justify-center font-bold font-mono text-base shadow-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-white">HPLC Assay Purity</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Every production batch requires minimum chromatographic purity of ≥98.0% (with standard research batches exceeding ≥99.0%) determined by reversed-phase High-Performance Liquid Chromatography (RP-HPLC). The main peak area percentage must be calculated against solvent blanks without baseline suppression.
            </p>
          </div>

          <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#0a2149] to-[#061838] border border-[rgba(141,168,195,0.25)] hover:border-emerald-400/50 transition-all space-y-4 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 flex items-center justify-center font-bold font-mono text-base shadow-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Mass Spectrometry (ESI-MS)</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Molecular mass confirmation performed using Electrospray Ionization Mass Spectrometry (ESI-MS) or MALDI-TOF to verify theoretical molecular weight within ±1.0 Da tolerance. Confirms full amino acid chain elongation without truncated or deleted synthesis artifacts.
            </p>
          </div>

          <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#0a2149] to-[#061838] border border-[rgba(141,168,195,0.25)] hover:border-amber-400/50 transition-all space-y-4 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-400/35 text-amber-300 flex items-center justify-center font-bold font-mono text-base shadow-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Cold-Chain Integrity</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Lyophilized peptide cakes must be desiccated and sealed under high-purity inert nitrogen gas. Cold-chain storage at -20°C is required for extended preservation, with thermal transit protection to prevent moisture infiltration and enzymatic degradation.
            </p>
          </div>
        </div>

        {/* Analytical Red Flags & CoA Verification Checklist */}
        <div className="rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#05183d] via-[#07214e] to-[#041433] border border-sky-500/35 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Certificate of Analysis (CoA) Verification Checklist
              </h2>
              <span className="text-xs font-mono text-sky-300">
                Independent Quality Signals Required Before Laboratory Procurement
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-200">
            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <h4 className="font-bold text-sky-300 font-mono text-xs uppercase tracking-wider">
                ✓ Unique Lot / Batch Traceability
              </h4>
              <p className="leading-relaxed">
                The lot number printed on the physical vial label must correspond letter-for-letter with the batch identifier stamped on the chromatographic report. Batch reports missing specific dates or lot numbers represent unverified lots.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <h4 className="font-bold text-sky-300 font-mono text-xs uppercase tracking-wider">
                ✓ Independent Testing Portal Verification
              </h4>
              <p className="leading-relaxed">
                Third-party analytical testing bodies (e.g., Janoshik, MZ Biolabs) provide digital verification QR codes or direct URL authentication portals where analytical reports can be independently confirmed against the laboratory database.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <h4 className="font-bold text-rose-300 font-mono text-xs uppercase tracking-wider">
                ⚠ Red Flag: Recycled Chromatograms
              </h4>
              <p className="leading-relaxed">
                Identical retention time curves, pixel-for-pixel matching baseline noise, or mismatched instrument serial numbers across separate compound orders indicate falsified or reused chromatographic charts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <h4 className="font-bold text-rose-300 font-mono text-xs uppercase tracking-wider">
                ⚠ Red Flag: Unaccredited Internal In-House Testing
              </h4>
              <p className="leading-relaxed">
                Self-certified quality claims that fail to disclose third-party testing credentials, raw chromatograms, and detector parameters (UV wavelength 214 nm or 220 nm) fail baseline scientific procurement standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
