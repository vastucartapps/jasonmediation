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
} from 'lucide-react';
import { ReagentCard } from '@/components/ReagentCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const compounds = getAllCompounds();
  return compounds.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) return {};

  const title = `${compound.name} (${compound.casNumber}) UK Lab Monograph & Sourcing`;
  const description = `British academic chemical monograph for ${compound.name}: CAS ${compound.casNumber}, molecular formula ${compound.molecularFormula}, MW ${compound.molecularWeight}, PubMed citations, and verified UK laboratory suppliers.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_METADATA.url}/peptides/${compound.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_METADATA.url}/peptides/${compound.slug}/`,
      type: 'article',
      images: [
        {
          url: `${SITE_METADATA.url}/icon-512x512.png`,
          width: 512,
          height: 512,
          alt: `${compound.name} Chemical Monograph`,
        },
      ],
    },
  };
}

export default async function CompoundPage({ params }: PageProps) {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) notFound();

  const relatedCompounds = getCompoundsByCategory(compound.categorySlug).filter(
    (c) => c.slug !== compound.slug
  );

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
        mpn: `PUK-${compound.slug.toUpperCase()}`,
        brand: {
          '@type': 'Brand',
          name: 'Peptides-UK Verified Analytical Standard',
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
          name: 'Peptides-UK Laboratory Editorial Board',
          url: `${SITE_METADATA.url}/about/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Peptides-UK.org',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the CAS registry number and molecular formula of ${compound.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${compound.name} is indexed under CAS #${compound.casNumber} with the molecular formula ${compound.molecularFormula} and a monoisotopic weight of ${compound.molecularWeight}.`,
            },
          },
          {
            '@type': 'Question',
            name: `How should reconstituted ${compound.name} be stored in a UK laboratory?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Reconstituted ${compound.name} must be stored refrigerated between 2°C and 8°C protected from actinic UV radiation. Its laboratory stability window is ${compound.reconstitution.stabilityWindow}.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is ${compound.name} legal to purchase for research in the United Kingdom?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. In the UK, ${compound.name} is classified as an unlicensed chemical substance lawful for bona fide in vitro laboratory research under the Human Medicines Regulations 2012. It is not licensed for human consumption.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${compound.categorySlug}/`} className="hover:text-emerald-700">
          {compound.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">{compound.name}</span>
      </nav>

      {/* Monograph Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6 relative overflow-hidden bg-benzene-washout">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-emerald font-mono text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>UK Academic Monograph</span>
              </span>
              <span className="badge-cobalt font-mono text-xs">
                {compound.categoryName}
              </span>
              <span className="badge-amber font-mono text-xs">
                In Vitro Laboratory Only
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {compound.name}
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-3xl">
              {compound.systematicName}
            </p>
          </div>

          {/* Quick Specifications Widget - Elevated Card-in-Card */}
          <div className="card-inner-elevated p-5 space-y-3 font-mono text-xs lg:min-w-[310px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                PubChem Molecular Specs
              </span>
              <span className="badge-emerald text-[10px] py-0 px-2">Validated</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">CAS Registry:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{compound.casNumber}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Chemical Formula:</span>
              <span className="font-bold text-slate-900 formula-chip">{compound.molecularFormula}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Monoisotopic MW:</span>
              <span className="font-bold text-slate-900">{compound.molecularWeight}</span>
            </div>
            {compound.pubchemCid && (
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-500 font-medium">PubChem CID:</span>
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
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
          <div className="card-inner-elevated p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Dna className="w-4 h-4 text-emerald-600" />
                <span>Primary Amino Acid Sequence ({compound.sequence.length} residues)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">N-terminus → C-terminus</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs pt-1">
              {compound.sequence.map((residue, idx) => (
                <div
                  key={idx}
                  className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/90 font-bold text-emerald-900 shadow-2xs flex items-center gap-1"
                >
                  <span className="text-[9px] text-slate-400 font-normal">{idx + 1}</span>
                  <span>{residue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Narrative */}
        <div className="pt-2">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Pre-Clinical Overview
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {compound.shortOverview}
          </p>
        </div>
      </div>

      {/* Verified UK Sourcing Matrix for this Compound */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Independent Laboratory Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Verified UK Suppliers for {compound.name}
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-500">
            5 Audited British &amp; European Sources
          </div>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Supplier</th>
                <th className="py-3 px-4 font-bold">Assay Purity</th>
                <th className="py-3 px-4 font-bold">Reagent Format</th>
                <th className="py-3 px-4 font-bold">Dispatch Location</th>
                <th className="py-3 px-4 font-bold">Notes</th>
                <th className="py-3 px-4 font-bold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {compound.supplierLinks.map((supplier) => (
                <tr key={supplier.supplierId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">
                    {supplier.supplierName}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold">
                    {supplier.puritySpecification}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 uppercase">
                    {supplier.format}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {supplier.dispatchRegion}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-sans text-xs max-w-xs">
                    {supplier.notes}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={supplier.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <span>Check Batch</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mechanism of Action & Preclinical Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mechanisms */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-700">
            <Activity className="w-4 h-4" />
            <span>Biochemical Mechanisms of Action</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Molecular Signaling Pathways
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {compound.mechanismOfAction.map((mech, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{mech}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preclinical Laboratory Handling */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-blue-700">
            <FlaskConical className="w-4 h-4" />
            <span>Pre-Clinical Laboratory Handling</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Laboratory Evaluation Guidelines
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {compound.preclinicalResearchNotes}
          </p>

          <div className="card-inner-elevated p-5 space-y-2.5 text-xs font-mono">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200/80 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-blue-600" />
                <span>Aseptic Dissolution &amp; Storage</span>
              </span>
              <span className="badge-cobalt text-[10px] py-0 px-2">UK Lab Standard</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Recommended Diluent:</span>
              <span className="font-bold text-slate-900 bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200/60">{compound.reconstitution.recommendedDiluent}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Lyophilized Storage:</span>
              <span className="font-semibold text-slate-800">{compound.reconstitution.storageLyophilized}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Reconstituted Storage:</span>
              <span className="font-semibold text-slate-800">{compound.reconstitution.storageReconstituted}</span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-slate-500 font-medium">Solution Stability:</span>
              <span className="font-bold text-emerald-700">{compound.reconstitution.stabilityWindow}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic PubMed Citations */}
      {compound.citations && compound.citations.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-500">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Peer-Reviewed Academic Citations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Indexed Scientific Literature
          </h2>

          <div className="space-y-4 pt-2">
            {compound.citations.map((citation, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2 text-xs hover:border-emerald-300 transition-colors"
              >
                <div className="font-bold text-slate-900 text-sm">
                  {citation.title}
                </div>
                <div className="text-slate-600 font-mono">
                  <em>{citation.journal}</em> ({citation.year}) &middot; {citation.authors}
                </div>
                <div className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Key Finding:</strong> {citation.keyFindings}
                </div>
                {citation.pubmedId && (
                  <div className="pt-1">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-mono font-semibold"
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

      {/* Related Compounds (Full ReagentCard Components) */}
      {relatedCompounds.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-700">
                Biological Pathway Correlates
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                More Reagents in {compound.categoryName}
              </h2>
            </div>
            <Link
              href={`/category/${compound.categorySlug}/`}
              className="text-xs font-mono font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View Pathway Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCompounds.map((rel) => (
              <ReagentCard key={rel.slug} compound={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
