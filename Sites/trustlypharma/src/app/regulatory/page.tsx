import Link from 'next/link';
import type { Metadata } from 'next';
import {
  REGULATORS,
  UK_REGULATOR_STATEMENTS_2026,
  OFFICIAL_REGULATORY_SOURCES,
} from '../../data/regulatory';
import {
  ShieldAlert,
  Scale,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  FileText,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Regulatory Intelligence Hub | Trustly Pharma',
  description:
    'Official UK regulatory framework for research peptides and GLP-1 medicines: MHRA, WADA, FDA, EMA, and ASA statutory policies and primary citations.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/regulatory/',
  },
};

const COMPOUND_LEGAL_PAGES = [
  { name: 'BPC-157', slug: 'bpc-157' },
  { name: 'TB-500', slug: 'tb-500' },
  { name: 'MOTS-c', slug: 'mots-c' },
  { name: 'Ipamorelin', slug: 'ipamorelin' },
  { name: 'CJC-1295', slug: 'cjc-1295-dac' },
  { name: 'GHK-Cu', slug: 'ghk-cu' },
  { name: 'Tirzepatide', slug: 'tirzepatide' },
  { name: 'Semaglutide', slug: 'semaglutide' },
  { name: 'Retatrutide', slug: 'retatrutide' },
  { name: 'Epitalon', slug: 'epitalon' },
  { name: 'Semax', slug: 'semax' },
  { name: 'Selank', slug: 'selank' },
];

