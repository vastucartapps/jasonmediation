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
    <section id="faq" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-xs space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-300 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>BIOCHEMICAL &amp; REGULATORY Q&amp;A</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Scientific Q&amp;A for {compoundName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Authoritative pre-clinical, analytical, and statutory handling guidelines for laboratory researchers.
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 self-start sm:self-auto shrink-0">
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
                  ? 'bg-sky-50/40 border-sky-300 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
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
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug block">
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-lg border transition-all shrink-0 mt-0.5 ${
                    isOpen
                      ? 'bg-sky-100 text-sky-800 border-sky-200 rotate-180'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
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
                  className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-white space-y-3"
                >
                  <p className="pt-1">{faq.answer}</p>
                  {faq.citation && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs font-mono text-emerald-900">
                      <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-950">Citation Benchmark: </strong>
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
