import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  MHRA_TRACKER_STATS,
  MHRA_FULL_90DAY_RECORDS,
  MHRA_TRACKER_EVENTS,
  OFFICIAL_REGULATORY_SOURCES,
} from '@/data/regulatory';
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
  ArrowRight,
  TrendingDown,
  Search,
} from 'lucide-react';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'MHRA Drug Safety & Enforcement Tracker',
  description:
    'Rolling 90-day archive of MHRA drug safety updates, warning letters, and border enforcement notices concerning research peptides in the United Kingdom.',
  path: '/regulatory/mhra-tracker/',
});

export default function MhraTrackerPage() {
  const stats = MHRA_TRACKER_STATS;
  const records = MHRA_FULL_90DAY_RECORDS;
  const events = MHRA_TRACKER_EVENTS;

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
        '@type': 'MedicalWebPage',
        '@id': `${SITE_METADATA.url}/regulatory/mhra-tracker/#webpage`,
        url: `${SITE_METADATA.url}/regulatory/mhra-tracker/`,
        name: 'MHRA Enforcement and Safety Tracker',
        description:
          'Rolling 90-day archive of MHRA drug safety updates and enforcement actions regarding synthetic peptide compounds.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/regulatory/mhra-tracker/#breadcrumb`,
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
            name: 'UK Regulatory Hub',
            item: `${SITE_METADATA.url}/regulatory/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'MHRA Tracker',
            item: `${SITE_METADATA.url}/regulatory/mhra-tracker/`,
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
        <Link href="/regulatory/" className="hover:text-emerald-700">UK Regulatory Hub</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">MHRA Tracker</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200/80">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>UK Enforcement Intelligence Feed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          MHRA Peptide Regulatory Tracker
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Continuous statutory monitoring archive of Medicines and Healthcare products Regulatory Agency (MHRA)
          enforcement activities, border interdictions, safety alerts, and compliance warning letters concerning
          synthetic peptides and research chemical supply lines across the United Kingdom.
        </p>
      </div>

      {/* Key Enforcement Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-700 font-semibold uppercase">Total Tracked Actions</div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.totalItems}</div>
          <div className="text-[11px] text-slate-600 font-mono">Rolling {stats.windowDays}-Day Window</div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-700 font-semibold uppercase">Peptide-Relevant</div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono">{stats.relevantCount}</div>
          <div className="text-[11px] text-slate-600 font-mono">Targeted Chemical Audits</div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-700 font-semibold uppercase">Enforcement Notices</div>
          <div className="text-3xl font-extrabold text-red-600 font-mono">{stats.enforcementCount}</div>
          <div className="text-[11px] text-slate-600 font-mono">Formal Seizures &amp; Sanctions</div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-700 font-semibold uppercase">Drug Safety Updates</div>
          <div className="text-3xl font-extrabold text-blue-600 font-mono">{stats.drugSafetyUpdates}</div>
          <div className="text-[11px] text-slate-600 font-mono">Statutory MHRA Bulletins</div>
        </div>
      </div>

      {/* Major Enforcement Case Studies */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-red-700 mb-1">
            Statutory Case Studies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Recent Regulatory Enforcement Precedents
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Detailed case reviews of recent enforcement actions by the MHRA, Advertising Standards Authority,
            and UK Border Force establishing statutory boundaries for research peptide commerce.
          </p>
        </div>

        <div className="space-y-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="card-inner-elevated p-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="badge-emerald font-mono text-xs">{evt.regulator}</span>
                  <span className="badge-cobalt font-mono text-xs">{evt.category}</span>
                  <span className="text-xs font-mono text-slate-700">{evt.date}</span>
                </div>
                <span className="text-xs font-mono text-slate-600">Ref: {evt.referenceNumber}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {evt.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-slate-500">Affected Compounds:</span>
                {evt.compoundsAffected.map((cmp, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-semibold"
                  >
                    {cmp}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Statutory Reference: <strong className="text-slate-800">{evt.statutoryRef}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rolling 90-Day Full Records Table */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">
            Complete Feed
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Rolling 90-Day Government Notices Archive
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Exhaustive record of official Drug Safety Updates, enforcement bulletins, and regulatory announcements
            published by the MHRA.
          </p>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Official Document Title</th>
                <th className="py-3.5 px-4 font-bold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{rec.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.type === 'ENFORCEMENT'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : rec.type === 'DRUG SAFETY UPDATE'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {rec.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-slate-900 max-w-md">
                    {rec.item}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={rec.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      <span>gov.uk</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
