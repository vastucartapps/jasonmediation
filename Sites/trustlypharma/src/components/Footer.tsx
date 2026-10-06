import Link from 'next/link';
import { Shield, AlertTriangle, ExternalLink, Beaker, CheckCircle2 } from 'lucide-react';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { SUPPLIER_PROFILES } from '../data/suppliers';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-obsidian-950 text-slate-400">
      {/* Top Academic / Compliance Warning Banner */}
      <div className="border-b border-white/5 bg-amber-500/[0.03] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-4 p-5 rounded-xl border border-amber-500/20 bg-obsidian-900/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 text-xs leading-relaxed">
              <h4 className="text-sm font-semibold text-amber-300 font-mono tracking-wide uppercase">
                Enterprise Scientific Content Compliance & Research-Use-Only (RUO) Notice
              </h4>
              <p className="text-slate-300">
                All chemical nomenclature, molecular formulas, amino acid sequences, in vitro mechanism reviews, and third-party supplier links presented on <strong className="text-white">Trustly Pharma</strong> are curated strictly for accredited scientific researchers, university institutions, and in vitro laboratory analysis. None of the compounds indexed on this domain are intended for human, clinical, veterinary, or agricultural consumption.
              </p>
              <p className="text-slate-400">
                No statement on this portal has been evaluated by the UK Medicines and Healthcare products Regulatory Agency (MHRA), the European Medicines Agency (EMA), or the United States Food and Drug Administration (FDA). Trustly Pharma acts as an independent scientific reference encyclopedia and does not process payments, dispense pharmaceuticals, or conduct retail transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Beaker className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                TRUSTLY<span className="text-cyan-400">PHARMA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Worldwide scientific peptide index, chemical sequence encyclopedia, and verified supplier comparison matrix. Built to support laboratory standardisation through HPLC assay transparency, molecular verification, and rigorous academic citation.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> HPLC Purity Assayed
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> ESI-MS Verified
              </span>
            </div>
          </div>

          {/* Research Pathways */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
              Research Pathways
            </h5>
            <ul className="space-y-2 text-xs">
              {RESEARCH_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats & Handling */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
              Delivery Formats
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/formats#vial" className="hover:text-cyan-400 transition-colors">
                  Lyophilized Powder Vials
                </Link>
              </li>
              <li>
                <Link href="/formats#pen" className="hover:text-cyan-400 transition-colors">
                  Pre-Mixed Cartridge Pens
                </Link>
              </li>
              <li>
                <Link href="/formats#spray" className="hover:text-cyan-400 transition-colors">
                  Metered Intranasal Sprays
                </Link>
              </li>
              <li>
                <Link href="/formats#stack" className="hover:text-cyan-400 transition-colors">
                  Synergistic Research Blends
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Supplier Network */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Verified Stores
            </h5>
            <ul className="space-y-2 text-xs">
              {Object.values(SUPPLIER_PROFILES).map((sup) => (
                <li key={sup.id}>
                  <a
                    href={sup.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{sup.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-600 group-hover:text-emerald-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Trustly Pharma. All rights reserved. Registered UK Biotech Reference Portal.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/compliance" className="hover:text-slate-300 transition-colors">
              Editorial Compliance Policy
            </Link>
            <Link href="/verification" className="hover:text-slate-300 transition-colors">
              Supplier Verification Standard
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
