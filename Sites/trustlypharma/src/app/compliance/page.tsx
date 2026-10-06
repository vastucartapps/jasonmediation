import Link from 'next/link';
import type { Metadata } from 'next';
import { Shield, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Principles & Academic Governance',
  description:
    'Editorial standards, scientific citation methodology, and non-clinical research policy at Trustly Pharma.',
};

export default function CompliancePage() {
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
            <span className="text-white font-semibold">Editorial Principles</span>
          </nav>
        </div>
      </div>

      <div className="container-wide max-w-4xl mt-12 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Academic Standards & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Editorial Principles & Non-Clinical Scope
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Trustly Pharma operates as an academic reference directory and chemical encyclopedia. Information across the site is compiled exclusively for researchers, biochemists, and laboratory analysts.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              1. Non-Clinical Laboratory Scope
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every chemical compound indexed on this website is treated exclusively as an analytical reference chemical and research material. Content is written in objective biochemical terminology without therapeutic claims or end-user administration recommendations.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Peer-Reviewed Academic Grounding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All reported biological mechanisms, receptor affinities, and secondary messenger pathways are directly cited from peer-reviewed scientific literature (PubMed, PMC). Primary chemical profiles are referenced to PubChem and UniProt. In vitro observations and preclinical rodent models are never conflated with established clinical indications.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              3. Independent Commercial Sourcing Outlets
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trustly Pharma provides outbound links to independent commercial vendors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) solely as procurement reference points for research materials. Commercial vendors have no editorial input into scientific citations or chemical dossiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
