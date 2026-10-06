import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PEPTIDE_COMPOUNDS, getCompoundBySlug } from '../../../data';
import { evidenceLevels } from '../../../data/site';
import { ChemicalFormulaBadge } from '../../../components/ChemicalFormulaBadge';
import { SequenceStrip } from '../../../components/SequenceStrip';
import { TopSuppliersMatrix } from '../../../components/TopSuppliersMatrix';
import { LiteratureTable } from '../../../components/LiteratureTable';
import { ReconstitutionCalculator } from '../../../components/ReconstitutionCalculator';
import {
  ChevronRight,
  ShieldCheck,
  Beaker,
  Dna,
  Atom,
  FileCheck2,
  ArrowDown,
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
    title: `${compound.name} Chemical Profile, CAS ${compound.casNumber} & Research Sourcing`,
    description: `Academic chemical profile for ${compound.name} (${compound.systematicName}). Chemical formula ${compound.molecularFormula}, MW ${compound.molecularWeight}, PubChem CID, PubMed citations, and laboratory sourcing links.`,
    keywords: [
      `${compound.name} peptide`,
      `${compound.name} CAS ${compound.casNumber}`,
      `${compound.name} PubChem`,
      `${compound.name} laboratory supplier catalogues`,
      `${compound.name} dilution calculator`,
      `${compound.name} PubMed studies`,
    ],
  };
}

export default async function PeptideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);

  if (!compound) {
    notFound();
  }

  const lvl = evidenceLevels[compound.evidenceLevel];

  // Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: `${compound.name} (${compound.systematicName}) Chemical Reference & Evidence Analysis`,
    headline: `${compound.name} Chemical Specifications and Laboratory Sourcing Matrix`,
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
      name: 'Trustly Pharma Analytical Board',
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
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href={`/category/${compound.categorySlug}/`} className="hover:text-sky-400 transition-colors">
              {compound.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">{compound.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Compound Header */}
      <section className="py-12 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
              {compound.categoryName}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0a2149] text-slate-300 border border-[rgba(141,168,195,0.25)]">
              CAS: {compound.casNumber}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a2149] border border-[rgba(141,168,195,0.25)] text-xs font-mono font-bold" style={{ color: lvl.color }}>
              <span className="flex items-center gap-1">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="w-2 h-2 rounded-full inline-block"
                    style={{
                      background: n <= compound.evidencePips ? lvl.color : 'rgba(141,168,195,0.2)',
                    }}
                  />
                ))}
              </span>
              <span>{lvl.label}</span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              {compound.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-mono">
              {compound.systematicName}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {compound.shortOverview}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#suppliers"
              className="gradient-bg px-6 py-3 rounded-full font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
            >
              <span>Commercial Sourcing Catalogues ({compound.supplierLinks.length})</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#calculator"
              className="px-5 py-3 rounded-full font-mono text-xs font-semibold text-sky-300 bg-[#103059] hover:bg-[#123a6b] border border-[rgba(141,168,195,0.25)] transition-colors"
            >
              <span>Dilution Calculator</span>
            </a>

            <a
              href="#literature"
              className="px-5 py-3 rounded-full font-mono text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <span>PubMed Citations ({compound.citations.length})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-wide mt-12 space-y-12">
        {/* Chemical Specifications & Sequence Ribbon */}
        <div className="space-y-6">
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
          {/* Mechanism Bullet Points */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[rgba(141,168,195,0.18)]">
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Documented Receptor Pathways & In Vitro Signaling
              </h3>
            </div>

            <div className="space-y-4">
              {compound.mechanismOfAction.map((mech, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{mech}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] space-y-1 mt-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Investigation Scope
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {compound.preclinicalResearchNotes}
              </p>
            </div>
          </div>

          {/* Reconstitution & Storage Parameters */}
          <div className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[rgba(141,168,195,0.18)]">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Handling Parameters
              </h3>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Recommended Diluent
                </span>
                <span className="text-sky-300 font-medium">
                  {compound.reconstitution.recommendedDiluent}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Lyophilized Storage
                </span>
                <span className="text-slate-200">
                  {compound.reconstitution.storageLyophilized}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] space-y-1">
                <span className="text-slate-500 uppercase block text-[10px]">
                  Reconstituted Storage
                </span>
                <span className="text-slate-200">
                  {compound.reconstitution.storageReconstituted}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] space-y-1">
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

        {/* In-Page Reconstitution Calculator */}
        <section id="calculator" className="scroll-mt-24">
          <ReconstitutionCalculator
            initialDoseMcg={compound.reconstitution.standardDoseMcg || 250}
          />
        </section>

        {/* Audited Suppliers Matrix */}
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
