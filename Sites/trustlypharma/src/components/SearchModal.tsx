'use client';

import { useState } from 'react';
import Link from 'next/link';
import { searchTabs } from '../data/site';
import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { SUPPLIER_PROFILES } from '../data/suppliers';
import { Search, X, ArrowRight, ShieldCheck, Beaker, Store } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [tab, setTab] = useState<string>('peptides');
  const [query, setQuery] = useState('');

  if (!open) return null;

  const filteredPeptides = PEPTIDE_COMPOUNDS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.casNumber.includes(query) ||
    p.systematicName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSellers = Object.values(SUPPLIER_PROFILES).filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.domain.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search Trustly Pharma"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="container-wide pt-12 md:pt-20 pb-12">
        <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 card-paper shadow-2xl space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-400">
                Independent Search Portal
              </p>
              <h3 className="text-xl font-bold text-white mt-1">Search Trustly Pharma</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Search synthetic chemical compounds, CAS numbers, or commercial retailer COA ratings.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-2xl leading-none"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Category Tabs */}
          <div className="flex gap-2 border-b border-slate-700/60 pb-2">
            {searchTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  tab === t.id
                    ? 'bg-sky-500 text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type peptide name, CAS number, or seller (e.g. BPC-157, 137525-51-0)..."
              className="w-full bg-obsidian-950 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
              autoFocus
            />
          </div>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono">Popular:</span>
            {searchTabs
              .find((t) => t.id === tab)
              ?.pills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setQuery(pill)}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-obsidian-850 border border-slate-700 text-slate-300 hover:border-sky-400 hover:text-sky-300 transition-colors"
                >
                  {pill}
                </button>
              ))}
          </div>

          {/* Dynamic Results */}
          <div className="max-h-72 overflow-y-auto space-y-2 pt-2 border-t border-slate-800">
            {tab === 'peptides' && (
              <div className="space-y-2">
                {filteredPeptides.slice(0, 6).map((compound) => (
                  <Link
                    key={compound.slug}
                    href={`/peptides/${compound.slug}/`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <Beaker className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                          {compound.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          CAS: {compound.casNumber} · {compound.categoryName}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}

            {tab === 'sellers' && (
              <div className="space-y-2">
                {filteredSellers.map((seller) => (
                  <a
                    key={seller.id}
                    href={seller.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0a2149] hover:bg-[#103059] border border-[rgba(141,168,195,0.2)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                          {seller.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {seller.domain}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Est. {seller.establishedYear}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
