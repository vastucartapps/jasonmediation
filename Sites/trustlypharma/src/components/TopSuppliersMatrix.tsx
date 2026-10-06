'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Store, FileText, Truck, Beaker, CheckCircle2 } from 'lucide-react';
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
    <div id="vendor-catalogues" className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(141,168,195,0.2)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
              Verified Reagent Partners & Vendors
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Partner & Vendor Catalogues for {compoundName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl font-medium">
            Independent partner directory providing research-grade lyophilized vials, cartridges, atomizers, and reconstitution solvents.
          </p>
        </div>

        {/* Format Filter Tabs - Clean wrapping without ugly horizontal scrollbars */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.22)] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveFormat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeFormat === 'all'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            All Formats ({supplierLinks.length})
          </button>
          {availableFormats.map((fmt) => {
            const count = supplierLinks.filter((l) => l.format === fmt).length;
            const profile = FORMAT_PROFILES[fmt as DeliveryFormatType];
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => setActiveFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  activeFormat === fmt
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {profile?.label.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-3.5">
        {filteredLinks.map((link, idx) => {
          const profile = SUPPLIER_PROFILES[link.supplierId];
          const fmtProfile = FORMAT_PROFILES[link.format];

          return (
            <div
              key={`${link.supplierId}-${link.format}-${idx}`}
              className="rounded-2xl p-5 bg-[#061c42] border border-[rgba(141,168,195,0.22)] hover:border-sky-400 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-md"
            >
              {/* Left Column: Vendor Identity */}
              <div className="flex items-start sm:items-center gap-4 min-w-[280px]">
                {profile?.logoUrl ? (
                  <div className="h-12 w-28 px-2 py-1 rounded-xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
                    <img
                      src={profile.logoUrl}
                      alt={`${link.supplierName} logo`}
                      className="max-h-8 max-w-[100px] object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#02102b] to-[#0a2149] border border-[rgba(141,168,195,0.3)] flex items-center justify-center font-bold text-white font-mono text-base shrink-0 shadow-inner">
                    {profile ? profile.name.slice(0, 2).toUpperCase() : 'TP'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      {link.supplierName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 bg-[#02102b] px-2 py-0.5 rounded border border-[rgba(141,168,195,0.2)]">
                      {profile?.domain}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mt-1">
                    <span className="text-sky-300 font-semibold">
                      {link.linkType === 'category' ? 'Category Hub (All Formats)' : fmtProfile?.label}
                    </span>
                    <span>·</span>
                    <span>{link.dispatchRegion}</span>
                  </div>

                  {link.notes && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {link.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Middle Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-8 py-2 lg:py-0 border-y lg:border-y-0 border-slate-700/60 lg:border-l lg:border-r border-[rgba(141,168,195,0.18)] lg:px-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Catalog Purity Spec
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {link.puritySpecification}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Product Format
                  </span>
                  <span className="text-xs font-mono text-slate-200 block mt-0.5 font-medium">
                    {link.linkType === 'category' ? 'All Available Formats' : fmtProfile?.label}
                  </span>
                </div>

                <div className="hidden sm:block">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Dispatch Region
                  </span>
                  <span className="text-xs font-mono text-slate-200 block mt-0.5">
                    {link.dispatchRegion}
                  </span>
                </div>
              </div>

              {/* Right Column: CTA Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/vendors/${link.supplierId}/`}
                  className="px-4 py-2.5 rounded-xl bg-[#02102b] hover:bg-[#0a2347] border border-[rgba(141,168,195,0.25)] text-xs font-mono font-semibold text-sky-300 hover:text-white transition-colors"
                >
                  Vendor Profile
                </Link>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-bg px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 inline-flex items-center gap-1.5 shadow-md hover:shadow-xl transition-all"
                >
                  <span>{link.linkType === 'category' ? 'Browse Partner Hub' : 'View Reagent Batch'}</span>
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
