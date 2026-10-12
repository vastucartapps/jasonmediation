import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Regulatory Hub & MHRA Peptide Compliance',
  description:
    'Comprehensive statutory guidance on UK peptide regulations: Human Medicines Regulations 2012, MHRA unlicensed chemical classification, and in vitro laboratory compliance.',
  alternates: {
    canonical: `${SITE_METADATA.url}/regulatory/`,
  },
  openGraph: {
    title: 'UK Peptide Regulatory Hub',
    description: 'Statutory guidance on British peptide research chemical laws.',
    url: `${SITE_METADATA.url}/regulatory/`,
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function RegulatoryHubPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">UK Regulatory Hub</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Scale className="w-3.5 h-3.5" />
          <span>Statutory Authority &amp; Legal Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          UK Regulatory &amp; MHRA Compliance Center
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Detailed guidance on the statutory and legal boundaries governing the sale, importation, and handling
          of synthetic peptides in England, Scotland, Wales, and Northern Ireland under the{' '}
          <strong className="text-slate-900">Human Medicines Regulations 2012 (SI 2012/1916)</strong> and the{' '}
          <strong className="text-slate-900">Misuse of Drugs Act 1971</strong>.
        </p>
      </div>

      {/* Sub-Trackers Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/regulatory/mhra-tracker/"
          className="clinical-card p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-emerald-500/50 group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="badge-emerald font-mono text-xs">Live Statutory Bulletin</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            MHRA Enforcement Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Monitor formal enforcement bulletins, warning letters, border seizures, and regulatory notices issued
            by the Medicines and Healthcare products Regulatory Agency regarding peptide vendors.
          </p>
        </Link>

        <Link
          href="/regulatory/uk-legal-status/"
          className="clinical-card p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-blue-500/50 group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="badge-cobalt font-mono text-xs">Statutory Schedule Matrix</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            UK Legal Status &amp; Schedules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Compound-by-compound classification under the Misuse of Drugs Act 1971, Prescription Only Medicine
            (POM) rules, and laboratory chemical exemptions.
          </p>
        </Link>
      </div>

      {/* Core Statutory Pillars */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          The 3 Pillars of UK Peptide Research Law
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold">In Vitro Only Restriction</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlicensed synthetic peptides can only be supplied legally for non-clinical research. Commercial suppliers
              are prohibited from recommending human dosing or providing administration accessories.
            </p>
          </div>

          <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold">Medicinal Claims Prohibition</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Regulation 46 of SI 2012/1916, any claim that a peptide diagnoses, treats, cures, or prevents
              disease immediately classifies the product as an unlicensed medicinal product subject to criminal prosecution.
            </p>
          </div>

          <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold">COSHH &amp; Lab Safety</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Laboratories receiving research compounds must comply with Control of Substances Hazardous to Health
              (COSHH) regulations, ensuring proper aseptic laminar flow handling and cold-chain disposal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
