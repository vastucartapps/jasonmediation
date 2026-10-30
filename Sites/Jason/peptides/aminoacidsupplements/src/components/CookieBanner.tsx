'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Check } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aminoacidsupplements_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aminoacidsupplements_cookie_consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside aria-label="Privacy and cookies notice" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-zinc-950 text-white p-5 rounded-2xl shadow-2xl border border-zinc-800 animate-fadeIn">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-3">
          <p className="text-xs text-zinc-300 leading-relaxed">
            We use essential analytical cookies to ensure statutory UK compliance, evaluate page telemetry, and improve laboratory chemical discovery.{' '}
            <Link href="/privacy/" className="text-orange-400 underline hover:text-orange-300">
              Privacy &amp; GDPR Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="btn-amino-copper text-xs py-1.5 px-4 rounded-lg flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Acknowledge &amp; Accept</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
