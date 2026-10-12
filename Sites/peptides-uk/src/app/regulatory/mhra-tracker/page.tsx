import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { ShieldAlert, AlertTriangle, ChevronRight, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK MHRA Enforcement Tracker & Peptide Alerts',
  description:
    'Real-time tracking of UK Medicines and Healthcare products Regulatory Agency (MHRA) enforcement bulletins, illegal medicinal advertising clampdowns, and border compliance.',
  alternates: {
    canonical: `${SITE_METADATA.url}/regulatory/mhra-tracker/`,
  },
};

export default function MhraTrackerPage() {
  const bulletins = [
    {
      date: 'January 2026',
      title: 'MHRA Border Force Enforcement on Mislabelled Weight-Loss Peptides',
      summary:
        'The MHRA and UK Border Force seized multiple commercial shipments containing unlicensed GLP-1/GIP receptor co-agonists imported with medicinal administration labelling.',
      action: 'Enhanced scrutiny applied to non-declaration of research-chemical intended use.',
      status: 'Active Enforcement',
    },
    {
      date: 'November 2025',
      title: 'Regulatory Action Against Retailers Promoting Peptides with Therapeutic Claims',
      summary:
        'Formal warning letters issued to UK web domains promoting BPC-157 and TB-500 with human tendon repair claims in breach of Human Medicines Regulations 2012.',
      action: 'Requirement for all non-licensed vendors to remove therapeutic representations.',
      status: 'Statutory Notice',
    },
    {
      date: 'August 2025',
      title: 'Laboratory Chemical Exemption Affirmation',
      summary:
        'Official clarification that synthetic peptide sequences supplied purely as high-purity analytical reference reagents with published COAs remain lawful for scientific in vitro study.',
      action: 'Validates strict research laboratory distribution models.',
      status: 'Policy Affirmation',
    },
  ];

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/regulatory/" className="hover:text-emerald-700">UK Regulatory Hub</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">MHRA Tracker</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Statutory MHRA Enforcement Bulletin Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          MHRA Peptide Enforcement Tracker
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Tracking regulatory interventions, advertising standards sanctions, and border interdictions conducted
          by the Medicines and Healthcare products Regulatory Agency across the United Kingdom.
        </p>
      </div>

      <div className="space-y-6">
        {bulletins.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="font-mono text-xs text-slate-500 font-bold">{item.date}</span>
              <span className="badge-emerald font-mono text-xs">{item.status}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-700">
              <strong className="text-slate-900">Regulatory Impact:</strong> {item.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
