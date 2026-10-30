'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchTabs } from '../data/site';
import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { getAllVendors } from '../data/suppliers';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { Search, X, ArrowRight, Beaker, Building2, FlaskConical, ExternalLink, Dna, ShieldCheck } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [tab, setTab] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input whenever modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [open]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  // 1. Filtered Peptides
  const filteredPeptides = PEPTIDE_COMPOUNDS.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.casNumber.toLowerCase().includes(q) ||
      p.systematicName.toLowerCase().includes(q) ||
      p.molecularFormula.toLowerCase().includes(q) ||
      (p.pubchemCid && p.pubchemCid.toLowerCase().includes(q)) ||
      p.categoryName.toLowerCase().includes(q)
    );
  });

  // 2. Filtered Research Categories
  const filteredCategories = RESEARCH_CATEGORIES.filter((c) => {
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.headline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.signalingFocus.toLowerCase().includes(q)
    );
  });

  // 3. Filtered Commercial Vendors
  const allVendors = getAllVendors();
  const filteredVendors = allVendors.filter((v) => {
    if (!q) return true;
    return (
      v.name.toLowerCase().includes(q) ||
      v.domain.toLowerCase().includes(q) ||
      v.productCatalogSummary.toLowerCase().includes(q) ||
      v.headquarters.toLowerCase().includes(q)
    );
  });

  // Compile all results for unified "all" tab
  const totalCount =
    (tab === 'all' || tab === 'peptides' ? filteredPeptides.length : 0) +
    (tab === 'all' || tab === 'categories' ? filteredCategories.length : 0) +
    (tab === 'all' || tab === 'vendors' ? filteredVendors.length : 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-12"
      role="dialog"
      aria-modal="true"
      aria-label="Global Chemical Registry & Compound Search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.35)] shadow-2xl space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-950/70 px-2.5 py-1 rounded-md border border-sky-500/30">
                Institutional Chemical Directory
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                PubMed · PubChem · CAS Registry
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              Search Compounds, CAS & Laboratory Vendors
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Query synthetic chemical profiles, PubChem CIDs, empirical formulas, signaling pathways, or verified reagent partners.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors flex-shrink-0"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-700/60 pb-3">
          {searchTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setSelectedIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                tab === t.id
                  ? 'bg-sky-500 text-obsidian-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 bg-obsidian-900/60 hover:bg-obsidian-800 border border-slate-700/60 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-5 h-5 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            value={query}
            aria-label="Search peptides by compound name, CAS number, or formula"
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type compound name, CAS number, formula, or vendor (e.g. BPC-157, 137525-51-0, C62H98N16O22)..."
            className="w-full bg-[#02102b] border border-[rgba(141,168,195,0.35)] rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 font-mono transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Filter Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-mono font-semibold">Quick Filters:</span>
          {searchTabs
            .find((t) => t.id === tab)
            ?.pills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setQuery(pill)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#03132e] border border-[rgba(141,168,195,0.25)] text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-[#071f48] transition-all"
              >
                {pill}
              </button>
            ))}
        </div>

        {/* Results Stream */}
        <div className="max-h-[380px] overflow-y-auto space-y-3 pt-3 border-t border-slate-800 pr-1">
          {totalCount === 0 && (
            <div className="text-center py-10 space-y-2">
              <FlaskConical className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No matching scientific records found</p>
              <p className="text-xs text-slate-400">
                Try searching by common acronym (e.g. BPC-157), CAS registry number, or empirical formula.
              </p>
            </div>
          )}

          {/* Section 1: Chemical Compounds */}
          {(tab === 'all' || tab === 'peptides') && filteredPeptides.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 px-1">
                <span>Peptide Compounds ({filteredPeptides.length})</span>
                <span>PubChem & CAS Indexed</span>
              </div>
              {filteredPeptides.slice(0, tab === 'all' ? 4 : 12).map((compound) => (
                <Link
                  key={compound.slug}
                  href={`/peptides/${compound.slug}/`}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#03132e] hover:bg-[#071f48] border border-[rgba(141,168,195,0.22)] hover:border-sky-400/60 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-400 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Beaker className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                          {compound.name}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {compound.molecularWeight}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>CAS: <strong className="text-slate-100">{compound.casNumber}</strong></span>
                        <span>Formula: <strong className="text-emerald-300">{compound.molecularFormula}</strong></span>
                        <span className="text-amber-300 font-sans">{compound.categoryName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="hidden sm:inline-block text-xs font-mono text-sky-400 group-hover:underline">
                      View Dossier
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Section 2: Research Categories & Signaling Pathways */}
          {(tab === 'all' || tab === 'categories') && filteredCategories.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 px-1">
                <span>Research Pathways ({filteredCategories.length})</span>
                <span>Biochemical Classification</span>
              </div>
              {filteredCategories.slice(0, tab === 'all' ? 2 : 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/#categories`}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#03132e] hover:bg-[#071f48] border border-[rgba(141,168,195,0.22)] hover:border-amber-400/60 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Dna className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {cat.name}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                        {cat.headline}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all ml-3 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}

          {/* Section 3: Commercial Laboratory Vendors & Partners */}
          {(tab === 'all' || tab === 'vendors') && filteredVendors.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 px-1">
                <span>Commercial Laboratory Vendors & Partners ({filteredVendors.length})</span>
                <span>Third-Party Reagent Catalogues</span>
              </div>
              {filteredVendors.slice(0, tab === 'all' ? 3 : 8).map((vendor) => (
                <Link
                  key={vendor.id}
                  href={`/vendors/${vendor.id}/`}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#03132e] hover:bg-[#071f48] border border-[rgba(141,168,195,0.22)] hover:border-emerald-400/60 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {vendor.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {vendor.domain}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-300 mt-1 flex flex-wrap items-center gap-x-3">
                        <span>HQ: {vendor.headquarters}</span>
                        <span>Est. {vendor.establishedYear}</span>
                        <span className="text-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          HPLC/MS Batch Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="hidden sm:inline-block text-xs font-mono text-emerald-400 group-hover:underline">
                      Vendor Profile
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Hotkey Hints */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">ESC</kbd> to close
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">TAB</kbd> to switch category
            </span>
          </div>
          <span className="text-slate-400">
            Strictly Reagent & Analytical Laboratory Profiles
          </span>
        </div>
      </div>
    </div>
  );
}
