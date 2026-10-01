'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsentBannerProps {
  privacyHref?: string;
  brandPrimaryColor?: string;
}

/**
 * Enterprise UK GDPR & PECR Compliant Cookie Disclaimer Banner & Preference Center
 * Provides full transparency, essential/analytics toggles, and seamless Matomo integration.
 */
export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  privacyHref = '/privacy/',
  brandPrimaryColor = '#0B192C',
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('fmc_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      } else if (consent === 'essential') {
        // Enforce cookie disabling in Matomo if user previously declined
        if (typeof window !== 'undefined' && (window as unknown as { _paq?: unknown[] })._paq) {
          (window as unknown as { _paq: unknown[] })._paq.push(['disableCookies']);
        }
      }
    } catch {
      // LocalStorage access fallback (incognito/strict privacy mode)
      setIsVisible(true);
    }

    // Global listener for "Cookie Settings" link in footer
    const handleOpenSettings = () => {
      setIsModalOpen(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('fmc_cookie_consent', 'all');
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && (window as unknown as { _paq?: unknown[] })._paq) {
      const paq = (window as unknown as { _paq: unknown[] })._paq;
      paq.push(['rememberConsentGiven']);
    }
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('fmc_cookie_consent', 'essential');
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && (window as unknown as { _paq?: unknown[] })._paq) {
      const paq = (window as unknown as { _paq: unknown[] })._paq;
      paq.push(['disableCookies']);
      paq.push(['forgetConsentGiven']);
    }
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleSaveCustom = () => {
    if (analyticsConsent) {
      handleAcceptAll();
    } else {
      handleEssentialOnly();
    }
  };

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Non-intrusive Floating Bottom Banner */}
      {!isModalOpen && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-5 sm:p-6 pointer-events-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-bold tracking-wide uppercase text-slate-300">
                    Cookie &amp; Privacy Notice
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We use essential cookies to maintain secure site operation and privacy-first analytics (via our self-hosted Matomo cluster) to improve mediation guidance. We never sell data or deploy advertising cookies. Review our{' '}
                  <Link
                    href={privacyHref}
                    className="text-amber-300 underline underline-offset-2 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition"
                >
                  Preferences
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 transition"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Accessible Cookie Preferences Modal Popup */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        >
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 id="cookie-settings-title" className="text-lg font-serif font-bold text-slate-950">
                  Cookie &amp; Privacy Preferences
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage which cookies and data collection tools you consent to.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close preferences"
                className="text-slate-400 hover:text-slate-700 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs">
              {/* Essential Cookies */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">1. Strictly Necessary Cookies</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-600 mt-1.5 leading-relaxed">
                  Required for secure site navigation, anti-CSRF token verification on confidential mediation assessment forms, and storing your consent preferences.
                </p>
              </div>

              {/* Matomo Analytics Cookies */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">2. Anonymous Analytics (Matomo)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500" />
                  </label>
                </div>
                <p className="text-slate-600 mt-1.5 leading-relaxed">
                  Allows us to measure general traffic volumes and guide readability across our regional locations without profiling or sharing records with third-party advertising brokers.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                <p className="leading-relaxed">
                  <strong>Zero Commercial Tracking:</strong> We never deploy Google DoubleClick, Meta Pixel, or commercial ad tracking networks. All data is processed under UK GDPR standards.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
