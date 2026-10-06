'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('trustly_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('trustly_cookie_consent', 'all');
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('trustly_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 rounded-3xl p-5 sm:p-6 bg-[#03132e]/95 backdrop-blur-xl border border-sky-500/30 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              UK GDPR Privacy & Cookie Governance
            </h4>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              PECR & Data Protection Compliance
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleEssentialOnly}
          aria-label="Close cookie banner"
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed">
        We use essential cookies to maintain platform operation and privacy-compliant analytics to evaluate scientific resource usage. No marketing or behavioral profiling cookies are deployed. Review our{' '}
        <Link
          href="/privacy/"
          className="text-sky-300 hover:text-white underline underline-offset-2 transition-colors font-medium"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-sm"
        >
          Accept All Cookies
        </button>

        <button
          type="button"
          onClick={handleEssentialOnly}
          className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#02102b] hover:bg-[#071d42] text-slate-200 border border-[rgba(141,168,195,0.25)] transition-colors"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
}
