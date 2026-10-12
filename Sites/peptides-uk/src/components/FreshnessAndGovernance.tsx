import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, Microscope, Building2, CheckCircle2, Clock, Calendar, FileText } from 'lucide-react';

export function FreshnessAndGovernance() {
  const columns = [
    {
      heading: 'OECD GLP Compliance',
      text: 'Every monograph entry adheres to the OECD Principles of Good Laboratory Practice (ENV/MC/CHEM(98)17). Reconstitution volumes and physicochemical constants are verified against British Pharmacopoeia monographs.',
      icon: Microscope,
    },
    {
      heading: 'Statutory UK REACH Verification',
      text: 'All chemical compounds are indexed in accordance with the UK REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) regulations under the Health and Safety Executive (HSE).',
      icon: Scale,
    },
    {
      heading: 'Independent Audit Integrity',
      text: 'The Peptides UK Registry is editorially independent and does not manufacture, bottle, or dispense synthetic chemicals. Vendor evaluations are based on verified ISO/IEC 17025 laboratory test certificates.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="container-wide space-y-8 scroll-mt-20" id="governance" aria-label="Scientific Governance & Audit Trail">
      {/* Freshness & Audit Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900">Registry Version:</span>
            <span>2026.10-UK.ENG</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Latest Statutory Audit: October 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>12 Verified Chemical Dossiers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-700 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Continuous Automated Integrity Check</span>
        </div>
      </div>

      {/* Governance 3-Column Card */}
      <div className="clinical-card p-8 sm:p-10 bg-white border border-slate-200/90 shadow-xs space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-mono font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>SCIENTIFIC INTEGRITY &amp; GOVERNANCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Chemical Repository Governance &amp; Standards
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Peptides UK Registry is dedicated to providing open, rigorous, and legally compliant biochemical reference data for British researchers, preventing the proliferation of unsubstantiated clinical claims.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.heading}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-emerald-500/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {c.heading}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Peptides UK Laboratory Registry · London, England · Non-Clinical In Vitro Chemical Directory</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>OECD GLP &amp; UK REACH Information Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
