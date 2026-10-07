'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
  compoundName: string;
}

export function BiochemicalFaqAccordion({ faqs, compoundName }: Props) {
  // First item open by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[rgba(141,168,195,0.2)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300 mb-2">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>BIOCHEMICAL REFERENCE Q&A</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Frequently Asked Chemical & Analytical Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Authoritative scientific clarifications regarding {compoundName} classification, molecular pathways, and laboratory protocols.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 self-start sm:self-auto shrink-0">
          {faqs.length} Curated Questions
        </span>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          const triggerId = `faq-trigger-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div
              key={idx}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-md ${
                isOpen
                  ? 'bg-[#061c42] border-sky-400/70 shadow-xl'
                  : 'bg-[#02102b] border-[rgba(141,168,195,0.2)] hover:border-sky-400/40'
              }`}
            >
              <button
                type="button"
                id={triggerId}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-start gap-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border transition-colors shadow-sm ${
                    isOpen
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-[#0a2347] text-sky-300 border-[rgba(141,168,195,0.25)]'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                </div>

                <div className={`p-2 rounded-xl border transition-all shrink-0 mt-0.5 ${
                  isOpen
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 rotate-180'
                    : 'bg-[#02102b] text-slate-400 border-[rgba(141,168,195,0.18)]'
                }`}>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-200 leading-relaxed border-t border-[rgba(141,168,195,0.15)] bg-[#03132e]/70"
                >
                  <p className="pt-2">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
