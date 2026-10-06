import Link from 'next/link';
import type { Metadata } from 'next';
import { FormatsLabExplorer } from '../../components/FormatsLabExplorer';
import {
  Layers,
  ChevronRight,
  ShieldAlert,
  Beaker,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Delivery Formats & Physical Preparation Standards | Trustly Pharma',
  description:
    'Comprehensive laboratory guide to synthetic peptide physical delivery states: Lyophilized powder vials, pre-mixed pens, metered nasal atomizers, and synergistic research stacks.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/formats/',
  },
};

export default function FormatsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.co.uk/#website',
        url: 'https://trustlypharma.co.uk',
        name: 'Trustly Pharma',
      },
      {
        '@type': 'TechArticle',
        '@id': 'https://trustlypharma.co.uk/formats/#article',
        headline: 'Peptide Delivery Formats & Laboratory Preparation Standards',
        description: 'Comprehensive technical reference for peptide formulation states, volumetric precision, and reconstitution SOPs.',
        isPartOf: { '@id': 'https://trustlypharma.co.uk/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.co.uk/formats/#breadcrumb',
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
            name: 'Delivery Formats',
            item: 'https://trustlypharma.co.uk/formats/',
          },
        ],
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
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Delivery Formats Standards</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Analytical Physical State Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Peptide Delivery Formats & Preparation Standards
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-sans">
            Standardised handling parameters, reconstitution solvent compatibility, and cold-chain thermal guidelines across the four primary peptide preparation states investigated in preclinical research laboratories.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/#calculator"
              className="px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-[#103059] text-sky-300 hover:bg-[#123a6b] border border-sky-400/30 transition-colors inline-flex items-center gap-2"
            >
              <span>Interactive Dilution Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/regulatory/"
              className="px-5 py-2.5 rounded-full font-mono text-xs font-semibold text-slate-200 bg-[#061a38] hover:bg-[#0a2347] border border-[rgba(141,168,195,0.25)] transition-colors inline-flex items-center gap-2"
            >
              <span>Regulatory Intelligence Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Formats Explorer Container */}
      <div className="container-wide mt-12 space-y-12">
        <FormatsLabExplorer />

        {/* Strict Laboratory Research Disclaimer */}
        <div className="rounded-2xl p-5 bg-[#0a1b38] border border-amber-500/30 text-xs text-slate-200 leading-relaxed flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase font-bold text-amber-300 block mb-1">
              Laboratory Research Protocol Notice
            </span>
            <p>
              Reconstitution guidelines and delivery format comparisons published on this portal describe standard scientific handling for in vitro, cellular, and non-clinical preclinical models. None of the listed delivery matrices are approved for human diagnostic, therapeutic, or clinical delivery under UK medicines regulations. Always handle in compliance with COSHH safety regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
