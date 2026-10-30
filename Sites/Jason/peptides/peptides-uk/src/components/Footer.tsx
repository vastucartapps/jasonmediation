import React from 'react';
import Link from 'next/link';
import { FOOTER_SECTIONS, SITE_METADATA } from '@/data/site';
import { ShieldAlert, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="container-wide space-y-12">
        {/* Statutory Regulatory Banner */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>United Kingdom Statutory Compliance &amp; Regulatory Notice</span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            All synthetic chemical sequences, lyophilized research vials, and laboratory reagents indexed on{' '}
            <strong className="text-white">Peptides-UK.org</strong> are intended exclusively for{' '}
            <span className="text-emerald-400 font-semibold">in vitro academic, scientific, and laboratory research</span>.
            Under the <strong className="text-white">UK Human Medicines Regulations 2012 (SI 2012/1916)</strong> and the{' '}
            <strong className="text-white">Misuse of Drugs Act 1971</strong>, these substances are not licensed medicinal
            products or drugs, lack Marketing Authorisation (MA), and are strictly{' '}
            <span className="text-amber-300 font-semibold">prohibited from human or animal administration, diagnostic use, or therapeutic application</span>.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>MHRA Laboratory Reagent Standard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>COSHH Controlled Analytical Reference</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ISO 17025 Third-Party Tested HPLC Assays</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                {section.title}
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Commercial Supplier Registry Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-300 font-mono">
          <div>
            <span className="text-slate-200 font-bold">Verified UK Commercial Partners:</span> PharmaGrade Store &middot; Direct Peptides &middot; Direct Sarms &middot; Peptide Works &middot; PharmaLab Global
          </div>
          <div className="flex items-center gap-4">
            <Link href="/vendors/" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              Compare All 5 Suppliers →
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Discovery Footnote */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Peptides-UK.org. All rights reserved. British Clinical Research Registry.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/sitemap/" className="hover:text-slate-300">
              HTML Sitemap
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              XML Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-300">
              robots.txt
            </Link>
            <Link href="/llms.txt" className="hover:text-slate-300 text-emerald-400 font-semibold">
              llms.txt
            </Link>
            <Link href="/privacy/" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms/" className="hover:text-slate-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
