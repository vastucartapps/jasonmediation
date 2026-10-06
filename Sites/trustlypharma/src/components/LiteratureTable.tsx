'use client';

import { BookOpen, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { AcademicCitation } from '../types';

interface LiteratureTableProps {
  compoundName: string;
  citations: AcademicCitation[];
}

export function LiteratureTable({ compoundName, citations }: LiteratureTableProps) {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Peer-Reviewed Literature
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Academic Bibliography & Preclinical Studies for {compoundName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Primary academic indexing sourced from PubMed and peer-reviewed biotechnology journals documenting molecular mechanisms and in vitro cellular response.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-950/80 border border-white/5 text-xs font-mono text-slate-300 self-start sm:self-auto">
          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
          <span>{citations.length} Indexed Papers</span>
        </div>
      </div>

      <div className="space-y-4">
        {citations.map((cite, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-obsidian-900/60 border border-white/5 hover:border-cyan-500/20 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-white leading-snug">
                {cite.title}
              </h4>
              <div className="flex items-center gap-2 shrink-0">
                {cite.pubmedId && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${cite.pubmedId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors"
                  >
                    <span>PMID: {cite.pubmedId}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {cite.doi && (
                  <a
                    href={`https://doi.org/${cite.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 hover:text-white transition-colors"
                  >
                    <span>DOI</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-cyan-300 font-semibold">{cite.journal}</span>
              <span>Published: {cite.year}</span>
              <span className="text-slate-500 truncate max-w-md">Authors: {cite.authors}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5 text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-200 block text-[11px] font-mono uppercase tracking-wider mb-1">
                Documented Laboratory Observation:
              </strong>
              {cite.keyFindings}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
