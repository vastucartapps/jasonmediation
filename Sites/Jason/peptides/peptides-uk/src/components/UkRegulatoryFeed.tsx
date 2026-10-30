import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

interface RegulatoryAlert {
  agency: string;
  badgeColor: string;
  date: string;
  title: string;
  summary: string;
  href: string;
}

const REGULATORY_ALERTS: RegulatoryAlert[] = [
  {
    agency: 'MHRA ENFORCEMENT',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    date: '24 Sep 2026',
    title: 'Sentences Handed Down Over Falsified Analytical Reagent Certifications',
    summary: 'The MHRA welcomed Crown Court convictions for commercial entities falsely certifying analytical standards, CoAs, and laboratory purity reports without ISO/IEC 17025 accredited chromatography.',
    href: '/regulatory/mhra-tracker/',
  },
  {
    agency: 'MHRA STATUTORY',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    date: '03 Jul 2026',
    title: 'Conditional Marketing Clearance for Semaglutide in Hepatic MASH Models',
    summary: 'MHRA granted conditional marketing authorisation for clinical semaglutide targeting metabolic dysfunction-associated steatohepatitis; reiterates unlicensed research salts cannot be marketed for human ingestion.',
    href: '/regulatory/mhra-tracker/',
  },
  {
    agency: 'ASA / CAP CODE',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    date: '18 Jun 2026',
    title: 'Joint Regulatory Warning on Public Advertising of Unlicensed Peptides',
    summary: 'Joint statutory notice clarifying that prescription-only medicines and unlicensed research chemicals cannot be promoted or advertised to consumer publics under UK CAP Code 12.11.',
    href: '/regulatory/',
  },
  {
    agency: 'MHRA / HOME OFFICE',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    date: '11 Jun 2026',
    title: 'Regulatory Assessment on In Vitro Delivery Matrices & Solvents Published',
    summary: 'Technical evaluation on absorption kinetics, bacteriostatic diluents, and cold-chain stability parameters for laboratory investigators released under UK REACH compliance.',
    href: '/regulatory/mhra-tracker/',
  },
];

export function UkRegulatoryFeed() {
  return (
    <section className="container-wide space-y-8 scroll-mt-20" id="regulatory-feed">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold">
            <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>2026 UK STATUTORY DISPATCH FEED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Changed in UK Peptide Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Live legislative, enforcement, and pharmacovigilance tracking across the MHRA, Advertising Standards Authority, and UK Home Office.
          </p>
        </div>

        <Link
          href="/regulatory/mhra-tracker/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>Full 90-Day Tracker (23 Items)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {REGULATORY_ALERTS.map((alert, idx) => (
          <Link
            key={idx}
            href={alert.href}
            className="clinical-card p-5 sm:p-6 bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${alert.badgeColor}`}>
                  {alert.agency}
                </span>
                <span className="text-xs font-mono text-slate-700 font-semibold">
                  {alert.date}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                {alert.title}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed">
                {alert.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Inspect Regulatory Dossier</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
