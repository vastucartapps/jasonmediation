import Link from 'next/link';
import type { Metadata } from 'next';
import { Database, ChevronRight, CheckCircle2, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Trustly Pharma | Scientific Methodology & Chemical Indexing',
  description:
    'Overview of Trustly Pharma, chemical indexing methodology, peer-reviewed PubMed citations, and independent commercial vendor directory.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/about/',
  },
};

export default function AboutPage() {
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
            <span className="text-white font-semibold">About & Methodology</span>
          </nav>
        </div>
      </div>

      <div className="container-wide max-w-4xl mt-12 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Database className="w-3.5 h-3.5" />
            <span>Biochemical Index & Reference Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Trustly Pharma
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Trustly Pharma is an independent biochemical encyclopedia and chemical catalog. We provide researchers, laboratory analysts, and biochemists with systematically structured chemical reference profiles, molecular formulas, and verified scientific literature citations.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              1. Primary Chemical Identifier Standards
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every compound profile in the index is cataloged with verified CAS Registry Numbers, empirical molecular formulas, molecular weights, and PubChem Compound Identification numbers (CIDs). Sequence notations conform to standard IUPAC 3-letter amino acid designations.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Peer-Reviewed Literature Curation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All reported receptor pathways, downstream cellular mechanisms, and enzymatic cascades are directly linked to indexed scientific literature on PubMed / NCBI, with exact PMIDs, author credits, and DOI references.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              3. Independent Commercial Vendor Directory
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trustly Pharma catalogs third-party chemical vendors and distributors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) to allow laboratories to inspect product availability, batch purity specifications, and physical delivery formats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
