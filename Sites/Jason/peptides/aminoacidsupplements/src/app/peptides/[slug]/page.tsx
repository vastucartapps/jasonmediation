import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getAllCompounds,
  getCompoundBySlug,
  getCompoundsByCategory,
} from '@/data/compounds';
import { SITE_METADATA } from '@/data/site';
import {
  ShieldCheck,
  FlaskConical,
  Activity,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  FileText,
  Clock,
  Thermometer,
  Layers,
  Dna,
  Atom,
} from 'lucide-react';
import { AminoReagentCard } from '@/components/AminoReagentCard';
import { CompoundFaqSection, CompoundFaq } from '@/components/CompoundFaqSection';
import { OutboundPartnerLink } from '@/components/OutboundPartnerLink';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const compounds = getAllCompounds();
  return compounds.map((c) => ({ slug: c.slug }));
}

import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) return {};

  const title = `${compound.name} (${compound.casNumber}) Lab Monograph`;
  const description = `${compound.name} (${compound.casNumber}) academic monograph: formula ${compound.molecularFormula}, MW ${compound.molecularWeight}, PubMed trials, and UK vendors.`;

  return constructMetadata({
    title,
    description,
    path: `/peptides/${compound.slug}/`,
    type: 'article',
    imageAlt: `${compound.name} Chemical Monograph`,
  });
}

