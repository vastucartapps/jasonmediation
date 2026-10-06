'use client';

import { useState } from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, FileText, Globe, Truck, Beaker } from 'lucide-react';
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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Verified Partner Network
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Certified Laboratory Suppliers for {compoundName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Direct laboratory reference links to independently audited chemical vendors offering batch HPLC analytical assays and verified cold-chain dispatch for in vitro experimentation.
          </p>
        </div>

        {/* Format Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-950/80 border border-white/5 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveFormat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeFormat === 'all'
                ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-glow-cyan/50'
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
                    ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-glow-cyan/50'
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
              className="glass-panel-hover rounded-2xl p-4 sm:p-5 border border-white/5 bg-obsidian-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Supplier & Delivery Format */}
              <div className="flex items-start sm:items-center gap-4 min-w-[260px]">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-obsidian-700 to-obsidian-950 border border-white/10 flex items-center justify-center font-bold text-white font-mono text-sm shadow-md shrink-0">
                  {profile ? profile.name.slice(0, 2).toUpperCase() : 'TP'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-base">
                      {link.supplierName}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Audited
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                        fmtProfile ? fmtProfile.badgeColor : 'border-slate-700 text-slate-300'
                      }`}
                    >
                      {fmtProfile ? fmtProfile.label : link.format}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {link.dispatchRegion}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Analytical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs flex-1 border-y lg:border-y-0 lg:border-x border-white/5 py-3 lg:py-0 lg:px-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Purity Assay
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {link.puritySpecification}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Testing Protocol
                  </span>
                  <span className="text-slate-300 font-mono text-[11px] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-cyan-400" /> HPLC & MS COA
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Logistics / Handling
                  </span>
                  <span className="text-slate-300 font-mono text-[11px] flex items-center gap-1">
                    <Truck className="w-3 h-3 text-slate-400" /> Cold-Chain Tracked
                  </span>
                </div>
              </div>

              {/* Right Column: Outbound Action */}
              <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
                <div className="text-right hidden sm:block lg:hidden xl:block">
                  <span className="text-[10px] font-mono text-slate-500 block">
                    Batch Testing
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Third-Party Assayed
                  </span>
                </div>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs text-obsidian-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all font-mono font-bold shadow-glow-cyan/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Access Certified Batch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Note */}
      <div className="p-4 rounded-xl bg-obsidian-950/60 border border-white/5 text-[11px] text-slate-400 leading-relaxed flex items-center gap-2">
        <Beaker className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Batch Purity Auditing:</strong> Trustly Pharma verifies analytical documentation independently. All external store links connect directly to vendor certificates of analysis (COAs) and reference batch inventories.
        </span>
      </div>
    </div>
  );
}
