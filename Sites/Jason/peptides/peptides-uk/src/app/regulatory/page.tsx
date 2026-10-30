import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  REGULATORS,
  UK_REGULATOR_STATEMENTS_2026,
  OFFICIAL_REGULATORY_SOURCES,
  LEGAL_STATUS_MATRIX,
} from '@/data/regulatory';
import {
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Building2,
  ExternalLink,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'UK Regulatory Hub & MHRA Compliance',
  description:
    'Authoritative UK statutory intelligence on peptides: Human Medicines Regulations 2012 (SI 2012/1916), Misuse of Drugs Act 1971, and rolling MHRA directives.',
  path: '/regulatory/',
});

export default function RegulatoryHubPage() {
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
        '@type': 'GovernmentService',
        '@id': `${SITE_METADATA.url}/regulatory/#service`,
        name: 'Peptide Regulatory & Statutory Intelligence Hub',
        provider: {
          '@type': 'Organization',
          name: 'Peptides UK Academic Registry',
        },
        serviceType: 'Regulatory Compliance Information',
        areaServed: 'GB',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_METADATA.url}/regulatory/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are research peptides legal to buy and possess in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. In the United Kingdom, non-controlled synthetic peptides are lawful to purchase, possess, and handle strictly for bona fide in vitro laboratory research and analytical assay calibration under the Human Medicines Regulations 2012 (SI 2012/1916). They are not licensed for human consumption.',
            },
          },
          {
            '@type': 'Question',
            name: 'What constitutes an unlicensed medicine under MHRA regulations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under Regulation 46 of SI 2012/1916, any medicinal product placed on the market requires a valid Marketing Authorisation unless an exemption applies. Selling or marketing peptides with dosage instructions, therapeutic claims, or for human administration without an MHRA license constitutes a criminal offense.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are research peptides covered by the Psychoactive Substances Act 2016?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Synthetic research peptides such as BPC-157, TB-500, CJC-1295, and semaglutide do not modulate the central nervous system via psychoactive pathways to alter mood, cognition, or perception, and are therefore exempt from the Psychoactive Substances Act 2016.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/regulatory/#breadcrumb`,
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
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">UK Regulatory Hub</span>
      </nav>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
          <Scale className="w-3.5 h-3.5 text-blue-700" />
          <span>Statutory Authority &amp; Legal Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          UK Regulatory &amp; MHRA Statutory Intelligence Hub
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Comprehensive statutory guidance on the legal parameters governing synthetic peptides, incremental GLP-1 analogues,
          and biological signaling compounds in England, Scotland, Wales, and Northern Ireland under the{' '}
          <strong className="text-slate-900">Human Medicines Regulations 2012 (SI 2012/1916)</strong>, the{' '}
          <strong className="text-slate-900">Misuse of Drugs Act 1971</strong>, and the{' '}
          <strong className="text-slate-900">World Anti-Doping Code</strong>.
        </p>
      </div>

      {/* Sub-Tracker Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/regulatory/mhra-tracker/"
          className="clinical-card p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-emerald-500/50 group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="badge-emerald font-mono text-xs">Rolling 90-Day Archive</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            MHRA Enforcement &amp; Safety Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Monitor real-time enforcement bulletins, border seizure notifications, advertising censures, and statutory warning letters
            issued by the Medicines and Healthcare products Regulatory Agency concerning research chemical supply chains.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
            <span>Explore Rolling Event Log</span>
            <span>→</span>
          </div>
        </Link>

        <Link
          href="/regulatory/uk-legal-status/"
          className="clinical-card p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-blue-500/50 group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="badge-cobalt font-mono text-xs">Statutory Schedule Matrix</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            UK Legal Status &amp; Statutory Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Inspect the complete 12-compound legal classification table detailing status under the Misuse of Drugs Act 1971,
            Human Medicines Regulations 2012, and WADA Olympic &amp; professional sports prohibitions.
          </p>
          <div className="pt-2 text-xs font-mono text-blue-700 font-semibold flex items-center gap-1">
            <span>View Full Legal Matrix Table</span>
            <span>→</span>
          </div>
        </Link>
      </div>

      {/* Core Statutory Pillars */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 space-y-8 shadow-md">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
            Primary Legislation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            The 3 Pillars of UK Peptide Research Law
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            British legislation establishes an unambiguous demarcation between authorized clinical therapeutics,
            controlled narcotics, and legitimate laboratory chemical reagents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Human Medicines Regulations 2012</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Statutory Instrument 2012/1916, chemical compounds without Marketing Authorisation may be sold
              and supplied lawfully exclusively for in vitro laboratory research and academic assay development.
              Promoting unlicensed compounds for human consumption or therapeutic efficacy is strictly illegal.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Misuse of Drugs Act 1971</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Synthetic peptides including BPC-157, TB-500, GHK-Cu, and semaglutide are non-controlled chemical entities
              not scheduled under the Misuse of Drugs Act 1971 or Misuse of Drugs Regulations 2001. Possession for bona fide
              academic study does not require a Home Office Controlled Drug license.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-white">CAP Code Rule 12.11 &amp; ASA Oversight</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Advertising Standards Authority strictly prohibits direct-to-consumer advertising or promotional health
              claims for prescription-only medicines (POM) or unlicensed medicinal products. All vendor listings must maintain
              purely descriptive chemical monograph formats.
            </p>
          </div>
        </div>
      </section>

      {/* Regulators Dossier Grid */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">
            Institutional Oversight Bodies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Regulators &amp; Jurisdictional Authorities
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Overview of the primary statutory agencies governing drug safety, athletic anti-doping integrity,
            and research chemical commerce in Britain and internationally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {REGULATORS.map((reg) => (
            <div
              key={reg.id}
              className="card-inner-elevated p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {reg.acronym}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{reg.jurisdiction}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{reg.name}</h3>
                <div className="text-xs text-slate-500 font-mono">
                  Statutory Basis: <strong className="text-slate-800">{reg.statutoryBasis}</strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {reg.mandate}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">Official Portal:</span>
                <a
                  href={reg.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>gov.uk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 Official Statements Digest */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-emerald-700 mb-1">
            Current Enforcement Posture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Official Regulatory Statements (2025–2026)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Recent policy notices and formal guidance issuances concerning GLP-1 supply lines, unapproved compounding,
            and advertising compliance.
          </p>
        </div>

        <div className="space-y-4">
          {UK_REGULATOR_STATEMENTS_2026.map((stmt, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="badge-cobalt font-mono text-xs">{stmt.regulator}</span>
                  <span className="badge-emerald font-mono text-xs">{stmt.type}</span>
                  <span className="text-xs font-mono text-slate-700 font-semibold">{stmt.date}</span>
                </div>
                <span className="text-xs font-mono text-slate-600">ID: {stmt.id}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{stmt.title}</h3>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-t border-slate-200/60">
                <span className="text-slate-700">Official MHRA Bulletin Record</span>
                <a
                  href={stmt.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
                >
                  <span>View Primary Government Record</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Statutory Classification Matrix Table */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-blue-700 mb-1">
              Comprehensive Statutory Audit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              UK Peptide Statutory Classification Matrix
            </h2>
          </div>
          <Link
            href="/regulatory/uk-legal-status/"
            className="text-xs font-mono font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Detailed Dossier Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[750px]">
            <thead className="bg-slate-50 text-slate-750 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Compound</th>
                <th className="py-3.5 px-4 font-bold">SI 2012/1916 Classification</th>
                <th className="py-3.5 px-4 font-bold">Misuse of Drugs Act 1971</th>
                <th className="py-3.5 px-4 font-bold">WADA Code</th>
                <th className="py-3.5 px-4 font-bold">Permitted Lab Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {LEGAL_STATUS_MATRIX.map((item) => (
                <tr key={item.slug} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900">
                    <Link href={`/peptides/${item.slug}/`} className="text-emerald-700 hover:underline">
                      {item.name}
                    </Link>
                    <div className="text-[11px] font-mono text-slate-600 font-normal">CAS {item.casNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-800">
                    {item.ukHumanMedicinesRegs2012}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {item.misuseOfDrugsAct1971}
                  </td>
                  <td className="py-3.5 px-4 text-amber-700 font-medium">
                    {item.wadaProhibitedList}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                    {item.permittedLabUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Official Legislation Links */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Primary Legislation Reference Documents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {OFFICIAL_REGULATORY_SOURCES.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-600">
                  {source.authority}
                </span>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {source.title}
                </div>
              </div>
              <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="line-clamp-1">{source.desc}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-700 flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
