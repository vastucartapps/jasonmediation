import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { LEGAL_STATUS_MATRIX } from '@/data/regulatory';
import {
  Scale,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Building2,
  ExternalLink,
  ArrowRight,
  Info,
  HelpCircle,
} from 'lucide-react';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'UK Legal Status & Drug Schedules Guide',
  description:
    'Statutory classification matrix for 12 research peptides under UK SI 2012/1916, Misuse of Drugs Act 1971, and WADA anti-doping regulations.',
  path: '/regulatory/uk-legal-status/',
});

export default function UkLegalStatusPage() {
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
        '@id': `${SITE_METADATA.url}/regulatory/uk-legal-status/#webpage`,
        url: `${SITE_METADATA.url}/regulatory/uk-legal-status/`,
        name: 'UK Peptide Legal Status & Statutory Classification Matrix',
        description: 'Comprehensive statutory classification for synthetic peptides under UK law and WADA regulations.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_METADATA.url}/regulatory/uk-legal-status/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are research peptides controlled under the UK Misuse of Drugs Act 1971?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Synthetic research peptides including BPC-157, TB-500, CJC-1295, Ipamorelin, and GHK-Cu are not controlled drugs or scheduled substances under the Misuse of Drugs Act 1971 or Misuse of Drugs Regulations 2001.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to import synthetic peptides into the UK for laboratory use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Reagent-grade peptides may be imported into the UK provided they are accurately declared under customs HS code 2937.19.0000, clearly labeled for strictly in vitro laboratory research, accompanied by a verified Certificate of Analysis (COA), and not intended or marketed for human administration.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/regulatory/uk-legal-status/#breadcrumb`,
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
            name: 'UK Legal Status Matrix',
            item: `${SITE_METADATA.url}/regulatory/uk-legal-status/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="container-ultra-wide py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Link href="/" className="hover:text-indigo-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/regulatory/" className="hover:text-indigo-800">UK Regulatory Hub</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-950 font-bold">UK Legal Status Matrix</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-amino-backbone bg-washout-formula">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
          <Scale className="w-3.5 h-3.5" />
          <span>Statutory Classification &amp; Judicial Precedent</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
          UK Legal Status &amp; Schedules Matrix
        </h1>
        <p className="text-base text-zinc-600 max-w-4xl leading-relaxed">
          Statutory classification matrix evaluating the legal status of synthetic research peptides in the United Kingdom
          under the <strong className="text-zinc-950">Human Medicines Regulations 2012 (SI 2012/1916)</strong>, the{' '}
          <strong className="text-zinc-950">Misuse of Drugs Act 1971</strong>, the{' '}
          <strong className="text-zinc-950">Psychoactive Substances Act 2016</strong>, and the{' '}
          <strong className="text-zinc-950">World Anti-Doping Code (WADA)</strong>.
        </p>
      </div>

      {/* Statutory Guidance Alert Strip */}
      <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-3xl flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-amber-900">
          <div className="font-bold text-amber-950 font-mono text-sm">
            Statutory Demarcation: In Vitro Laboratory Reagents Only
          </div>
          <p className="leading-relaxed">
            In the United Kingdom, peptides that have not received an MHRA Marketing Authorisation are strictly classified
            as <em>unlicensed chemical substances</em>. It is lawful for commercial entities to supply and for laboratory researchers
            to purchase these reagents exclusively for in vitro academic, diagnostic, or assay calibration procedures. Supplying,
            dispensing, or advertising these substances for human administration or therapeutic consumption is a serious statutory offence.
          </p>
        </div>
      </div>

      {/* Comprehensive Statutory Matrix Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
              12-Compound UK Statutory Classification Matrix
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Cross-referenced against UK Primary Legislation &amp; WADA 2026 Prohibited List
            </p>
          </div>
          <span className="badge-emerald font-mono text-xs">Updated October 2026</span>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full text-left text-xs border-collapse min-w-[850px]">
            <thead className="bg-zinc-50 text-zinc-700 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Compound &amp; CAS</th>
                <th className="py-3.5 px-4 font-bold">Human Medicines Regs 2012</th>
                <th className="py-3.5 px-4 font-bold">Misuse of Drugs Act 1971</th>
                <th className="py-3.5 px-4 font-bold">Psychoactive Sub. 2016</th>
                <th className="py-3.5 px-4 font-bold">WADA Anti-Doping Status</th>
                <th className="py-3.5 px-4 font-bold">UK Laboratory Permissibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-mono">
              {LEGAL_STATUS_MATRIX.map((c) => (
                <tr key={c.slug} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-4 px-4 font-sans font-bold text-zinc-950">
                    <Link href={`/peptides/${c.slug}/`} className="text-indigo-800 hover:underline">
                      {c.name}
                    </Link>
                    <div className="text-[11px] font-mono text-zinc-600 font-normal">CAS {c.casNumber}</div>
                  </td>
                  <td className="py-4 px-4 text-zinc-700">
                    {c.ukHumanMedicinesRegs2012}
                  </td>
                  <td className="py-4 px-4 text-indigo-800 font-bold">
                    {c.misuseOfDrugsAct1971}
                  </td>
                  <td className="py-4 px-4 text-zinc-600">
                    {c.psychoactiveSubstancesAct2016}
                  </td>
                  <td className="py-4 px-4 text-amber-700 font-medium">
                    {c.wadaProhibitedList}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-indigo-800" />
                      <span>{c.permittedLabUse}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Statutory Jurisprudence & MHRA Compliance Deep Dive */}
      <section className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-indigo-800">
            <Scale className="w-4 h-4 text-indigo-800" />
            <span>UK Statutory Jurisprudence &amp; MHRA Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
            Regulation 46 vs Regulation 167 &amp; MHRA Guidance Note 8
          </h2>
          <p className="text-sm text-zinc-600 mt-1 max-w-4xl leading-relaxed">
            The legal demarcation governing research chemical distribution in the United Kingdom rests upon clear statutory boundaries
            established under the Human Medicines Regulations 2012 (SI 2012/1916) and European Case Law (C-27/08 and C-140/07).
          </p>
        </div>

        {/* 2-Column Comparative Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column A: Regulation 46 vs Regulation 167 */}
          <div className="card-inner-elevated p-6 space-y-4">
            <div className="flex items-center gap-2 text-zinc-950 font-bold font-mono text-sm border-b border-zinc-200/80 pb-2">
              <Building2 className="w-4 h-4 text-indigo-800" />
              <span>SI 2012/1916: Regulation 46 vs Regulation 167 Carve-Out</span>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-700">
              <p>
                <strong className="text-zinc-950">Regulation 46 (Prohibition):</strong> Mandates that no medicinal product may be placed on the UK market, distributed, or supplied without a valid Marketing Authorisation granted by the Licensing Authority (MHRA). Violation of Regulation 46 is a strict-liability criminal offense carrying statutory penalties including seizure and prosecution under Section 279.
              </p>
              <p>
                <strong className="text-zinc-950">Regulation 167 (Research &amp; Specials Exemption):</strong> Creates an explicit statutory exemption for the supply of unlicensed substances for scientific investigations, in-vitro assays, and laboratory control calibrations. Chemical reagents supplied with clear labeling (&quot;For In Vitro Laboratory Research Only&quot;), devoid of dosing guidelines or therapeutic marketing, fall squarely outside the remit of medicinal marketing authorizations.
              </p>
              <div className="bg-indigo-50 text-indigo-950 p-3 rounded-xl border border-indigo-200/60 font-mono text-[11px]">
                <strong>Compliance Precondition:</strong> Reagents must never be accompanied by human administration hardware (e.g. bacteriostatic injection kits, multi-dose delivery pens with dosage dials) to preserve Regulation 167 scientific status.
              </div>
            </div>
          </div>

          {/* Column B: MHRA Guidance Note 8 Two-Limbed Test */}
          <div className="card-inner-elevated p-6 space-y-4">
            <div className="flex items-center gap-2 text-zinc-950 font-bold font-mono text-sm border-b border-zinc-200/80 pb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>MHRA Guidance Note 8: The Dual-Limb Legal Test</span>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-700">
              <p>
                Under Section 2 of SI 2012/1916 and MHRA Guidance Note 8 (&quot;A guide to what is a medicinal product&quot;), a substance is legally classified as a medicine if it satisfies either of two distinct legal limbs:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <div className="font-bold text-zinc-950 font-mono text-[11px] text-blue-700">
                    Limb 1: The Presentation Limb
                  </div>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    A product is a medicine if presented as possessing properties for treating, preventing, or diagnosing disease. Advertising human health benefits, patient testimonials, or offering dosage advice legally categorizes the product under Limb 1, resulting in immediate MHRA enforcement notices.
                  </p>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <div className="font-bold text-zinc-950 font-mono text-[11px] text-purple-700">
                    Limb 2: The Functional Limb
                  </div>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    A product is a medicine if administered to human beings with a view to restoring, correcting, or modifying physiological functions. Because synthetic peptides possess cellular bioactivity, vendors avoid Limb 2 exclusively by strictly supplying them for non-human, in-vitro experimental systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ASA CAP Code 12.11 Advertising Standards Grid */}
        <div className="card-inner-elevated p-6 space-y-3 bg-zinc-50/70 border-zinc-200">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <div className="flex items-center gap-2 text-zinc-950 font-bold font-mono text-xs uppercase">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Advertising Standards Authority (ASA) CAP Code Rule 12.11 Compliance</span>
            </div>
            <span className="badge-amber text-[10px] py-0 px-2 font-mono">Mandatory Rule</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-700 leading-relaxed pt-1">
            <div className="space-y-1">
              <strong className="text-zinc-950 font-sans block">Direct-to-Consumer Prohibition</strong>
              <p>
                Rule 12.11 of the UK Code of Non-broadcast Advertising (CAP Code) strictly prohibits advertising prescription-only medicines or unlicensed medicinal products to the general public across search, social media, and digital banners.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-zinc-950 font-sans block">Non-Promotional Registry Standard</strong>
              <p>
                Scientific registries must present objective, chemical, and literature-indexed information without marketing hype, discount promotion codes, before-and-after imagery, or lifestyle enhancement claims.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-zinc-950 font-sans block">Enforcement Sanctions</strong>
              <p>
                Breaches of CAP Code 12.11 trigger referral to the MHRA Borderline Section, resulting in mandatory website takedowns, payment gateway revocations, and Trading Standards prosecutions under consumer protection laws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Pillar Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="card-inner-elevated p-6 space-y-3">
          <div className="font-mono font-bold text-xs uppercase text-zinc-700 flex items-center gap-2 border-b border-zinc-200/80 pb-2">
            <Scale className="w-4 h-4 text-indigo-800" />
            <span>Misuse of Drugs Act 1971</span>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            None of the 12 listed synthetic peptides are scheduled as controlled drugs under Schedules 1–5 of the
            Misuse of Drugs Regulations 2001. Unlike anabolic steroids (Class C Schedule 4 Part II), non-steroidal peptide
            reagents do not fall under controlled substance licensing mandates.
          </p>
        </div>

        <div className="card-inner-elevated p-6 space-y-3">
          <div className="font-mono font-bold text-xs uppercase text-zinc-700 flex items-center gap-2 border-b border-zinc-200/80 pb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Human Medicines Regs (SI 2012/1916)</span>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            Unlicensed medicinal substances may be lawfully transferred for laboratory research. However, selling or
            advertising them with medical claims or dosage guidance constitutes a breach of Regulation 46 and Regulation 279,
            subject to MHRA statutory enforcement and prosecution.
          </p>
        </div>

        <div className="card-inner-elevated p-6 space-y-3">
          <div className="font-mono font-bold text-xs uppercase text-zinc-700 flex items-center gap-2 border-b border-zinc-200/80 pb-2">
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>UK Customs &amp; Border Clearance</span>
          </div>
          <p className="text-zinc-600 leading-relaxed">
            UK Border Force permits importation of legitimate research chemical reagents under Commodity Code HS 2937.19.0000.
            Consignments must include commercial invoices declaring in vitro research use and matching Certificates of Analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
