import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PEPTIDE_COMPOUNDS, getCompoundBySlug } from '../../../data';
import { ChemicalFormulaBadge } from '../../../components/ChemicalFormulaBadge';
import { SequenceStrip } from '../../../components/SequenceStrip';
import { TopSuppliersMatrix } from '../../../components/TopSuppliersMatrix';
import { LiteratureTable } from '../../../components/LiteratureTable';
import { FormatSelector } from '../../../components/FormatSelector';
import {
  ChevronRight,
  ShieldAlert,
  Beaker,
  Dna,
  Layers,
  Thermometer,
  FileCheck2,
  Atom,
  ArrowDown,
  Info,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PEPTIDE_COMPOUNDS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);

  if (!compound) {
    return {
      title: 'Compound Not Found | Trustly Pharma',
    };
  }

  return {
    title: `${compound.name} Research Profile & Chemical Specifications (CAS ${compound.casNumber})`,
    description: `Academic reference profile for ${compound.name} (${compound.systematicName}). Chemical formula ${compound.molecularFormula}, MW ${compound.molecularWeight}, preclinical mechanisms, and verified laboratory suppliers.`,
    keywords: [
      `${compound.name} peptide`,
      `${compound.name} CAS ${compound.casNumber}`,
      `${compound.name} molecular formula`,
      `${compound.name} suppliers`,
      `${compound.name} reconstitution protocol`,
      `${compound.name} PubMed research`,
    ],
    openGraph: {
      title: `${compound.name} (${compound.molecularFormula}) — Chemical Dossier & Verified Suppliers`,
      description: compound.shortOverview,
    },
  };
}

export default async function PeptideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);

  if (!compound) {
    notFound();
  }

  // JSON-LD structured data for Semantic Search / AEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: `${compound.name} (${compound.systematicName}) Chemical Reference & In Vitro Mechanisms`,
    headline: `${compound.name} Laboratory Specifications and Verified Analytical Suppliers`,
    description: compound.shortOverview,
    about: {
      '@type': 'ChemicalSubstance',
      name: compound.name,
      chemicalFormula: compound.molecularFormula,
      molecularWeight: compound.molecularWeight,
      identifier: compound.casNumber,
      alternateName: compound.systematicName,
    },
    author: {
      '@type': 'Organization',
      name: 'Trustly Pharma Analytical Research Board',
      url: 'https://trustlypharma.co.uk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trustly Pharma',
      url: 'https://trustlypharma.co.uk',
    },
  };

  return (
    <div className="relative pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/5 bg-obsidian-950/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href={`/category/${compound.categorySlug}`} className="hover:text-cyan-400 transition-colors">
              {compound.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">{compound.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Compound Header */}
      <section className="relative py-12 sm:py-16 border-b border-white/10 bg-gradient-to-b from-obsidian-900 to-obsidian-950 overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {compound.categoryName}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
              CAS: {compound.casNumber}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
              RUO • In Vitro Analysis
            </span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              {compound.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-mono">
              {compound.systematicName}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {compound.shortOverview}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#suppliers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-obsidian-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-glow-cyan/40"
            >
              <span>View Certified Suppliers ({compound.supplierLinks.length})</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#literature"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-medium text-slate-300 bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 transition-colors"
            >
              <span>PubMed Citations ({compound.citations.length})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Chemical Specifications Badges */}
        <div className="grid grid-cols-1 gap-6">
          <ChemicalFormulaBadge
            formula={compound.molecularFormula}
            molecularWeight={compound.molecularWeight}
            casNumber={compound.casNumber}
            pubchemCid={compound.pubchemCid}
          />

          {compound.sequence && (
            <SequenceStrip
              sequence={compound.sequence}
              systematicName={compound.systematicName}
            />
          )}
        </div>

        {/* Biological Mechanism & Preclinical Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* In Vitro Signaling Pathways */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-obsidian-900/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Documented Receptor Pathways & In Vitro Signaling
              </h3>
            </div>

            <div className="space-y-4">
              {compound.mechanismOfAction.map((mech, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{mech}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-2 mt-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Preclinical Investigation Scope
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {compound.preclinicalResearchNotes}
              </p>
            </div>
          </div>

          {/* Reconstitution & Storage Technical Sheet */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-obsidian-900/60 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Handling Parameters
              </h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Recommended Diluent
                </span>
                <span className="text-cyan-300 font-medium">
                  {compound.reconstitution.recommendedDiluent}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Lyophilized Storage
                </span>
                <span className="text-slate-200">
                  {compound.reconstitution.storageLyophilized}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Reconstituted Storage
                </span>
                <span className="text-slate-200">
                  {compound.reconstitution.storageReconstituted}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Stability Window
                </span>
                <span className="text-amber-300 text-[11px]">
                  {compound.reconstitution.stabilityWindow}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Formats Section */}
        <FormatSelector availableFormats={compound.availableFormats} />

        {/* Top Suppliers Matrix Section */}
        <section id="suppliers" className="scroll-mt-24">
          <TopSuppliersMatrix
            compoundName={compound.name}
            supplierLinks={compound.supplierLinks}
          />
        </section>

        {/* Peer-Reviewed PubMed Literature */}
        <section id="literature" className="scroll-mt-24">
          <LiteratureTable
            compoundName={compound.name}
            citations={compound.citations}
          />
        </section>
      </div>
    </div>
  );
}
