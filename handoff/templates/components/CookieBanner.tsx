'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Check } from 'lucide-react';

interface CookieBannerProps {
  storageKey?: string;
  privacyHref?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  storageKey = 'site_cookie_consent_status',
  privacyHref = '/privacy/',
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(storageKey);
      if (!consent) {
        setShow(true);
      }
    } catch {
      // Storage access blocked / private mode
    }
  }, [storageKey]);

  const handleAccept = () => {
    try {
      localStorage.setItem(storageKey, 'accepted');
    } catch {
      // Storage blocked
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Privacy and cookies notice"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 animate-fadeIn"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            We use essential analytical cookies to evaluate site telemetry, maintain session security, and optimize service dispatch.{' '}
            <Link href={privacyHref} className="text-emerald-400 underline hover:text-emerald-300">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="py-1.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-98"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Acknowledge &amp; Accept</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
