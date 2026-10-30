import React from 'react';
import Link from 'next/link';
import { FOOTER_SECTIONS, SITE_METADATA } from '@/data/site';
import { ShieldAlert, FileText, CheckCircle2, Dna, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#100e17] text-zinc-300 border-t border-zinc-800 pt-20 pb-14 mt-24">
      <div className="container-ultra-wide space-y-16">
        {/* Statutory Regulatory Banner */}
        <div className="bg-[#181524] border border-zinc-700/80 rounded-2xl p-6 md:p-10 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <span>United Kingdom Statutory Compliance &amp; Chemical Research Mandate</span>
          </div>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            All synthetic amino acid sequences, lyophilized reference vials, and analytical chemical reagents indexed on{' '}
            <strong className="text-white">AminoAcidSupplements.co</strong> are intended exclusively for{' '}
            <span className="text-indigo-400 font-semibold">in vitro academic, scientific, and laboratory research</span>.
            Under the <strong className="text-white">UK Human Medicines Regulations 2012 (SI 2012/1916)</strong> and the{' '}
            <strong className="text-white">Misuse of Drugs Act 1971</strong>, these compounds lack Marketing Authorisation (MA),
            are unlicensed experimental substances, and are strictly{' '}
            <span className="text-orange-300 font-semibold">prohibited from human or animal ingestion, clinical administration, or diagnostic use</span>.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>MHRA In Vitro Reagent Standard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>COSHH Controlled Analytical Reference</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>ISO 17025 Third-Party Tested HPLC Assays</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid (Ultra-Wide 4 Columns + Newsletter) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Intro Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-700 flex items-center justify-center text-white">
                <Dna className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">AminoAcidSupplements</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Global chemical registry indexing synthetic amino acid chains, chemical formulas, PubChem specifications, and verified laboratory supplier audits.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-300">
              Registered Laboratory Desk<br />
              London &bull; Cambridge &bull; Oxford
            </div>
          </div>

          {/* Section Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                {section.title}
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-orange-400 transition-colors flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Utility Strip */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} AminoAcidSupplements.co &bull; All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy/" className="hover:text-zinc-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-zinc-200 transition-colors">Terms of Service</Link>
            <Link href="/safety/" className="hover:text-zinc-200 transition-colors">COSHH Safety</Link>
            <Link href="/sitemap/" className="hover:text-zinc-200 transition-colors">HTML Sitemap</Link>
            <Link href="/sitemap.xml" className="hover:text-zinc-200 transition-colors">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
