'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  const handleDecline = () => {
    localStorage.setItem('trustly_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(141,168,195,0.22)] bg-[#020e24]/95 backdrop-blur-md py-3.5 px-4 sm:px-8 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="container-wide flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-6">
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          We use essential cookies plus optional analytics cookies (Google Analytics 4) to measure and improve TrustlyPharma. Read our{' '}
          <Link
            href="/privacy/"
            className="text-white underline underline-offset-2 hover:text-amber-300 font-medium transition-colors"
          >
            cookie policy
          </Link>
          .
        </p>

        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-[#061c42] hover:bg-[#0a2c68] border border-[rgba(141,168,195,0.3)] hover:text-white transition-colors"
          >
            Decline
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-5 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
          >
            Accept all
          </button>
        </div>
      </div>
    </aside>
  );
}
