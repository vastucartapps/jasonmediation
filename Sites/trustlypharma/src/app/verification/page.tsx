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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-white">HPLC Assay Purity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every production batch requires minimum chromatographic purity of ≥98.0% (with standard research batches exceeding ≥99.0%) determined by reversed-phase High-Performance Liquid Chromatography (RP-HPLC).
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Mass Spectrometry (MS)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Molecular mass confirmation performed using Electrospray Ionization Mass Spectrometry (ESI-MS) to verify theoretical molecular weight within ±1 Da tolerance.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Cold-Chain Packaging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Packaging with thermal insulating materials and expedited transit to prevent temperature excursions above recommended stability thresholds for reconstituted solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
