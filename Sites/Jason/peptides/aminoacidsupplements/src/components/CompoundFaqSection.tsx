'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Scale } from 'lucide-react';

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
    <section id="faq" className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 md:p-10 shadow-am-card space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-700" />
            <span>BIOCHEMICAL &amp; REGULATORY Q&amp;A</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">
            Curated Scientific Q&amp;A for {compoundName}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-700 mt-1">
            Authoritative pre-clinical, analytical, and statutory handling guidelines for laboratory researchers.
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-orange-900 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 self-start sm:self-auto shrink-0">
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
                  ? 'bg-indigo-50/40 border-indigo-300 shadow-xs'
                  : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-2xs'
              }`}
            >
              <button
                id={triggerId}
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
              >
                <span className="font-bold text-sm sm:text-base text-zinc-950 tracking-tight">
                  {faq.question}
                </span>
                <span className="shrink-0 p-1 rounded-lg bg-zinc-100 text-zinc-700">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-700" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="px-4 sm:px-5 pb-5 pt-1 border-t border-zinc-100 space-y-3"
                >
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.citation && (
                    <div className="p-3 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-700 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-700 shrink-0" />
                      <span>
                        <strong className="text-zinc-950">Statutory / Academic Citation:</strong> {faq.citation}
                      </span>
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
