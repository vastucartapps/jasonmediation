import Link from 'next/link';
import { Bell, ArrowRight, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AlertItem {
  agency: string;
  badgeColor: string;
  date: string;
  title: string;
  summary: string;
  href: string;
  isExternal?: boolean;
}

const REGULATORY_ALERTS: AlertItem[] = [
  {
    agency: 'MHRA',
    badgeColor: 'bg-rose-950/70 text-rose-300 border-rose-500/40',
    date: '24 Sep 2026',
    title: 'Sentencing Handed Down Over Fraudulent Medical Certifications',
    summary: 'The MHRA welcomed court convictions for corporate entities falsely certifying analytical standards and laboratory equipment.',
    href: '/regulatory/mhra-tracker/',
  },
  {
    agency: 'MHRA',
    badgeColor: 'bg-sky-950/70 text-sky-300 border-sky-500/40',
    date: '03 Jul 2026',
    title: 'Conditional Marketing Clearance for Semaglutide in Hepatic MASH',
    summary: 'MHRA granted conditional marketing authorisation for semaglutide targeting metabolic dysfunction-associated steatohepatitis.',
    href: '/regulatory/mhra-tracker/',
  },
  {
    agency: 'MHRA / ASA / GPhC',
    badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    date: '18 Jun 2026',
    title: 'Joint Regulatory Warning on Public Advertising of Unlicensed Peptides',
    summary: 'Joint statutory notice clarifying that prescription-only medicines and unlicensed research compounds cannot be promoted or advertised to the general public under CAP Code 12.12.',
    href: '/regulatory/',
  },
  {
    agency: 'MHRA',
    badgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
    date: '11 Jun 2026',
    title: 'Regulatory Assessment on Oral Peptide Formulations Published',
    summary: 'Technical evaluation on absorption enhancers and oral bioavailability for synthetic peptide polymers released for laboratory investigators.',
    href: '/regulatory/mhra-tracker/',
  },
];

export function WhatChanged() {
  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-14 sm:py-18">
      <div className="container-wide space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a2347] border border-sky-400/35 text-xs font-mono font-bold text-sky-300">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>REGULATORY DISPATCH FEED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Changed in UK Peptide Governance
            </h2>
          </div>

          <Link
            href="/regulatory/mhra-tracker/"
            className="text-xs sm:text-sm font-mono font-bold text-sky-300 hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <span>Full 90-Day Tracker (23 Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {REGULATORY_ALERTS.map((alert, idx) => (
            <Link
              key={idx}
              href={alert.href}
              className="rounded-3xl p-6 bg-gradient-to-br from-[#071d42] via-[#051736] to-[#03112a] border border-[rgba(141,168,195,0.22)] hover:border-sky-400/60 transition-all flex flex-col justify-between space-y-4 shadow-xl hover:-translate-y-0.5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${alert.badgeColor}`}>
                    {alert.agency}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {alert.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                  {alert.title}
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {alert.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(141,168,195,0.18)] flex items-center justify-between text-xs font-mono text-sky-300 font-bold group-hover:text-white transition-colors">
                <span>Inspect Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
