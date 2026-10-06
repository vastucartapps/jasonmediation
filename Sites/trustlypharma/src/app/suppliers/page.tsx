import Link from 'next/link';
import type { Metadata } from 'next';
import { SUPPLIER_PROFILES } from '../../data/suppliers';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Globe2,
  Truck,
  Award,
  ChevronRight,
  Beaker,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verified Laboratory Supplier Network & Analytical Benchmarks',
  description:
    'Comprehensive directory of independently audited peptide vendors offering third-party HPLC assays, electrospray mass spectrometry verification, and temperature-controlled dispatch for research laboratories.',
};

export default function SuppliersPage() {
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
            <span className="text-white font-semibold">Verified Suppliers</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-white/10 bg-gradient-to-b from-obsidian-900 to-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Third-Party Audited Chemical Vendors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Verified Laboratory Supplier Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Trustly Pharma audits third-party peptide manufacturers against rigorous chemical criteria: analytical HPLC purity ≥98.5%, electrospray mass spectrometry identity confirmation, published batch Certificates of Analysis (COAs), and established cold-chain packaging standards.
          </p>
        </div>
      </section>

      {/* Supplier Profiles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(SUPPLIER_PROFILES).map((sup) => (
            <div
              key={sup.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center font-bold text-white font-mono text-base">
                      {sup.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{sup.name}</h3>
                      <span className="text-xs font-mono text-slate-400">{sup.domain}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    ★ {sup.verifiedScore}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sup.reputationSummary}
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" /> Analytical Assays Verified:
                  </span>
                  <div className="space-y-1">
                    {sup.analyticalAssays.map((assay, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono text-slate-300 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{assay}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-400" /> Dispatch Locations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sup.dispatchLocations.map((loc, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-950 border border-white/5 text-slate-300"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={sup.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold text-obsidian-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-glow-cyan/40"
                >
                  <span>Access Verified Storefront</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
