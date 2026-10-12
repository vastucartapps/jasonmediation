'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Scale, FlaskConical, ShieldCheck } from 'lucide-react';

export interface CompoundFaq {
  question: string;
  answer: string;
  category?: string;
  citation?: string;
}

interface CompoundFaqSectionProps {
  compoundName: string;
  faqs: CompoundFaq[];
}

export function CompoundFaqSection({ compoundName, faqs }: CompoundFaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#071938] rounded-3xl border border-[rgba(141,168,195,0.25)] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(141,168,195,0.2)] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300 bg-[#0a2347] px-3 py-1 rounded-full border border-sky-400/35 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>BIOCHEMICAL &amp; REGULATORY Q&amp;A</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Curated Scientific Q&amp;A for {compoundName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Authoritative pre-clinical, analytical, and statutory handling guidelines for laboratory researchers.
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-500/30 self-start sm:self-auto shrink-0">
          {faqs.length} Curated Questions
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const triggerId = `compound-faq-trig-${idx}`;
          const panelId = `compound-faq-panel-${idx}`;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#061c42] border-sky-400/60 shadow-xl'
                  : 'bg-[#041535] border-[rgba(141,168,195,0.2)] hover:border-sky-400/30'
              }`}
            >
              <button
                type="button"
                id={triggerId}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border transition-colors ${
                      isOpen
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-[#0a2347] text-sky-300 border-[rgba(141,168,195,0.25)]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white leading-snug block">
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-lg border transition-all shrink-0 mt-0.5 ${
                    isOpen
                      ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 rotate-180'
                      : 'bg-[#020e24] text-slate-400 border-[rgba(141,168,195,0.2)]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-[rgba(141,168,195,0.15)] bg-[#03132e]/80 space-y-3"
                >
                  <p className="pt-1">{faq.answer}</p>
                  {faq.citation && (
                    <div className="p-2.5 rounded-xl bg-[#0a2347] border border-sky-400/25 flex items-start gap-2 text-xs font-mono text-sky-200">
                      <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Citation Benchmark: </strong>
                        <span>{faq.citation}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
