import Link from 'next/link';
import type { Metadata } from 'next';
import { MHRA_TRACKER_EVENTS } from '../../../data/regulatory';
import {
  ShieldAlert,
  ChevronRight,
  Filter,
  Calendar,
  FileCheck2,
  AlertTriangle,
  Scale,
  ExternalLink,
  Tag,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MHRA Regulatory Action & Enforcement Tracker | UK Peptide Compliance',
  description:
    'Rolling 90-day archive of MHRA drug safety updates, ASA advertising sanctions, UK Border Force seizures, and laboratory compliance directives regarding research peptides.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/regulatory/mhra-tracker/',
  },
};

export default function MhraTrackerPage() {
  const events = MHRA_TRACKER_EVENTS;

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
        '@type': 'MedicalWebPage',
        '@id': 'https://trustlypharma.co.uk/regulatory/mhra-tracker/#webpage',
        url: 'https://trustlypharma.co.uk/regulatory/mhra-tracker/',
        name: 'MHRA Peptide Enforcement & Regulatory Action Tracker',
        description: 'Chronological timeline of UK and international regulatory enforcement actions regarding synthetic peptide compounds.',
        isPartOf: { '@id': 'https://trustlypharma.co.uk/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.co.uk/regulatory/mhra-tracker/#breadcrumb',
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
            name: 'Regulatory Intelligence',
            item: 'https://trustlypharma.co.uk/regulatory/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'MHRA Enforcement Tracker',
            item: 'https://trustlypharma.co.uk/regulatory/mhra-tracker/',
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
            <Link href="/regulatory/" className="hover:text-sky-400 transition-colors">
              Regulatory Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">MHRA Enforcement Tracker</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-amber-400 border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Live Enforcement Monitoring</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            MHRA & UK Peptide Enforcement Tracker
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Rolling chronological archive indexing public enforcement notices, counterfeit intercept advisories, ASA marketing sanctions, and statutory policy directives concerning synthetic peptide compounds in the United Kingdom.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#0a2149] text-slate-200 border border-[rgba(141,168,195,0.2)]">
              {events.length} Archived Actions
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-bold">
              ● Updated for Current Quarter
            </span>
          </div>
        </div>
      </section>

      {/* Timeline Layout */}
      <div className="container-wide mt-12 space-y-8">
        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] bg-gradient-to-br from-[#02102b] to-[#041638] shadow-xl hover:border-sky-400/40 transition-colors space-y-5"
            >
              {/* Event Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#103059] text-sky-400 border border-sky-400/30">
                    {event.regulator}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0a2347] text-amber-300 border border-amber-400/30">
                    {event.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-300 bg-[#020e24] px-3 py-1 rounded-lg border border-[rgba(141,168,195,0.2)] self-start sm:self-auto font-bold">
                  Ref: {event.referenceNumber}
                </span>
              </div>

              {/* Event Body */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {event.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {event.summary}
                </p>
              </div>

              {/* Event Details: Compounds & Statutory Reference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[rgba(141,168,195,0.18)] text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block flex items-center gap-1">
                    <Tag className="w-3 h-3 text-sky-400" /> Compounds Cited:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {event.compoundsAffected.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-[#020e24] border border-[rgba(141,168,195,0.2)] text-sky-300 font-mono text-[11px] font-bold"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-400" /> Statutory Provision:
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] block leading-snug">
                    {event.statutoryRef}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Submission Desk */}
        <div className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Submit a Regulatory Reference or Notice
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
            Our editorial board continuously reviews official gazettes, MHRA Enforcement Group releases, and international anti-doping updates. If you represent an academic institution or regulatory agency with verifiable public documentation, contact our desk at <Link href="/contact/" className="text-sky-300 hover:text-white underline underline-offset-2">regulatory@trustlypharma.co.uk</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
