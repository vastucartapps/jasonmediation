import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  ShieldCheck,
  FlaskConical,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Database,
  Scale,
  Building2,
  ExternalLink,
  ArrowRight,
  FileCheck2,
  Atom,
  Award,
  Users,
} from 'lucide-react';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'About Peptides UK: Editorial Charter & Methodology',
  description:
    'Independent British biochemical registry: editorial charter, 5-stage analytical verification, PubChem integration, and laboratory supplier audit standards.',
  path: '/about/',
});

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.url}/#website`,
        url: SITE_METADATA.url,
        name: SITE_METADATA.name,
      },
      {
        '@type': 'AboutPage',
        '@id': `${SITE_METADATA.url}/about/#webpage`,
        url: `${SITE_METADATA.url}/about/`,
        name: 'About Peptides UK & Analytical Methodology',
        description:
          'Independent chemical encyclopedia and academic research directory for synthetic peptides in the United Kingdom.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/about/#breadcrumb`,
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
            name: 'About & Methodology',
            item: `${SITE_METADATA.url}/about/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">About &amp; Methodology</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Database className="w-3.5 h-3.5" />
          <span>Academic Editorial Charter &amp; Registry Mandate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          British Clinical Chemical Registry: Mission &amp; Methodology
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          <strong className="text-slate-900">Peptides-UK.org</strong> was established as an open-access biochemical
          encyclopedia and independent quality registry to bridge the information chasm between peer-reviewed pre-clinical
          peptide literature, statutory UK regulations, and the commercial reagent supply chain.
        </p>
      </div>

      {/* Editorial Mission & Foundational Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="card-inner-elevated p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <Atom className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Bona Fide Chemical Integrity</h2>
          <p className="text-slate-600 leading-relaxed">
            Eliminating commercial marketing hype and dubious online claims. We index verified PubChem molecular formulas,
            IUPAC names, CAS registry numbers, and monoisotopic weights derived from validated crystallography and spectrometry data.
          </p>
        </div>

        <div className="card-inner-elevated p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Peer-Reviewed Literature Curation</h2>
          <p className="text-slate-600 leading-relaxed">
            Every molecular monograph indexes primary PubMed citations, linking directly to PMIDs, journal volumes,
            and experimental findings to anchor biochemical assertions in empirical scientific discovery.
          </p>
        </div>

        <div className="card-inner-elevated p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Statutory Regulatory Clarity</h2>
          <p className="text-slate-600 leading-relaxed">
            Clarifying the strict legal boundaries established by the MHRA and Human Medicines Regulations 2012,
            ensuring researchers and distributors understand the demarcation between unlicensed research chemicals and human medicines.
          </p>
        </div>
      </div>

      {/* 5-Stage Verification Methodology */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-emerald-700">Verification Framework</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our 5-Stage Analytical Verification Methodology
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Prior to admitting any commercial vendor or compound into our verified index, our editorial board
            applies a structured five-stage evaluation protocol:
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-mono font-bold text-base flex items-center justify-center flex-shrink-0">
              01
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="text-base font-bold text-slate-900">Chromatographic Purity Benchmarking (RP-HPLC)</h3>
              <p className="text-slate-600 leading-relaxed">
                Vendors must demonstrate consistent batch purity exceeding ≥98.0% via Reverse-Phase High-Performance
                Liquid Chromatography with published peak area integration reports. We reject suppliers providing simulated,
                truncated, or generic unlabelled chromatograms.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-mono font-bold text-base flex items-center justify-center flex-shrink-0">
              02
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="text-base font-bold text-slate-900">Electrospray Mass Spectrometry Confirmation (ESI-MS)</h3>
              <p className="text-slate-600 leading-relaxed">
                Mass spectrometry deconvolution must match theoretical monoisotopic mass within ±0.5 Da variance,
                confirming intact sequence identity and ruling out accidental amino acid substitutions or peptide bond deletions.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white font-mono font-bold text-base flex items-center justify-center flex-shrink-0">
              03
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="text-base font-bold text-slate-900">Independent European Laboratory Accreditation</h3>
              <p className="text-slate-600 leading-relaxed">
                COAs generated solely in Chinese or non-certified manufacturer facilities are deemed insufficient.
                Vendors must submit periodic blind samples to ISO/IEC 17025 accredited European or UK contract testing laboratories.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-mono font-bold text-base flex items-center justify-center flex-shrink-0">
              04
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="text-base font-bold text-slate-900">Container Closure &amp; Cold-Chain Integrity</h3>
              <p className="text-slate-600 leading-relaxed">
                Reagents must be sealed in Type I neutral borosilicate glass under argon/nitrogen atmosphere with bromobutyl
                stoppers. UK dispatch must utilize Royal Mail Tracked 24 or temperature-controlled couriers to minimize thermal transit decay.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white font-mono font-bold text-base flex items-center justify-center flex-shrink-0">
              05
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="text-base font-bold text-slate-900">Statutory Advertising &amp; Legal Compliance</h3>
              <p className="text-slate-600 leading-relaxed">
                Vendors that advertise human dosing instructions, clinical administration recommendations, or therapeutic
                health claims in breach of CAP Code Rule 12.11 or the Human Medicines Regulations 2012 are permanently disqualified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Independence Charter */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 space-y-6 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Editorial Independence &amp; Commercial Disclosure</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Strict Editorial Independence Statement
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          Peptides-UK does not manufacture, bottle, compound, or sell any peptide products. We operate as an independent
          chemical registry. While we maintain commercial affiliate relationships with verified laboratory suppliers to support
          registry operations, inclusion in our index is strictly merit-based and contingent upon meeting our empirical testing baselines.
          No supplier can purchase an upgrade to their analytical baseline or alter published chemical specifications.
        </p>
      </section>
    </div>
  );
}
