import Link from 'next/link';
import { Beaker, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { SUPPLIER_PROFILES } from '../data/suppliers';

export function Footer() {
  return (
    <footer className="border-t border-[rgba(141,168,195,0.18)] bg-[#020e24] text-slate-400">
      {/* Main Footer Links */}
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                <Beaker className="w-4 h-4 text-sky-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                TRUSTLY<span className="text-sky-400">PHARMA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              The independent peptide chemical index and analytical sequence catalog. Curated molecular profiles and peer-reviewed citations for laboratory research and analytical chemistry.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> HPLC Purity Assayed
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> ESI-MS Documented
              </span>
            </div>
          </div>

          {/* Core Tools & Index */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3">
              Tools & Directory
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/suppliers/" className="hover:text-amber-400 transition-colors font-semibold text-amber-300">
                  ★ Commercial Sourcing Outlets
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-sky-400 transition-colors">
                  Dilution Calculator
                </Link>
              </li>
              <li>
                <Link href="/#evidence-map" className="hover:text-sky-400 transition-colors">
                  The Evidence Map
                </Link>
              </li>
              <li>
                <Link href="/#peptides-catalog" className="hover:text-sky-400 transition-colors">
                  Peptides A–Z Directory
                </Link>
              </li>
              <li>
                <Link href="/formats/" className="hover:text-sky-400 transition-colors">
                  Delivery Formats Standards
                </Link>
              </li>
            </ul>
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
                    href={`/category/${cat.slug}/`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Store Network */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-3 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Commercial Stores
            </h5>
            <ul className="space-y-2 text-xs">
              {Object.values(SUPPLIER_PROFILES).map((sup) => (
                <li key={sup.id}>
                  <a
                    href={sup.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-300 transition-colors flex items-center gap-1 group text-slate-300"
                  >
                    <span>{sup.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-600 group-hover:text-sky-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(141,168,195,0.15)] flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Trustly Pharma. All rights reserved. Registered UK Biotech Reference Directory.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about/" className="hover:text-slate-300 transition-colors">
              About & Methodology
            </Link>
            <Link href="/verification/" className="hover:text-slate-300 transition-colors">
              Verification Standards
            </Link>
            <a href="/sitemap.xml" className="hover:text-slate-300 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
