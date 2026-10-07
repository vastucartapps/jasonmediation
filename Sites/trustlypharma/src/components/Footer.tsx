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
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Tools & Directory
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/vendors/" className="hover:text-amber-400 transition-colors font-semibold text-amber-300">
                  ★ Commercial Vendors & Partners
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-sky-400 transition-colors text-slate-300">
                  Dilution Calculator
                </Link>
              </li>
              <li>
                <Link href="/#evidence-map" className="hover:text-sky-400 transition-colors text-slate-300">
                  The Evidence Map
                </Link>
              </li>
              <li>
                <Link href="/#peptides-catalog" className="hover:text-sky-400 transition-colors text-slate-300">
                  Peptides A–Z Directory
                </Link>
              </li>
              <li>
                <Link href="/formats/" className="hover:text-sky-400 transition-colors text-slate-300">
                  Delivery Formats Standards
                </Link>
              </li>
              <li>
                <Link href="/regulatory/" className="hover:text-sky-400 transition-colors text-slate-300">
                  Regulatory Intelligence Hub
                </Link>
              </li>
              <li>
                <Link href="/regulatory/mhra-tracker/" className="hover:text-sky-400 transition-colors text-slate-300">
                  MHRA Enforcement Tracker
                </Link>
              </li>
              <li>
                <Link href="/regulatory/uk-legal-status/" className="hover:text-sky-400 transition-colors text-slate-300">
                  UK Legal Status Matrix
                </Link>
              </li>
              <li>
                <Link href="/safety/" className="hover:text-sky-400 transition-colors text-slate-300">
                  Research Safety Policy
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-sky-400 transition-colors text-slate-300">
                  Institutional Contact Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Pathways */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Research Pathways
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {RESEARCH_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}/`}
                    className="hover:text-sky-400 transition-colors text-slate-300 block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Vendor Network */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" /> Verified Partners
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm">
              {Object.values(SUPPLIER_PROFILES).map((sup) => (
                <li key={sup.id}>
                  <Link
                    href={`/vendors/${sup.id}/`}
                    className="hover:text-sky-300 transition-colors flex items-center justify-between group text-slate-300"
                  >
                    <span className="flex items-center gap-2.5">
                      {sup.faviconUrl && (
                        <img src={sup.faviconUrl} alt="" className="w-4 h-4 rounded object-contain shrink-0" />
                      )}
                      <span>{sup.name}</span>
                    </span>
                    <span className="text-xs text-sky-400 font-mono opacity-80 group-hover:opacity-100 font-semibold">Dossier →</span>
                  </Link>
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
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/about/" className="hover:text-slate-300 transition-colors">
              About & Methodology
            </Link>
            <Link href="/contact/" className="hover:text-slate-300 transition-colors">
              Institutional Contact
            </Link>
            <Link href="/safety/" className="hover:text-slate-300 transition-colors">
              Research Safety
            </Link>
            <Link href="/verification/" className="hover:text-slate-300 transition-colors">
              Verification Standards
            </Link>
            <Link href="/privacy/" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="hover:text-slate-300 transition-colors">
              Terms of Service
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
