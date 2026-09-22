'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCallIcon, AwardSealIcon, ScalesOfJusticeIcon } from './Icons';
import { BrandConfig } from '../types';

interface HeaderProps {
  brand: BrandConfig;
  brandVariant?: 'alderton' | 'cavendish';
}

export const Header: React.FC<HeaderProps> = ({ brand, brandVariant = 'alderton' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  const isAlderton = brandVariant === 'alderton';

  const navLinks = [
    { href: '/services', label: 'Mediation Services' },
    { href: '/services/miam-assessment', label: 'MIAM Assessments' },
    { href: '/locations', label: 'Locations' },
    { href: '/blog', label: 'Guides & Advice' },
    { href: '/about', label: 'About Practice' },
    { href: '/contact', label: 'Contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/services') return pathname === '/services';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Prestige Micro-Bar */}
      <div
        className={`text-slate-200 py-1.5 px-4 text-xs font-medium border-b ${
          isAlderton
            ? 'bg-slate-950 border-slate-800'
            : 'bg-emerald-950 border-emerald-900'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 text-white font-semibold tracking-wide">
              <AwardSealIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Family Mediation Council (FMC) Accredited Practice</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Fast-Track MIAM Appointments Available</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <span className="hidden sm:inline">Mon–Fri 8:30am–6:00pm</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="inline-flex items-center gap-1 text-slate-200 font-medium">
              <span>100% Confidential &amp; Legally Privileged</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Royal Crest */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-0 py-1 mr-2 sm:mr-4"
            title={`${brand.brandName} - Home`}
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-200 shadow-sm shrink-0 border ${
                isAlderton
                  ? 'bg-gradient-to-br from-slate-900 to-slate-950 text-amber-400 border-slate-800 group-hover:scale-105'
                  : 'bg-gradient-to-br from-emerald-950 to-slate-950 text-amber-300 border-emerald-800 group-hover:scale-105'
              }`}
            >
              <ScalesOfJusticeIcon className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col justify-center text-left min-w-0">
              <span className="font-serif text-base sm:text-lg xl:text-xl font-bold tracking-tight text-slate-950 leading-tight">
                {brand.brandName}
              </span>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase text-slate-500 leading-none mt-0.5 sm:mt-1">
                Accredited Family Dispute Resolution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-[14px]">
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-all duration-150 whitespace-nowrap ${
                    active
                      ? isAlderton
                        ? 'text-slate-950 font-bold bg-amber-500/15 border-b-2 border-amber-500 shadow-xs'
                        : 'text-emerald-950 font-bold bg-emerald-50 border-b-2 border-emerald-600 shadow-xs'
                      : isAlderton
                      ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 font-semibold'
                      : 'text-stone-700 hover:text-emerald-950 hover:bg-emerald-50/70 font-semibold'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Call Button & Hamburger Container */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Action Call Button (Strictly Single Button: Icon + Phone Number ONLY) */}
            <div className="hidden sm:flex items-center shrink-0">
              <a
                href={`tel:${brand.phone}`}
                onClick={() =>
                  typeof window !== 'undefined' &&
                  ((window as unknown as { dataLayer: unknown[] }).dataLayer =
                    (window as unknown as { dataLayer: unknown[] }).dataLayer || []).push({
                    event: 'phone_call_click',
                    phone_number: brand.phone,
                    placement: 'desktop_header',
                  })
                }
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 shadow-xs hover:shadow-md whitespace-nowrap group ${
                  isAlderton
                    ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-white'
                    : 'bg-emerald-950 hover:bg-emerald-900 border-emerald-800 text-white'
                }`}
                title={`Call ${brand.brandName}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isAlderton ? 'bg-amber-400 text-slate-950' : 'bg-amber-400 text-emerald-950'
                  }`}
                >
                  <PhoneCallIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-amber-300 tracking-wide">
                  {brand.formattedPhone}
                </span>
              </a>
            </div>

            {/* Mobile/Tablet Menu Toggle Button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Luxury Sheet Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-8 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs text-slate-700 font-bold">
            <span className="flex items-center gap-1.5">
              <AwardSealIcon className="w-4 h-4 text-amber-500" />
              <span>FMC Accredited Practice</span>
            </span>
            <span className="text-emerald-700 font-bold">48hr MIAM Available</span>
          </div>

          <div className="space-y-1">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Mediation Services &amp; Pathways
            </Link>
            <Link
              href="/services/miam-assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              MIAM Assessment &amp; Court Forms
            </Link>
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Regional Practice Locations
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Dispute Resolution Guides &amp; Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              About Practice &amp; Mediators
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Contact &amp; Appointments
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${brand.phone}`}
              onClick={() =>
                typeof window !== 'undefined' &&
                ((window as unknown as { dataLayer: unknown[] }).dataLayer =
                  (window as unknown as { dataLayer: unknown[] }).dataLayer || []).push({
                  event: 'phone_call_click',
                  phone_number: brand.phone,
                  placement: 'mobile_menu',
                })
              }
              className={`flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-white text-sm shadow-md transition whitespace-nowrap ${
                isAlderton ? 'bg-slate-900 hover:bg-slate-800' : 'bg-emerald-950 hover:bg-emerald-900'
              }`}
            >
              <PhoneCallIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap tracking-wide">{brand.formattedPhone}</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 rounded-xl text-center font-bold text-sm tracking-wide bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition"
            >
              Book Confidential Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
