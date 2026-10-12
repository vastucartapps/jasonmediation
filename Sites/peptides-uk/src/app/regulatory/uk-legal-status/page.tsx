import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { getAllCompounds } from '@/data/compounds';
import { Scale, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Legal Status & Schedules: Misuse of Drugs Act 1971',
  description:
    'Full statutory classification matrix for research peptides under the UK Misuse of Drugs Act 1971, Human Medicines Regulations 2012, and Home Office guidance.',
  alternates: {
    canonical: `${SITE_METADATA.url}/regulatory/uk-legal-status/`,
  },
};

export default function UkLegalStatusPage() {
  const compounds = getAllCompounds();

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/regulatory/" className="hover:text-emerald-700">UK Regulatory Hub</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">UK Legal Status Matrix</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
          <Scale className="w-3.5 h-3.5" />
          <span>Statutory Classification Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          UK Legal Status &amp; Schedules
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive statutory legal status matrix evaluating research peptide chemical sequences against
          the <strong className="text-slate-900">Misuse of Drugs Act 1971</strong>, Prescription Only Medicines (POM) orders,
          and laboratory research chemical exemptions.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Compound-by-Compound UK Statutory Classification
        </h2>

        <div className="w-full max-w-full overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Compound</th>
                <th className="py-3.5 px-4 font-bold">CAS Number</th>
                <th className="py-3.5 px-4 font-bold">Misuse of Drugs Act</th>
                <th className="py-3.5 px-4 font-bold">Human Meds Regs 2012</th>
                <th className="py-3.5 px-4 font-bold">Laboratory Research Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {compounds.map((c) => (
                <tr key={c.slug} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900">
                    <Link href={`/peptides/${c.slug}/`} className="text-emerald-700 hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{c.casNumber}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                    Non-Controlled
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Unlicensed Chemical
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Lawful In Vitro</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
