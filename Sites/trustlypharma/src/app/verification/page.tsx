import Link from 'next/link';
import type { Metadata } from 'next';
import { Award, ChevronRight, CheckCircle2, FileCheck2, ShieldCheck, Microscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Supplier Verification Standard & Analytical Testing Benchmarks',
  description: 'Technical criteria and analytical testing standards required for third-party laboratory peptide suppliers indexed on Trustly Pharma.',
};

export default function VerificationPage() {
  return (
    <div className="relative pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/5 bg-obsidian-950/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Verification Standard</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Microscope className="w-3.5 h-3.5" />
            <span>Analytical Quality Assurance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Supplier Verification Standard
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Trustly Pharma maintains rigorous auditing protocols before approving any third-party peptide vendor for inclusion in our comparison directory. Suppliers must satisfy three core analytical benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="text-base font-bold text-white">HPLC Assay Purity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every production batch must demonstrate minimum chromatographic purity of ≥98.5% (with standard batches exceeding ≥99.0%) via reversed-phase High-Performance Liquid Chromatography.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="text-base font-bold text-white">Mass Spectrometry (MS)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Molecular mass confirmation must be performed using Electrospray Ionization Mass Spectrometry (ESI-MS) to verify theoretical molecular weight within ±1 Da tolerance.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="text-base font-bold text-white">Cold-Chain Logistics</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vendors must employ validated packaging with thermal insulating materials and expedited transit to prevent temperature excursions above recommended stability thresholds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
