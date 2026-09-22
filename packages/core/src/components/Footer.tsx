import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrandConfig } from '../types';
import { CORE_SERVICES } from '../data/services';
import {
  PhoneCallIcon,
  AwardSealIcon,
  ShieldCheckIcon,
  ScalesOfJusticeIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  MailIcon,
  ClockIcon,
  CheckCircleIcon,
} from './Icons';

interface FooterProps {
  brand: BrandConfig;
  brandVariant?: 'alderton' | 'cavendish';
}

export const Footer: React.FC<FooterProps> = ({ brand, brandVariant = 'alderton' }) => {
  const isAlderton = brandVariant === 'alderton';

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Signposting Notice (Enterprise Banner with Zero Smashing) */}
        <div
          className={`rounded-2xl p-6 sm:p-7 border mb-14 shadow-lg ${
            isAlderton
              ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-800 border-l-4 border-l-amber-500'
              : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-emerald-900 border-l-4 border-l-amber-400'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangleIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Statutory Signposting &amp; Safeguarding
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  If you are experiencing domestic abuse, coercive control, or fear for the immediate safety of your children, please contact the free 24-hour National Domestic Abuse Helpline on{' '}
                  <strong className="text-white font-semibold">0808 2000 247</strong> or emergency services on{' '}
                  <strong className="text-white font-semibold">999</strong>. Under statutory family law regulations, you may qualify for immediate MIAM exemption.
                </p>
              </div>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/services/miam-assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-xs whitespace-nowrap"
              >
                <span>MIAM Exemptions Guide</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 5-Column Main Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1: Brand & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                  isAlderton ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-amber-200'
                }`}
              >
                <ScalesOfJusticeIcon className="w-6 h-6" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                {brand.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              {brand.tagline}. Authorized practitioners adhering strictly to the Family Mediation Council (FMC) Code of Professional Conduct.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <AwardSealIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">FMC Accredited Family Dispute Resolution</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200">100% Confidential &amp; Legally Privileged</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ClockIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-300">Mon–Fri: 8:30am–6:00pm | Sat: 9:00am–1:00pm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MailIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="text-slate-300 hover:text-amber-400 transition"
                >
                  {brand.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <PhoneCallIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${brand.phone}`}
                  className="text-sm font-bold text-amber-300 hover:text-amber-200 transition tracking-wide"
                >
                  {brand.formattedPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Mediation Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {CORE_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-300 hover:text-white transition block"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>All Mediation Pathways</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: County Coverage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Regional Locations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {brand.counties.map((county) => (
                <li key={county.slug}>
                  <Link
                    href={`/locations#${county.slug}`}
                    className="text-slate-300 hover:text-white transition block"
                  >
                    {county.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>Find Your Local Family Mediation Practice</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Practical Guidance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Practical Guidance
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white transition block">
                  Family Law &amp; Dispute Blog
                </Link>
              </li>
              <li>
                <Link href="/services/miam-assessment" className="text-slate-300 hover:text-white transition block">
                  Statutory MIAM Guidelines
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition block">
                  Our FMC Mediators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition block">
                  Contact &amp; Bookings
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-slate-300 hover:text-white transition block">
                  HTML Site Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Accreditations & Regulated Standards Bar (Enterprise Luxury Showcase) */}
        <div className="pt-8 pb-10 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Regulated Practice &amp; Professional Accreditations
              </span>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                All mediation practitioners operate in full compliance with the statutory codes and ethical standards established by the Family Mediation Council (FMC), College of Mediators, and Resolution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 bg-slate-900/90 rounded-xl p-4 border border-slate-800 shadow-sm hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-lg bg-white p-1.5 shadow-sm flex items-center justify-center shrink-0">
                <Image
                  src="/images/family-mediation-council.webp"
                  alt="Family Mediation Council Accredited"
                  width={40}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Family Mediation Council</div>
                <div className="text-[11px] text-amber-400 font-semibold mt-0.5">FMCA Certified Mediators</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <CheckCircleIcon className="w-3 h-3 shrink-0" />
                  <span>Verified Body</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-900/90 rounded-xl p-4 border border-slate-800 shadow-sm hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-lg bg-white p-1.5 shadow-sm flex items-center justify-center shrink-0">
                <Image
                  src="/images/college-of-mediators.webp"
                  alt="College of Mediators Approved Member"
                  width={40}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-white leading-tight">College of Mediators</div>
                <div className="text-[11px] text-amber-400 font-semibold mt-0.5">Approved Practice Member</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <CheckCircleIcon className="w-3 h-3 shrink-0" />
                  <span>Verified Body</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-900/90 rounded-xl p-4 border border-slate-800 shadow-sm hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-lg bg-white p-1.5 shadow-sm flex items-center justify-center shrink-0">
                <Image
                  src="/images/resolution.webp"
                  alt="Resolution First for Family Law"
                  width={40}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Resolution</div>
                <div className="text-[11px] text-amber-400 font-semibold mt-0.5">First for Family Law</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <CheckCircleIcon className="w-3 h-3 shrink-0" />
                  <span>Verified Body</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Town Quick Links Bar */}
        <div className="pt-8 pb-8 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
            Regional Mediation Locations Served:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
            {brand.counties.flatMap((c) =>
              c.towns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/locations/${town.countySlug}/${town.slug}`}
                  className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-400/40 transition"
                >
                  Family Mediation {town.name}
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {brand.legalEntityName}. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy" className="hover:text-white transition underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition underline">
              Terms of Engagement
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition underline">
              XML Sitemap
            </Link>
            <Link href="/llms.txt" className="hover:text-white transition underline">
              LLMs.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
