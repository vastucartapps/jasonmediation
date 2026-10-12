import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { ShieldCheck, ChevronRight, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Peptides UK & Editorial Standards',
  description:
    'About Peptides-UK.org: British laboratory chemical registry, editorial governance, independent supplier verification protocols, and academic mission.',
  alternates: {
    canonical: `${SITE_METADATA.url}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">About</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Award className="w-3.5 h-3.5" />
          <span>Academic Mission &amp; Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          About Peptides UK
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Peptides-UK.org was founded as an independent British academic and clinical repository to provide
          transparent biochemical data, standardized analytical quality audits, and clear statutory regulatory guidance
          for scientific researchers across the United Kingdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Independent Quality Auditing</h2>
          <p>
            We operate independently of chemical distributors. Our role is to evaluate published Certificates of Analysis
            (COAs), verify HPLC chromatograms, confirm laboratory dispatch standards, and provide researchers with an objective
            benchmarking portal.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Commitment to Statutory Compliance</h2>
          <p>
            We strictly enforce United Kingdom statutory standards under the Human Medicines Regulations 2012. We reject any
            promotional framing of peptides for human ingestion or off-label therapeutic use, framing all indexed substances
            purely as in vitro research reagents.
          </p>
        </div>
      </div>
    </div>
  );
}
