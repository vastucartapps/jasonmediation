import Link from 'next/link';
import type { Metadata } from 'next';
import { LEGAL_STATUS_MATRIX } from '../../../data/regulatory';
import {
  Scale,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Legal Status Matrix | Trustly Pharma',
  description:
    'Statutory classification matrix for 12 research peptides under UK Human Medicines Regulations 2012, Misuse of Drugs Act 1971, and WADA anti-doping codes.',
  alternates: {
    canonical: 'https://trustlypharma.uk/regulatory/uk-legal-status/',
  },
};

export default function UkLegalStatusPage() {
  const compounds = LEGAL_STATUS_MATRIX;

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
        '@id': 'https://trustlypharma.uk/regulatory/uk-legal-status/#webpage',
        url: 'https://trustlypharma.uk/regulatory/uk-legal-status/',
        name: 'UK Peptide Legal Status & Statutory Classification Matrix',
        description: 'Comprehensive statutory classification for synthetic peptides under UK law and WADA regulations.',
        isPartOf: { '@id': 'https://trustlypharma.uk/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.uk/regulatory/uk-legal-status/#breadcrumb',
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
            name: 'UK Legal Status Matrix',
            item: 'https://trustlypharma.uk/regulatory/uk-legal-status/',
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
            <span className="text-white font-semibold">UK Legal Status Matrix</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-emerald-400 border border-emerald-500/30">
            <Scale className="w-3.5 h-3.5" />
            <span>UK Statutory Classification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            UK Peptide Legal Status & Anti-Doping Matrix
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Statutory classification table for all 12 compounds indexed on Trustly Pharma. Cross-referenced against the Human Medicines Regulations 2012 (SI 2012/1916), the Misuse of Drugs Act 1971, and WADA Prohibited List codes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#0a2149] text-slate-200 border border-[rgba(141,168,195,0.2)]">
              {compounds.length} Indexed Compounds
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0a2149] text-sky-300 border border-sky-400/30">
              Legislation Reference: SI 2012/1916
            </span>
          </div>
        </div>
      </section>

      {/* Legal Status Table & Cards */}
      <div className="container-wide mt-12 space-y-8">
        <div className="space-y-6">
          {compounds.map((comp) => (
            <div
              key={comp.slug}
              className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] bg-gradient-to-br from-[#02102b] to-[#041638] shadow-xl hover:border-sky-400/40 transition-colors space-y-5"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400 bg-[#020e24] px-2.5 py-0.5 rounded-lg border border-[rgba(141,168,195,0.2)]">
                      CAS: {comp.casNumber}
                    </span>
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-lg border font-bold ${
                        comp.ukHumanMedicinesRegs2012 === 'Prescription Only Medicine (POM)'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                          : 'bg-[#103059] text-sky-300 border-sky-500/30'
                      }`}
                    >
                      {comp.ukHumanMedicinesRegs2012}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {comp.name}
                  </h2>
                </div>

                <Link
                  href={`/peptides/${comp.slug}/`}
                  className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 hover:text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
                >
                  <span>Chemical Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Statutory Classification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-1">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                    Human Medicines Regs 2012
                  </span>
                  <span className="text-white font-bold block">
                    {comp.ukHumanMedicinesRegs2012}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-1">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                    Misuse of Drugs Act 1971
                  </span>
                  <span className="text-emerald-400 font-bold block">
                    {comp.misuseOfDrugsAct1971}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-1">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                    WADA Prohibited Status
                  </span>
                  <span
                    className={`font-bold block ${
                      comp.wadaProhibitedList.includes('Prohibited')
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {comp.wadaProhibitedList}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-1">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                    Permitted Lab Research
                  </span>
                  <span className="text-sky-300 font-bold block">
                    {comp.permittedLabUse}
                  </span>
                </div>
              </div>

              {/* Legal Notes */}
              <div className="p-4 rounded-2xl bg-[#031433] border border-[rgba(141,168,195,0.15)] flex items-start gap-3 text-xs leading-relaxed">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p className="text-slate-200">{comp.summaryNotes}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="rounded-2xl p-5 bg-[#0a1b38] border border-amber-500/30 text-xs text-slate-200 leading-relaxed flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase font-bold text-amber-300 block mb-1">
              Legal Disclaimer & Scientific Advisory
            </span>
            <p>
              The classifications provided in this matrix reflect current statutory interpretations under UK legislation as of the current calendar year. This information is published solely for educational, academic, and scientific reference and does not constitute formal legal advice. Handling synthetic chemicals must strictly comply with local institutional COSHH assessments and laboratory safety standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
