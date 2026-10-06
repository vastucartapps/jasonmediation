import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PEPTIDE_COMPOUNDS, getCompoundBySlug } from '../../../data';
import { evidenceLevels } from '../../../data/site';
import { ChemicalIdentityCard } from '../../../components/ChemicalIdentityCard';
import { SequenceStrip } from '../../../components/SequenceStrip';
import { TopSuppliersMatrix } from '../../../components/TopSuppliersMatrix';
import { LiteratureTable } from '../../../components/LiteratureTable';
import { ReconstitutionCalculator } from '../../../components/ReconstitutionCalculator';
import { BiochemicalFaqAccordion } from '../../../components/BiochemicalFaqAccordion';
import {
  ChevronRight,
  ShieldCheck,
  Atom,
  Activity,
  PackageCheck,
  ThermometerSnowflake,
  FileCheck2,
  ArrowDown,
  Sparkles,
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

  const pageUrl = `https://trustlypharma.co.uk/peptides/${compound.slug}/`;

  return {
    title: `${compound.name} Chemical Profile, CAS ${compound.casNumber} & Research Sourcing`,
    description: `Academic chemical profile for ${compound.name} (${compound.systematicName}). Chemical formula ${compound.molecularFormula}, MW ${compound.molecularWeight}, PubChem CID, PubMed citations, and laboratory sourcing links.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${compound.name} (${compound.systematicName}) Chemical Profile & Research Directory`,
      description: compound.shortOverview,
      url: pageUrl,
      type: 'article',
      siteName: 'Trustly Pharma',
    },
    twitter: {
      card: 'summary',
      title: `${compound.name} Chemical Reference Profile`,
      description: compound.shortOverview,
    },
    keywords: [
      `${compound.name} peptide`,
      `${compound.name} CAS ${compound.casNumber}`,
      `${compound.name} PubChem`,
      `${compound.name} laboratory supplier catalogues`,
      `${compound.name} dilution calculator`,
      `${compound.name} PubMed studies`,
      `${compound.name} category hub`,
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
  const pageUrl = `https://trustlypharma.co.uk/peptides/${compound.slug}/`;
  const categoryUrl = `https://trustlypharma.co.uk/category/${compound.categorySlug}/`;

  // FAQ Data for Schema and On-Page Rendering
  const faqs = [
    {
      question: `What is ${compound.name} and what is its systematic chemical classification?`,
      answer: `${compound.name} (${compound.systematicName}) is an analytically characterized peptide compound with empirical molecular formula ${compound.molecularFormula} and molecular weight ${compound.molecularWeight}. It is indexed under CAS Registry Number ${compound.casNumber} and categorized in research literature under ${compound.categoryName}.`,
    },
    {
      question: `What are the documented molecular mechanisms and in vitro signaling pathways for ${compound.name}?`,
      answer: `Preclinical in vitro and in vivo studies indicate that ${compound.name} interacts with primary cellular signaling cascades: ${compound.mechanismOfAction.slice(0, 2).join(' ')} Additional investigations focus on cellular migration and microvascular homeostasis in explanted tissue assays.`,
    },
    {
      question: `What physical delivery formats and formulations are available for ${compound.name}?`,
      answer: `${compound.name} is predominantly synthesized as lyophilized peptide vials for reconstituted laboratory assays. Additional commercial formats cataloged across verified suppliers include pre-calibrated multidose cartridges, mucosal atomizers, and synergistic multi-peptide research stacks.`,
    },
    {
      question: `What are the standard laboratory handling and reconstitution parameters for ${compound.name}?`,
      answer: `Lyophilized ${compound.name} is stored desiccated at ${compound.reconstitution.storageLyophilized}. Solution reconstitution is typically prepared using ${compound.reconstitution.recommendedDiluent}, with post-dilution storage maintained at ${compound.reconstitution.storageReconstituted}. ${compound.reconstitution.stabilityWindow}.`,
    },
  ];

  // Comprehensive Schema.org @graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.co.uk/#website',
        url: 'https://trustlypharma.co.uk',
        name: 'Trustly Pharma',
        description: 'Academic Peptide Chemical Index & Independent Sourcing Matrix',
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${compound.name} Chemical Profile & Research Sourcing Matrix`,
        description: compound.shortOverview,
        isPartOf: { '@id': 'https://trustlypharma.co.uk/#website' },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#chemical` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: compound.categoryName,
            item: categoryUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: compound.name,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ChemicalSubstance',
        '@id': `${pageUrl}#chemical`,
        name: compound.name,
        alternateName: compound.systematicName,
        identifier: compound.casNumber,
        chemicalFormula: compound.molecularFormula,
        molecularWeight: compound.molecularWeight,
        sameAs: compound.pubchemCid
          ? `https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}`
          : undefined,
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': `${pageUrl}#article`,
        headline: `${compound.name} (${compound.systematicName}) Chemical Reference & Evidence Analysis`,
        description: compound.shortOverview,
        about: { '@id': `${pageUrl}#chemical` },
        author: {
          '@type': 'Organization',
          name: 'Trustly Pharma Analytical Board',
          url: 'https://trustlypharma.co.uk',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Trustly Pharma',
          url: 'https://trustlypharma.co.uk',
        },
        citation: compound.citations.map((c) =>
          c.pubmedId
            ? `https://pubmed.ncbi.nlm.nih.gov/${c.pubmedId}/`
            : c.doi
            ? `https://doi.org/${c.doi}`
            : c.title
        ),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
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
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Dossier Header, Identity & Nav */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
                  {compound.categoryName}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0a2149] text-slate-200 border border-[rgba(141,168,195,0.25)]">
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

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                  {compound.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-mono">
                  {compound.systematicName}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {compound.shortOverview}
              </p>

              {/* Unified Jump Pill Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href="#vendor-catalogues"
                  className="gradient-bg px-4 py-2.5 rounded-full font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform text-white"
                >
                  <span>Vendor Catalogues ({compound.supplierLinks.length})</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#calculator"
                  className="px-4 py-2.5 rounded-full font-mono text-xs font-semibold text-sky-200 bg-[#0a2347] hover:bg-[#103059] border border-sky-400/40 hover:border-sky-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Dilution Calculator ↓</span>
                </a>

                <a
                  href="#literature"
                  className="px-4 py-2.5 rounded-full font-mono text-xs font-semibold text-slate-200 bg-[#061a38] hover:bg-[#0a2347] border border-[rgba(141,168,195,0.25)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>PubMed Studies ({compound.citations.length}) ↓</span>
                </a>

                <a
                  href="#faq"
                  className="px-4 py-2.5 rounded-full font-mono text-xs font-semibold text-slate-200 bg-[#061a38] hover:bg-[#0a2347] border border-[rgba(141,168,195,0.25)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Biochemical Q&A ↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: Chemical Identity Card (utilizing blank hero space) */}
            <div className="lg:col-span-5">
              <ChemicalIdentityCard compound={compound} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-wide mt-12 space-y-12">
        {/* Executive Compound Synopsis */}
        <section className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold block">
                  Executive Biochemical Summary
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Structured Chemical & Preclinical Profile
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-200 self-start sm:self-auto bg-[#020e24] px-3.5 py-1.5 rounded-full border border-[rgba(141,168,195,0.25)]">
              PubChem & PubMed Indexed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="p-4.5 rounded-2xl bg-[#02102b]/90 border border-sky-500/25 hover:border-sky-400/50 transition-colors space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-sky-500/10 text-sky-400">
                  <Atom className="w-4 h-4" />
                </div>
                <h3 className="font-mono font-bold text-sky-300 uppercase text-[11px] tracking-wide">
                  1. Chemical Identity & Sequence Architecture
                </h3>
              </div>
              <p className="text-slate-200">
                {compound.name} ({compound.systematicName}) is an analytically characterized peptide with empirical formula {compound.molecularFormula} (MW {compound.molecularWeight}). CAS Registry: {compound.casNumber}.
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#02102b]/90 border border-emerald-500/25 hover:border-emerald-400/50 transition-colors space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="font-mono font-bold text-emerald-300 uppercase text-[11px] tracking-wide">
                  2. Primary Preclinical Signaling Axis
                </h3>
              </div>
              <p className="text-slate-200">
                Investigated in preclinical assays for cellular signaling: {compound.mechanismOfAction[0]}
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#02102b]/90 border border-purple-500/25 hover:border-purple-400/50 transition-colors space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <h3 className="font-mono font-bold text-purple-300 uppercase text-[11px] tracking-wide">
                  3. Physical Formats & Delivery Matrices
                </h3>
              </div>
              <p className="text-slate-200">
                Synthesized predominantly as high-purity lyophilized powder cakes, with secondary pre-metered pen cartridges and solution atomizers cataloged across vendors.
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#02102b]/90 border border-amber-500/25 hover:border-amber-400/50 transition-colors space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                  <ThermometerSnowflake className="w-4 h-4" />
                </div>
                <h3 className="font-mono font-bold text-amber-300 uppercase text-[11px] tracking-wide">
                  4. Reconstitution & Analytical Handling
                </h3>
              </div>
              <p className="text-slate-200">
                Recommended reconstitution with {compound.reconstitution.recommendedDiluent}. Lyophilized cake stored at {compound.reconstitution.storageLyophilized}. Solution stable at {compound.reconstitution.storageReconstituted}.
              </p>
            </div>
          </div>
        </section>

        {/* Sequence Ribbon */}
        {compound.sequence && (
          <SequenceStrip
            sequence={compound.sequence}
            systematicName={compound.systematicName}
          />
        )}

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

        {/* Commercial Vendors & Partners Matrix */}
        <section id="vendor-catalogues" className="scroll-mt-24">
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

        {/* Frequently Asked Chemical Reference Questions */}
        <section id="faq" className="scroll-mt-24">
          <BiochemicalFaqAccordion faqs={faqs} compoundName={compound.name} />
        </section>
      </div>
    </div>
  );
}
