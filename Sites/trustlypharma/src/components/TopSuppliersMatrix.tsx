'use client';

import { useState } from 'react';
import { ExternalLink, Store, FileText, Truck, Beaker } from 'lucide-react';
import { SupplierProductLink, DeliveryFormatType } from '../types';
import { SUPPLIER_PROFILES } from '../data/suppliers';
import { FORMAT_PROFILES } from '../data/formats';

interface TopSuppliersMatrixProps {
  compoundName: string;
  supplierLinks: SupplierProductLink[];
}

export function TopSuppliersMatrix({ compoundName, supplierLinks }: TopSuppliersMatrixProps) {
  const [activeFormat, setActiveFormat] = useState<string>('all');

  const filteredLinks =
    activeFormat === 'all'
      ? supplierLinks
      : supplierLinks.filter((link) => link.format === activeFormat);

  const availableFormats = Array.from(new Set(supplierLinks.map((l) => l.format)));

  return (
    <div className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(141,168,195,0.18)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              Supplier Catalogues & Availability
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Distributor Catalogues for {compoundName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Independent supplier directory providing research-grade lyophilized vials, cartridges, sprays, and reconstitution media.
          </p>
        </div>

        {/* Format Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveFormat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFormat === 'all'
                ? 'bg-sky-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({supplierLinks.length})
          </button>
          {availableFormats.map((fmt) => {
            const count = supplierLinks.filter((l) => l.format === fmt).length;
            const profile = FORMAT_PROFILES[fmt as DeliveryFormatType];
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => setActiveFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  activeFormat === fmt
                    ? 'bg-sky-500 text-obsidian-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {profile?.label.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-3">
        {filteredLinks.map((link, idx) => {
          const profile = SUPPLIER_PROFILES[link.supplierId];
          const fmtProfile = FORMAT_PROFILES[link.format];

          return (
            <div
              key={`${link.supplierId}-${link.format}-${idx}`}
              className="rounded-2xl p-4 sm:p-5 bg-[#103059] border border-[rgba(141,168,195,0.2)] hover:border-sky-400 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Supplier Identity */}
              <div className="flex items-start sm:items-center gap-4 min-w-[240px]">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#02102b] to-[#0a2149] border border-[rgba(141,168,195,0.3)] flex items-center justify-center font-bold text-white font-mono text-sm shrink-0">
                  {profile ? profile.name.slice(0, 2).toUpperCase() : 'TP'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-base">
                      {link.supplierName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-[#02102b] px-2 py-0.5 rounded border border-[rgba(141,168,195,0.15)]">
                      {profile?.domain}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {link.linkType === 'category' ? (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/40">
                        Category Hub (All Formats)
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#02102b] text-sky-300 border border-[rgba(141,168,195,0.2)]">
                        {fmtProfile ? fmtProfile.label : link.format}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-mono">
                      {link.dispatchRegion}
                    </span>
                  </div>
                  {link.notes && (
                    <p className="text-[11px] text-slate-300/90 mt-1.5 max-w-sm line-clamp-1">
                      {link.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Middle Column: Catalog Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs flex-1 border-y lg:border-y-0 lg:border-x border-[rgba(141,168,195,0.18)] py-3 lg:py-0 lg:px-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Catalog Purity Spec
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {link.puritySpecification}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Product Format
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-sky-400" /> {link.linkType === 'category' ? 'All Available Formats' : (fmtProfile ? fmtProfile.label : link.format)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Dispatch Region
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] flex items-center gap-1">
                    <Truck className="w-3 h-3 text-slate-400" /> {link.dispatchRegion}
                  </span>
                </div>
              </div>

              {/* Right Column: Outbound Store Action */}
              <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs gradient-bg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <span>{link.linkType === 'category' ? 'Browse Supplier Hub' : 'View Reagent Batch'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
