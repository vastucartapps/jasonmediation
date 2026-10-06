import Link from 'next/link';
import type { Metadata } from 'next';
import { REGULATORS } from '../../data/regulatory';
import {
  ShieldAlert,
  Scale,
  FileText,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Building2,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK & Global Peptide Regulatory Intelligence Hub | MHRA, WADA & ASA Compliance',
  description:
    'Authoritative regulatory intelligence hub examining UK Human Medicines Regulations 2012, MHRA enforcement notices, WADA S0/S2 anti-doping policies, and laboratory research compliance.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/regulatory/',
  },
};

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
            name: 'Regulatory Intelligence',
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
            <span className="text-white font-semibold">Regulatory Intelligence</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Statutory Governance & Compliance</span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              UK & International Peptide Regulatory Intelligence
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Authoritative statutory analysis of synthetic research peptides under UK medicines law, anti-doping conventions, and commercial advertising standards. Track regulatory positions across MHRA, WADA, ASA, and European authorities.
            </p>
          </div>

          {/* Quick Action Navigation Cards */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Link
              href="/regulatory/mhra-tracker/"
              className="p-5 rounded-2xl bg-gradient-to-br from-[#071d42] to-[#03112c] border border-sky-500/30 hover:border-sky-400 transition-all group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                  Enforcement Timeline
                </span>
                <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  Live MHRA & UK Enforcement Tracker
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/regulatory/uk-legal-status/"
              className="p-5 rounded-2xl bg-gradient-to-br from-[#071d42] to-[#03112c] border border-emerald-500/30 hover:border-emerald-400 transition-all group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Statutory Classification
                </span>
                <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  12-Compound UK Legal Status Matrix
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-wide mt-12 space-y-12">
        {/* Core Statutory Regulators */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold block">
                  Jurisdictional Authorities
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  5 Key Regulatory Agencies & Statutory Mandates
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-[#020e24] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
              UK, EU & Global Scope
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGULATORS.map((reg) => (
              <div
                key={reg.id}
                className="rounded-3xl p-6 card-paper border border-[rgba(141,168,195,0.25)] flex flex-col justify-between space-y-5 bg-gradient-to-br from-[#02102b] to-[#041638] shadow-xl hover:border-sky-400/40 transition-colors"
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

                <div className="pt-3 border-t border-[rgba(141,168,195,0.18)]">
                  <a
                    href={reg.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-sky-400 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>Visit Agency Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification & Official Sources Desk */}
        <section className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                Primary References
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Official Government & Scientific Sources Desk
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
            We urge all researchers to consult primary statutory databases and official reporting portals before acquiring synthetic chemical items. Trustly Pharma indexes public records directly from these portals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <a
              href="https://www.legislation.gov.uk/uksi/2012/1916/contents/made"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-colors space-y-1.5 group"
            >
              <span className="text-[10px] uppercase text-sky-400 block font-bold">Legislation.gov.uk</span>
              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                Human Medicines Regs 2012
              </h4>
              <p className="text-slate-300 text-[11px] font-sans">Full statutory instrument text for SI 2012/1916.</p>
            </a>

            <a
              href="https://yellowcard.mhra.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-colors space-y-1.5 group"
            >
              <span className="text-[10px] uppercase text-amber-400 block font-bold">MHRA Portal</span>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Yellow Card Reporting
              </h4>
              <p className="text-slate-300 text-[11px] font-sans">Report defective or counterfeit medical products.</p>
            </a>

            <a
              href="https://www.wada-ama.org/en/prohibited-list"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-colors space-y-1.5 group"
            >
              <span className="text-[10px] uppercase text-emerald-400 block font-bold">WADA Directory</span>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Anti-Doping Prohibited List
              </h4>
              <p className="text-slate-300 text-[11px] font-sans">Official S0 and S2 prohibited substance registry.</p>
            </a>

            <a
              href="https://pubchem.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-colors space-y-1.5 group"
            >
              <span className="text-[10px] uppercase text-sky-400 block font-bold">NIH / NLM</span>
              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                PubChem Chemical Database
              </h4>
              <p className="text-slate-300 text-[11px] font-sans">Empirical molecular formula & CAS verification.</p>
            </a>
          </div>
        </section>

        {/* Regulatory Advisory Notice */}
        <div className="rounded-2xl p-5 bg-[#0a1b38] border border-amber-500/30 text-xs text-slate-200 leading-relaxed flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase font-bold text-amber-300 block mb-1">
              Statutory Research Warning
            </span>
            <p>
              In the United Kingdom, selling unlicensed medicinal substances for human consumption constitutes a criminal offence under Regulation 46 of the Human Medicines Regulations 2012. Synthetic peptides cataloged on Trustly Pharma are permitted exclusively for legitimate in vitro biochemical analysis, cell culture assays, and chemical characterization in controlled laboratory environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
