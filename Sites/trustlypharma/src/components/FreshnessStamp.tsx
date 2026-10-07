import Link from 'next/link';
import { Calendar, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export function FreshnessStamp() {
  return (
    <section className="border-t border-b border-[rgba(141,168,195,0.18)] bg-[#010b1d] py-10">
      <div className="container-wide">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#031535] via-[#051c46] to-[#02102b] border border-sky-500/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/35">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>DATABASE AUDIT STAMP: OCTOBER 2026</span>
              </span>
              <span className="text-xs font-mono text-slate-300 bg-[#02102b] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
                Methodology Version 3.4
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Independent Peer-Review & Analytical Database Governance
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Chemical molecular entries, PubChem CIDs, CAS registries, and PubMed PMIDs are audited quarterly against official government and peer-reviewed biotechnology databases. Commercial partners are verified for published lot-specific HPLC/MS documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/verification/"
              className="px-5 py-3 rounded-xl bg-[#02102b] hover:bg-[#071d42] border border-[rgba(141,168,195,0.25)] text-xs sm:text-sm font-mono text-slate-200 hover:text-white transition-colors"
            >
              Review Audit Criteria
            </Link>
            <Link
              href="/regulatory/mhra-tracker/"
              className="gradient-bg px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 shadow-md hover:shadow-xl transition-all"
            >
              MHRA Government Register →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
