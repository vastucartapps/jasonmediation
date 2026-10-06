import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldAlert, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Compliance & RUO Policy',
  description: 'Enterprise scientific content compliance standards, research-use-only firewall, and editorial governance protocols at Trustly Pharma.',
};

export default function CompliancePage() {
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
            <span className="text-white font-semibold">Compliance Policy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Regulatory & Editorial Firewall</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Editorial Compliance & Research-Use-Only (RUO) Policy
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Trustly Pharma operates strictly as an independent academic reference repository and chemical supplier matrix. We enforce strict editorial guidelines designed to maintain complete regulatory compliance across all jurisdictions, including the UK MHRA, US FDA, and European EMA frameworks.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              1. Non-Human Use Prohibition & Evidence Distance
            </h3>
            <p className="text-xs text-slate-300">
              Every chemical compound indexed on this website is treated exclusively as an analytical reference chemical and research reagent. We categorically prohibit language suggesting human administration, personal therapeutic benefit, disease prevention, or athletic performance enhancement.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Peer-Reviewed Academic Grounding
            </h3>
            <p className="text-xs text-slate-300">
              All reported biological mechanisms, receptor affinities, and secondary messenger pathways are directly cited from peer-reviewed scientific journals (PubMed, PMC, ScienceDirect, Nature). In vitro observations and preclinical rodent models are never conflated with established clinical indications.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-obsidian-900/60 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              3. Independent Supplier Indexing
            </h3>
            <p className="text-xs text-slate-300">
              Trustly Pharma does not process payments, warehouse pharmaceuticals, or fulfill customer orders. We connect qualified researchers directly with accredited suppliers that provide transparent batch Certificates of Analysis (COAs) and verifiable laboratory testing documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