export default function RegulatoryHubPage() {
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
        '@type': 'GovernmentService',
        '@id': 'https://trustlypharma.co.uk/regulatory/#service',
        name: 'Peptide Regulatory Intelligence Hub',
        provider: {
          '@type': 'Organization',
          name: 'Trustly Pharma Analytical Board',
        },
        serviceType: 'Regulatory Compliance Information',
        areaServed: 'GB',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.co.uk/regulatory/#breadcrumb',
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
            name: 'Regulatory Hub',
            item: 'https://trustlypharma.co.uk/regulatory/',
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
            <span className="text-white font-semibold">Regulatory Hub</span>
          </nav>
        </div>
      </div>

      {/* Hero Section matching reference style */}
      <section className="py-12 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-300 border border-sky-400/35 font-bold">
            <Scale className="w-3.5 h-3.5 text-sky-400" />
            <span>REGULATORY HUB</span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              UK regulatory framework for peptides. Live tracker.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Five regulators set the rules for peptides, collagen and GLP-1 medicines in the UK. We track what they are saying, in plain English, and link to the primary sources.
            </p>
            <p className="text-xs font-mono text-slate-400 pt-1">
              Last updated: 06 October 2026. Editorial commentary, not legal advice.
            </p>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Link
              href="/regulatory/mhra-tracker/"
              className="p-5 rounded-2xl bg-[#061c42] border border-sky-500/35 hover:border-sky-300 transition-all group flex items-center justify-between shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-300 font-bold block">
                  Live Action Tracker
                </span>
                <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  MHRA Enforcement & Safety Tracker →
                </span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  Rolling 90-day archive of UK notices & seizures
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/regulatory/uk-legal-status/"
              className="p-5 rounded-2xl bg-[#061c42] border border-emerald-500/35 hover:border-emerald-300 transition-all group flex items-center justify-between shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold block">
                  Statutory Classification
                </span>
                <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  12-Compound UK Legal Status Matrix →
                </span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  HMR 2012, MDA 1971, PSA 2016 & WADA rulings
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container-wide mt-12 space-y-16">
        {/* Section 1: The Five Jurisdictions We Track */}
        <section className="space-y-6">
          <div className="space-y-1.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The five jurisdictions we track
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Each regulator below has a separate remit. We summarise what each one covers, link to our existing deep-dive where it exists, and link directly to official agency sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGULATORS.map((reg) => (
              <div
                key={reg.id}
                className="rounded-3xl p-6 sm:p-7 card-paper border border-[rgba(141,168,195,0.25)] flex flex-col justify-between space-y-5 bg-gradient-to-br from-[#02102b] to-[#041638] shadow-xl hover:border-sky-400/40 transition-colors"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.18)]">
                    <div>
                      <span className="text-2xl font-extrabold text-white font-mono">
                        {reg.acronym}
                      </span>
                      <span className="text-xs font-mono text-slate-400 block">
                        {reg.jurisdiction}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 bg-[#020e24] px-2.5 py-1 rounded-lg border border-[rgba(141,168,195,0.2)] font-bold">
                      Official Agency
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 leading-snug">
                    {reg.name}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                        Statutory Basis:
                      </span>
                      <span className="text-sky-300 font-mono text-[11px] block mt-0.5">
                        {reg.statutoryBasis}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                        Enforcement Focus:
                      </span>
                      <p className="text-slate-200 mt-0.5 leading-relaxed">
                        {reg.keyEnforcementArea}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(141,168,195,0.18)] flex items-center justify-between">
                  {reg.id === 'mhra' ? (
                    <Link
                      href="/regulatory/mhra-tracker/"
                      className="text-xs font-mono font-bold text-sky-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      MHRA medicines tracker →
                    </Link>
                  ) : (
                    <a
                      href={reg.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-sky-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Visit agency portal</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: What UK regulators are saying about peptides and GLP-1 medicines */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 uppercase font-bold tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE REGULATORY TRACKER
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What UK regulators are saying about peptides and GLP-1 medicines
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
              Newest entry: 2026-09-24
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UK_REGULATOR_STATEMENTS_2026.map((st) => (
              <div
                key={st.id}
                className="rounded-2xl p-5 bg-[#031535] border border-[rgba(141,168,195,0.22)] hover:border-sky-400/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#0a2347] text-sky-300 font-bold border border-sky-400/30">
                      {st.regulator}
                    </span>
                    <span className="text-slate-400">{st.date}</span>
                  </div>

                  <p className="text-sm font-semibold text-white leading-snug group-hover:text-sky-300 transition-colors">
                    {st.title}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(141,168,195,0.15)]">
                  <a
                    href={st.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-sky-400 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>Read context →</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-sky-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Per-Compound UK Legal Status Pages */}
        <section className="space-y-6">
          <div className="space-y-1.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Per-compound UK legal status pages
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Dedicated UK regulatory status summaries for the most-indexed synthetic research peptides and GLP-1 compounds. Each one reviews the Misuse of Drugs Act position, Psychoactive Substances Act status, and MHRA marketing authorization requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {COMPOUND_LEGAL_PAGES.map((comp) => (
              <Link
                key={comp.slug}
                href={`/peptides/${comp.slug}/`}
                className="p-4 rounded-xl bg-[#031535] border border-[rgba(141,168,195,0.22)] hover:border-sky-400 hover:bg-[#071f49] transition-all group shadow-sm text-center"
              >
                <span className="text-sm font-bold text-white group-hover:text-sky-300 block">
                  {comp.name}
                </span>
                <span className="text-[11px] font-mono text-slate-400 block mt-1">
                  UK legal status →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: The data behind this hub */}
        <section className="space-y-6">
          <div className="space-y-1.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The data behind this hub
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Trustly Pharma maintains these as refreshable datasets rather than one-off static articles. Each carries its own source, methodology, and last-updated date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/regulatory/mhra-tracker/"
              className="p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 transition-all group space-y-3 shadow-xl"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-sky-400" />
                LIVE DATA TRACKER
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                MHRA enforcement and safety tracker →
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Every MHRA safety alert, enforcement action, and drug safety update relevant to synthetic peptides and weight-loss medicines, dated and linked back to the gov.uk original.
              </p>
              <span className="text-xs font-mono text-slate-400 block pt-1">
                Source: gov.uk / MHRA · 23 items indexed in rolling 90 days
              </span>
            </Link>

            <Link
              href="/regulatory/uk-legal-status/"
              className="p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] hover:border-emerald-400 transition-all group space-y-3 shadow-xl"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4 text-emerald-400" />
                STATUTORY REFERENCE MATRIX
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                UK peptide legal classification matrix →
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Comprehensive statutory matrix cross-referencing synthetic peptides across HMR 2012, Misuse of Drugs Act 1971, Psychoactive Substances Act 2016, and WADA S0/S2 categories.
              </p>
              <span className="text-xs font-mono text-slate-400 block pt-1">
                Source: UK Statutory Instruments · WADA Prohibited List
              </span>
            </Link>
          </div>
        </section>

        {/* Section 5: Check it yourself: the official sources */}
        <section className="rounded-3xl p-6 sm:p-9 bg-[#041433] border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Check it yourself: the official sources
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Trustly Pharma is editorial commentary. Nothing here replaces the statutory authority of the UK regulator, and you should not take our word for any of it. These are the official UK destinations where the underlying position is published, free to read and open to anyone.
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

        {/* Section 6: How We Build This Hub */}
        <section className="rounded-3xl p-6 sm:p-8 bg-[#02102b] border border-[rgba(141,168,195,0.22)] space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white">How we build this hub</h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            We pull primary-source statements from MHRA, FDA, WADA, EMA and ASA directly. We do not paraphrase secondary reporting. Where a position has shifted, we date the entry and link to the regulator&apos;s own page so the reader can verify. Items still pending source confirmation are held back from the ticker until an editor verifies them against the regulator&apos;s own published record.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
            This page is editorial commentary. It is not legal advice. For binding interpretation of any regulator&apos;s position, consult the regulator directly or a qualified UK medicines lawyer.
          </p>
        </section>
      </div>
    </div>
  );
}
