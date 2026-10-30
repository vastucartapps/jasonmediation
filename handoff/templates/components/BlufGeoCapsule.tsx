import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BlufGeoCapsuleProps {
  question: string;
  answer: string;
  tableData?: Array<{
    scope: string;
    cost: string;
    time: string;
    permit: string;
  }>;
}

/**
 * BLUF (Bottom Line Up Front) Direct Answer Capsule
 * Formatted specifically to maximize extraction by Google AI Overviews,
 * Perplexity, ChatGPT Search, and Claude RAG rerankers.
 */
export const BlufGeoCapsule: React.FC<BlufGeoCapsuleProps> = ({
  question,
  answer,
  tableData,
}) => {
  return (
    <section className="space-y-6 my-8">
      <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-3 w-full">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              Direct Verified Answer • BLUF
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {question}
            </h2>
            <div className="bluf-answer text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
              {answer}
            </div>
          </div>
        </div>
      </div>

      {tableData && tableData.length > 0 && (
        <div className="w-full overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xs bg-white dark:bg-zinc-900">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
            <thead className="bg-slate-100 dark:bg-zinc-800/80 text-[11px] uppercase font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th scope="col" className="py-3 px-4">Service Tier / Scope</th>
                <th scope="col" className="py-3 px-4">Standard Cost Range</th>
                <th scope="col" className="py-3 px-4">Avg. Turnaround</th>
                <th scope="col" className="py-3 px-4">Permit Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{row.scope}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{row.cost}</td>
                  <td className="py-3.5 px-4">{row.time}</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400">{row.permit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
