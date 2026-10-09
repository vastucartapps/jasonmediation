import Link from 'next/link';
import type { Metadata } from 'next';
import {
  MHRA_TRACKER_STATS,
  MHRA_FULL_90DAY_RECORDS,
  MHRA_TRACKER_EVENTS,
  OFFICIAL_REGULATORY_SOURCES,
} from '../../../data/regulatory';
import {
  ShieldAlert,
  ChevronRight,
  Calendar,
  Scale,
  ExternalLink,
  Tag,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  FileText,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MHRA Regulatory Tracker | Trustly Pharma',
  description:
    'Rolling 90-day archive of MHRA drug safety updates, warning letters, and enforcement actions touching synthetic research peptides in the UK.',
  alternates: {
    canonical: 'https://trustlypharma.uk/regulatory/mhra-tracker/',
  },
};

export default function MhraTrackerPage() {
  const stats = MHRA_TRACKER_STATS;
  const records = MHRA_FULL_90DAY_RECORDS;
  const events = MHRA_TRACKER_EVENTS;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.uk/#website',
        url: 'https://trustlypharma.uk',
        name: 'Trustly Pharma',
      },
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://trustlypharma.uk/regulatory/mhra-tracker/#webpage',
        url: 'https://trustlypharma.uk/regulatory/mhra-tracker/',
        name: 'MHRA Enforcement and Safety Tracker',
        description:
          'Rolling 90-day archive of MHRA drug safety updates and enforcement actions regarding synthetic peptide compounds.',
        isPartOf: { '@id': 'https://trustlypharma.uk/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.uk/regulatory/mhra-tracker/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Regulatory Intelligence',
            item: 'https://trustlypharma.uk/regulatory/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'MHRA Tracker',
            item: 'https://trustlypharma.uk/regulatory/mhra-tracker/',
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
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/regulatory/" className="hover:text-sky-400 transition-colors">
              Regulatory Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-semibold">MHRA Enforcement & Safety Tracker</span>
          </nav>
        </div>
      </div>

      {/* Hero Header matching reference */}
      <section className="py-12 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#103059] text-sky-300 border border-sky-400/35 font-bold shadow-sm">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <span>REGULATORY TRACKER</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              MHRA enforcement and safety tracker
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950 text-xs shadow-md">
                TP
              </div>
              <div className="text-xs font-mono text-slate-300">
                <span className="font-semibold text-white">Trustly Pharma Analytical Board</span> · Regulatory Intelligence Desk
                <span className="block text-slate-400 text-[11px]">Last updated: 06 October 2026</span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-200 max-w-4xl leading-relaxed">
            The MHRA published <strong className="text-white">{stats.totalItems} items</strong> in the 90 days to <strong className="text-white">{stats.endDate}</strong>, of which <strong className="text-sky-300">{stats.relevantCount} relate to weight-loss medicines or synthetic peptides</strong>, <strong className="text-rose-300">{stats.enforcementCount} concern enforcement against illegal or unlicensed supply</strong>, and <strong className="text-amber-300">{stats.drugSafetyUpdates} are formal Drug Safety Updates</strong>. This page restates what the regulator published and links to each gov.uk original. It is an independent reporting record, not advice.
          </p>

          {/* 4 Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="rounded-2xl p-5 bg-[#05193d] border border-sky-500/30 shadow-lg space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">
                {stats.totalItems}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                MHRA items in the window
              </span>
            </div>

            <div className="rounded-2xl p-5 bg-[#052648] border border-cyan-500/35 shadow-lg space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono block">
                {stats.relevantCount}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                Relevant to this site
              </span>
            </div>

            <div className="rounded-2xl p-5 bg-[#2d0f1a] border border-rose-500/35 shadow-lg space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-300 font-mono block">
                {stats.enforcementCount}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                Enforcement actions
              </span>
            </div>

            <div className="rounded-2xl p-5 bg-[#2a1c09] border border-amber-500/35 shadow-lg space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono block">
                {stats.drugSafetyUpdates}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium block">
                Drug Safety Updates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-wide mt-12 space-y-14">
        {/* Full 90-Day MHRA Record Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Full MHRA record, last 90 days
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
              Everything the MHRA published between {stats.startDate} and {stats.endDate}, newest first. We list the full record rather than only selected parts, so every item can be audited directly against the official government register.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(141,168,195,0.22)] bg-[#031535] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[rgba(141,168,195,0.2)] bg-[#020e24] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-4 sm:px-6 w-32">Date</th>
                    <th className="py-4 px-4 sm:px-6 w-44">Type</th>
                    <th className="py-4 px-4 sm:px-6">Item</th>
                    <th className="py-4 px-4 sm:px-6 w-32 text-right sm:text-center">Relevant Here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(141,168,195,0.12)]">
                  {records.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-mono text-slate-300 whitespace-nowrap">
                        {rec.date}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide ${
                            rec.type === 'ENFORCEMENT'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                              : rec.type === 'DRUG SAFETY UPDATE'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                              : 'bg-sky-950/80 text-sky-300 border border-sky-500/40'
                          }`}
                        >
                          {rec.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-sky-300 font-medium transition-colors inline-flex items-center gap-1.5 group-hover:underline"
                        >
                          <span>{rec.item}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-300 shrink-0" />
                        </a>
                        {rec.summary && (
                          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                            {rec.summary}
                          </p>
                        )}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right sm:text-center whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                            rec.relevantHere
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'text-slate-400'
                          }`}
                        >
                          {rec.relevantHere ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed High-Relevance Actions & Rulings */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Detailed Case Dossiers: Peptides & GLP-1 Enforcement
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
              In-depth analysis of high-impact regulatory interventions, laboratory raid reports, court orders, and cross-regulator warnings impacting the synthetic peptide sector.
            </p>
          </div>

          <div className="space-y-6">
            {events.map((event) => (
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
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
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
        </section>

        {/* Check it yourself: The official sources */}
        <section className="rounded-3xl p-6 sm:p-9 bg-[#041433] border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Check it yourself: the official sources
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Trustly Pharma is an independent analytical publication. Nothing here replaces the statutory authority of the MHRA, GPhC, or ASA. Direct official portals for independent verification are indexed below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFICIAL_REGULATORY_SOURCES.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#020e24] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/50 transition-all flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 block">
                    {src.authority}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                    <span>{src.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 shrink-0" />
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {src.desc}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-sky-400 pt-2 border-t border-slate-800 flex items-center gap-1">
                  Visit Official Register →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Regulatory Submission Desk */}
        <div className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Submit a Regulatory Reference or Notice
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
            The editorial curation board continuously monitors statutory gazettes, MHRA Enforcement Group bulletins, and regulatory border notices. Academic institutions or regulatory researchers submitting verifiable public documentation may reach the editorial desk via{' '}
            <Link href="/contact/" className="text-sky-300 hover:text-white underline underline-offset-2">
              the institutional contact desk
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