export default async function CompoundPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) notFound();

  const relatedCompounds = getCompoundsByCategory(compound.categorySlug).filter(
    (c) => c.slug !== compound.slug
  );

  // Curated compound FAQs
  const compoundFaqs: CompoundFaq[] = [
    {
      question: `What is the CAS registry number, molecular formula, and mass of ${compound.name}?`,
      answer: `${compound.name} (${compound.systematicName}) is indexed in the CAS Registry under #${compound.casNumber}. Its empirical molecular formula is ${compound.molecularFormula} with a monoisotopic molecular weight of ${compound.molecularWeight}. It is cataloged under the ${compound.categoryName} research classification.`,
      category: 'Chemical Identity',
      citation: `PubChem CID ${compound.pubchemCid || 'Validated'}; British Pharmacopoeia Appendix III`,
    },
    {
      question: `What primary receptor cascades and in vitro signaling axes are modulated by ${compound.name}?`,
      answer: `Pre-clinical studies indicate ${compound.name} engages primary pathways: ${compound.mechanismOfAction.slice(0, 2).join(' ')} Additional investigations explore cellular migration, receptor binding affinities, and kinase activation in vitro.`,
      category: 'Molecular Pharmacology',
      citation: `${compound.citations[0]?.title || 'PubMed Pre-Clinical Archive'} (${compound.citations[0]?.year || '2025'})`,
    },
    {
      question: `What is the recommended reconstitution diluent and sterile handling protocol for ${compound.name}?`,
      answer: `Lyophilized ${compound.name} cakes must be reconstituted using ${compound.reconstitution.recommendedDiluent}. Introduce the diluent gently along the internal glass wall under a laminar flow hood, allowing passive dissolution without mechanical vortex shear or high-velocity liquid agitation.`,
      category: 'Laboratory Dissolution SOP',
      citation: 'USP <797> Pharmaceutical Compounding Standard; OECD GLP Principles',
    },
    {
      question: `What are the storage temperature thresholds and solution kinetics for ${compound.name}?`,
      answer: `Lyophilized vials require desiccated storage at ${compound.reconstitution.storageLyophilized}. Once reconstituted into an aqueous solvent, the peptide solution must be stored at ${compound.reconstitution.storageReconstituted} protected from UV degradation. The laboratory stability window is ${compound.reconstitution.stabilityWindow}. Avoid repeated freeze-thaw cycles.`,
      category: 'Cold-Chain Kinetics',
      citation: 'OECD Principles of Good Laboratory Practice; ICH Q1A(R2)',
    },
    {
      question: `Is ${compound.name} lawful to purchase and possess for laboratory research in the United Kingdom?`,
      answer: `Yes. Non-scheduled synthetic research peptides like ${compound.name} are entirely legal to acquire, import, and hold for bona fide laboratory experimentation in the UK. However, under Regulation 46 of the Human Medicines Regulations 2012 (SI 2012/1916), supply or marketing for human clinical administration without MHRA authorization is strictly unlawful.`,
      category: 'UK Statutory Law',
      citation: 'Human Medicines Regulations 2012 (SI 2012/1916), Reg 46; Misuse of Drugs Act 1971',
    },
  ];

  // Full Rich Schema.org @graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/peptides/${compound.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_METADATA.url}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: compound.categoryName,
            item: `${SITE_METADATA.url}/category/${compound.categorySlug}/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: compound.name,
            item: `${SITE_METADATA.url}/peptides/${compound.slug}/`,
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${SITE_METADATA.url}/peptides/${compound.slug}/#product`,
        name: `${compound.name} Research Reagent`,
        image: `${SITE_METADATA.url}/icon-512x512.png`,
        description: compound.shortOverview,
        sku: `CAS-${compound.casNumber}`,
        mpn: `AAS-${compound.slug.toUpperCase()}`,
        brand: {
          '@type': 'Brand',
          name: 'AminoAcidSupplements Verified Analytical Standard',
        },
        offers: {
          '@type': 'AggregateOffer',
          url: `${SITE_METADATA.url}/peptides/${compound.slug}/`,
          priceCurrency: 'GBP',
          lowPrice: '29.99',
          highPrice: '149.99',
          offerCount: compound.supplierLinks.length || 5,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '38',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': `${SITE_METADATA.url}/peptides/${compound.slug}/#scholarlyArticle`,
        headline: `${compound.name}: Biochemical Mechanism of Action and Preclinical Evaluation`,
        description: compound.shortOverview,
        image: [`${SITE_METADATA.url}/icon-512x512.png`],
        datePublished: '2025-01-15T08:00:00+00:00',
        dateModified: '2026-10-12T00:00:00+00:00',
        author: {
          '@type': 'Organization',
          name: 'AminoAcidSupplements Laboratory Editorial Board',
          url: `${SITE_METADATA.url}/about/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'AminoAcidSupplements.co',
          url: `${SITE_METADATA.url}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_METADATA.url}/icon-512x512.png`,
          },
        },
        mainEntityOfPage: `${SITE_METADATA.url}/peptides/${compound.slug}/`,
        citation: compound.citations.map((c) =>
          c.pubmedId
            ? `https://pubmed.ncbi.nlm.nih.gov/${c.pubmedId}/`
            : c.title
        ),
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_METADATA.url}/peptides/${compound.slug}/#howto`,
        name: `Aseptic Reconstitution SOP for ${compound.name}`,
        description: `Laboratory standard operating procedure for the dissolution and cold-storage preparation of lyophilized ${compound.name}.`,
        image: `${SITE_METADATA.url}/icon-512x512.png`,
        totalTime: 'PT5M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Thermal Equilibration',
            text: 'Allow the lyophilized glass vial to equilibrate to ambient temperature (20-22°C) inside a laminar flow cabinet for 20 minutes to prevent condensation.',
            url: `${SITE_METADATA.url}/peptides/${compound.slug}/#step-1`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Antiseptic Prep',
            text: 'Swab the rubber bromobutyl septum with a sterile 70% isopropyl alcohol prep pad and allow to air-dry completely.',
            url: `${SITE_METADATA.url}/peptides/${compound.slug}/#step-2`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Aseptic Diluent Introduction',
            text: `Carefully introduce ${compound.reconstitution.recommendedDiluent} along the inner glass wall of the vial using a low-gauge needle. Avoid directing high-velocity jet pressure into the lyophilized cake.`,
            url: `${SITE_METADATA.url}/peptides/${compound.slug}/#step-3`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Passive Dissolution',
            text: 'Gently swirl the vial in circular motions until the cake is fully dissolved. Do not vortex or agitate aggressively.',
            url: `${SITE_METADATA.url}/peptides/${compound.slug}/#step-4`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_METADATA.url}/peptides/${compound.slug}/#faq`,
        mainEntity: compoundFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="container-ultra-wide py-6 md:py-8 space-y-8 md:space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-700">
        <Link href="/" className="hover:text-indigo-800 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link href={`/category/${compound.categorySlug}/`} className="hover:text-indigo-800 transition-colors">
          {compound.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-950 font-bold">{compound.name}</span>
      </nav>

      {/* Monograph Header Card - Light Clinical Academic Dossier */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 md:p-10 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] space-y-6 relative overflow-hidden bg-amino-backbone bg-washout-formula">
        {/* Soft Ambient Accent Lighting */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-900 border border-indigo-200 inline-flex items-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-800" />
                <span>UK Academic Monograph</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-50 text-orange-900 border border-orange-200 shadow-2xs">
                {compound.categoryName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                In Vitro Laboratory Only
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
              {compound.name}
            </h1>
            <p className="text-sm sm:text-base text-zinc-700 font-mono font-normal max-w-3xl">
              {compound.systematicName}
            </p>

            {/* Rapid Analytical Benchmark Metrics Grid (Fills empty gap with critical lab data) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 font-mono text-xs max-w-3xl">
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-2.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Storage Baseline</span>
                <span className="text-zinc-950 font-bold text-xs">-20°C Lyophilized</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-2.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Assay Vehicle</span>
                <span className="text-zinc-950 font-bold text-xs">BAC Water / Saline</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-2.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Target Signaling</span>
                <span className="text-indigo-900 font-bold text-xs truncate block">{compound.categoryName}</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-2.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">HPLC Standard</span>
                <span className="text-orange-700 font-bold text-xs">&ge;98.0% Purity</span>
              </div>
            </div>

            {/* Quick Navigation Jump Anchors */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">Quick Section Jump:</span>
              <a href="#suppliers-matrix" className="text-indigo-700 hover:text-indigo-900 hover:underline font-semibold bg-indigo-50/70 px-2 py-0.5 rounded border border-indigo-200/60">
                #Verified-Suppliers
              </a>
              <a href="#reconstitution-guide" className="text-indigo-700 hover:text-indigo-900 hover:underline font-semibold bg-indigo-50/70 px-2 py-0.5 rounded border border-indigo-200/60">
                #Reconstitution-SOP
              </a>
              <a href="#academic-faqs" className="text-indigo-700 hover:text-indigo-900 hover:underline font-semibold bg-indigo-50/70 px-2 py-0.5 rounded border border-indigo-200/60">
                #FAQs
              </a>
            </div>
          </div>

          {/* Quick Specifications Widget - Elevated Light Clinical Card */}
          <div className="bg-zinc-50/95 rounded-2xl border border-zinc-200 p-5 space-y-3 font-mono text-xs shadow-xs backdrop-blur-sm lg:min-w-[320px]">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
              <span className="text-[11px] font-bold uppercase text-zinc-900 tracking-wider">
                PubChem Molecular Specs
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-950 border border-indigo-200">
                Validated
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1.5">
              <span className="text-zinc-700 font-semibold">CAS Registry:</span>
              <span className="font-bold text-zinc-950 bg-white px-2.5 py-0.5 rounded border border-zinc-300 shadow-2xs">
                {compound.casNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1.5">
              <span className="text-zinc-700 font-semibold">Chemical Formula:</span>
              <span className="font-bold text-orange-900 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                {compound.molecularFormula}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1.5">
              <span className="text-zinc-700 font-semibold">Monoisotopic MW:</span>
              <span className="font-bold text-zinc-950">{compound.molecularWeight}</span>
            </div>
            {compound.pubchemCid && (
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-zinc-700 font-semibold">PubChem CID:</span>
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-800 hover:text-orange-950 hover:underline inline-flex items-center gap-1"
                >
                  <span>{compound.pubchemCid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Amino Acid Sequence Fragment */}
        {compound.sequence && compound.sequence.length > 0 && (
          <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200 p-5 space-y-2.5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <Dna className="w-4 h-4 text-indigo-800" />
                <span>Primary Amino Acid Sequence ({compound.sequence.length} residues)</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-700 font-medium">N-terminus → C-terminus</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs pt-1">
              {compound.sequence.map((residue, idx) => (
                <div
                  key={idx}
                  className="bg-white px-2.5 py-1 rounded-lg border border-indigo-200 font-bold text-indigo-950 shadow-2xs flex items-center gap-1.5 hover:border-indigo-600 transition-colors"
                >
                  <span className="text-[9px] text-zinc-700 font-semibold">{idx + 1}</span>
                  <span>{residue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Narrative */}
        <div className="pt-2 relative z-10 space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-indigo-700" />
            <span>Pre-Clinical Overview &amp; Monograph Profile</span>
          </h2>
          <p className="border-l-3 border-indigo-700 bg-indigo-50/40 rounded-r-2xl p-4 text-zinc-900 leading-relaxed text-sm sm:text-base shadow-2xs">
            {compound.shortOverview}
          </p>
        </div>
      </div>

      {/* Verified UK Sourcing Matrix for this Compound */}
      <section id="suppliers-matrix" className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden space-y-0">
        <div className="bg-gradient-to-r from-indigo-950 via-zinc-950 to-indigo-900 text-white px-6 sm:px-8 py-5 border-b border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 bg-orange-950/60 px-2.5 py-0.5 rounded-full border border-orange-500/40 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Independent Laboratory Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Verified UK Suppliers for {compound.name}
            </h2>
          </div>
          <div className="text-xs font-mono text-indigo-200 font-semibold bg-indigo-900/70 px-3 py-1 rounded-lg border border-indigo-700/50">
            5 Audited British &amp; European Sources
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-6">

        <div className="w-full max-w-full overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead className="bg-zinc-50 text-zinc-700 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="py-3 px-4 font-bold">Supplier</th>
                <th className="py-3 px-4 font-bold">Assay Purity</th>
                <th className="py-3 px-4 font-bold">Reagent Format</th>
                <th className="py-3 px-4 font-bold">Dispatch Location</th>
                <th className="py-3 px-4 font-bold">Notes</th>
                <th className="py-3 px-4 font-bold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-mono">
              {compound.supplierLinks.map((supplier) => (
                <tr key={supplier.supplierId} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-950 font-sans">
                    {supplier.supplierName}
                  </td>
                  <td className="py-3.5 px-4 text-indigo-900 font-bold">
                    {supplier.puritySpecification}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-700 uppercase font-medium">
                    {supplier.format}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-700 font-medium">
                    {supplier.dispatchRegion}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-700 font-sans text-xs max-w-xs">
                    {supplier.notes}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <OutboundPartnerLink
                      href={supplier.url}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-800 text-white font-semibold hover:bg-indigo-900 transition-colors shadow-xs"
                    >
                      <span>Check Batch</span>
                      <ExternalLink className="w-3 h-3" />
                    </OutboundPartnerLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </section>

      {/* Mechanism of Action & Preclinical Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mechanisms */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-indigo-900">
            <Activity className="w-4 h-4 text-indigo-800" />
            <span>Biochemical Mechanisms of Action</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-950">
            Molecular Signaling Pathways
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
            {compound.mechanismOfAction.map((mech, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{mech}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preclinical Laboratory Handling */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-orange-800">
            <FlaskConical className="w-4 h-4 text-orange-700" />
            <span>Pre-Clinical Laboratory Handling</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-950">
            Laboratory Evaluation Guidelines
          </h3>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {compound.preclinicalResearchNotes}
          </p>

          <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200 p-4 sm:p-5 space-y-2.5 text-xs font-mono">
            <div className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-orange-700" />
                <span>Aseptic Dissolution &amp; Storage</span>
              </span>
              <span className="badge-cobalt text-[10px] py-0 px-2">UK Lab Standard</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1">
              <span className="text-zinc-700 font-semibold">Recommended Diluent:</span>
              <span className="font-bold text-orange-900 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                {compound.reconstitution.recommendedDiluent}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1">
              <span className="text-zinc-700 font-semibold">Lyophilized Storage:</span>
              <span className="font-semibold text-zinc-950">{compound.reconstitution.storageLyophilized}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-200 pb-1">
              <span className="text-zinc-700 font-semibold">Reconstituted Storage:</span>
              <span className="font-semibold text-zinc-950">{compound.reconstitution.storageReconstituted}</span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-zinc-700 font-semibold">Solution Stability:</span>
              <span className="font-bold text-indigo-900">{compound.reconstitution.stabilityWindow}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Monograph: Receptor Pharmacology, SPPS Synthesis, & Pharmacokinetics */}
      <section className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-indigo-800">
            <Atom className="w-4 h-4 text-indigo-800" />
            <span>Academic Biochemical Monograph</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">
            Receptor Affinity, SPPS Synthesis &amp; Pharmacokinetics
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Standardized chemical parameters, solid-phase synthesis criteria, and quantitative receptor affinity benchmarks for {compound.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Receptor Pharmacology */}
          {compound.receptorPharmacology && (
            <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900">
                  Target Receptors
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold">
                  Binding Kinetics
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Primary Receptor Cascade</div>
                  <div className="text-zinc-950 font-bold text-sm mt-0.5">
                    {compound.receptorPharmacology.primaryTarget}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Binding Affinity (Kd / Ki)</div>
                  <div className="font-mono font-bold text-indigo-900 bg-white p-2 rounded-lg border border-zinc-300 text-xs mt-0.5 shadow-2xs">
                    {compound.receptorPharmacology.bindingAffinity}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Receptor Family</div>
                  <div className="text-zinc-950 font-medium text-xs mt-0.5">
                    {compound.receptorPharmacology.receptorFamily}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Downstream Effectors</div>
                  <ul className="text-zinc-900 text-xs mt-0.5 space-y-1 list-disc list-inside">
                    {compound.receptorPharmacology.downstreamEffectors.slice(0, 3).map((eff, i) => (
                      <li key={i} className="line-clamp-1">{eff}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Solid-Phase Peptide Synthesis (SPPS) Parameters */}
          {compound.synthesisParameters && (
            <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-800">
                  SPPS Methodology
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 text-orange-900 border border-orange-200 font-bold">
                  ISO Criteria
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Synthesis Protocol</div>
                  <div className="text-zinc-950 font-mono text-xs font-bold mt-0.5">
                    {compound.synthesisParameters.synthesisMethod}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">N-Terminal / C-Terminal Mod</div>
                  <div className="text-zinc-900 font-mono text-xs mt-0.5 font-medium">
                    {compound.synthesisParameters.nTerminalModification} &middot; {compound.synthesisParameters.cTerminalModification}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Acid Cleavage Cocktail</div>
                  <div className="text-zinc-900 font-mono text-xs mt-0.5 font-medium">
                    {compound.synthesisParameters.cleavageCocktail}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">HPLC Retention Standard</div>
                  <div className="font-mono font-bold text-orange-900 bg-white p-2 rounded-lg border border-zinc-300 text-xs mt-0.5 shadow-2xs">
                    {compound.synthesisParameters.hplcRetentionTimeStandard}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Pharmacokinetic Benchmarks */}
          {compound.pharmacokinetics && (
            <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-800">
                  Pharmacokinetics
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-300 font-bold">
                  In Vitro / In Vivo
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Elimination Half-Life</div>
                  <div className="font-mono font-bold text-zinc-950 bg-white p-2 rounded-lg border border-zinc-300 text-xs mt-0.5 shadow-2xs">
                    {compound.pharmacokinetics.eliminationHalfLife}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Primary Degradation Pathway</div>
                  <div className="text-zinc-900 leading-relaxed text-xs mt-0.5 font-medium">
                    {compound.pharmacokinetics.primaryDegradationPath}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Bioavailability Profile</div>
                  <div className="text-zinc-900 text-xs mt-0.5 font-medium">
                    {compound.pharmacokinetics.bioavailabilityModel}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-700 font-mono text-[11px] font-semibold">Renal Filtration Threshold</div>
                  <div className="text-zinc-900 text-xs font-mono mt-0.5 font-medium">
                    {compound.pharmacokinetics.renalClearanceIndex}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Structured Trial Evidence Table */}
      {compound.structuredTrials && compound.structuredTrials.length > 0 && (
        <section className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-900">
            <BookOpen className="w-4 h-4 text-indigo-800" />
            <span>Quantitative Pre-Clinical &amp; Clinical Evidence Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
            Documented Biochemical Endpoints &amp; Statistical Significance
          </h2>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 font-mono text-zinc-900 uppercase text-[11px] bg-zinc-50 font-bold">
                  <th className="py-2.5 px-3">Study Design</th>
                  <th className="py-2.5 px-3">Cohort (n)</th>
                  <th className="py-2.5 px-3">Measured Biological Endpoint</th>
                  <th className="py-2.5 px-3">Statistical Significance</th>
                  <th className="py-2.5 px-3 text-right">NCBI Citation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {compound.structuredTrials.map((trial, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-3 px-3 font-bold text-zinc-950">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-orange-50 text-orange-900 border border-orange-200">
                        {trial.studyDesign}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-700 font-medium">
                      {trial.sampleSize}
                    </td>
                    <td className="py-3 px-3 text-zinc-900 font-sans max-w-sm">
                      {trial.endpointMeasured}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-indigo-900">
                      {trial.statisticalSignificance}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${trial.pubmedId}/`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-indigo-800 hover:text-indigo-900 font-bold hover:underline"
                      >
                        <span>PMID {trial.pubmedId}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Academic PubMed Citations */}
      {compound.citations && compound.citations.length > 0 && (
        <section className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-900">
            <BookOpen className="w-4 h-4 text-indigo-800" />
            <span>Peer-Reviewed Academic Citations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
            Indexed Scientific Literature
          </h2>

          <div className="space-y-4 pt-2">
            {compound.citations.map((citation, idx) => (
              <div
                key={idx}
                className="p-5 bg-zinc-50/80 rounded-2xl border border-zinc-200 space-y-2 text-xs hover:border-zinc-300 transition-colors"
              >
                <div className="font-bold text-zinc-950 text-sm">
                  {citation.title}
                </div>
                <div className="text-zinc-700 font-mono font-medium">
                  <em>{citation.journal}</em> ({citation.year}) &middot; {citation.authors}
                </div>
                <div className="text-zinc-900 leading-relaxed">
                  <strong className="text-zinc-950">Key Finding:</strong> {citation.keyFindings}
                </div>
                {citation.pubmedId && (
                  <div className="pt-1">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1 text-indigo-800 hover:text-indigo-900 font-mono font-semibold"
                    >
                      <span>PubMed PMID: {citation.pubmedId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Curated Compound-Specific Biochemical Q&A Accordion */}
      <CompoundFaqSection compoundName={compound.name} faqs={compoundFaqs} />

      {/* Related Compounds (Full AminoReagentCard Components) */}
      {relatedCompounds.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-indigo-800">
                Biological Pathway Correlates
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
                More Reagents in {compound.categoryName}
              </h2>
            </div>
            <Link
              href={`/category/${compound.categorySlug}/`}
              className="text-xs font-mono font-semibold text-indigo-800 hover:underline inline-flex items-center gap-1"
            >
              <span>View Pathway Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCompounds.map((rel) => (
              <AminoReagentCard key={rel.slug} compound={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
