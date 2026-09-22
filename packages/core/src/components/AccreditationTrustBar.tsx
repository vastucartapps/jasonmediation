import React from 'react';
import Image from 'next/image';
import { ShieldCheckIcon, CheckCircleIcon } from './Icons';

interface AccreditationTrustBarProps {
  variant?: 'light' | 'dark' | 'card';
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AccreditationTrustBar: React.FC<AccreditationTrustBarProps> = ({
  variant = 'light',
  title = 'Nationally Accredited & Regulated Standards',
  subtitle = 'Our certified mediators operate strictly under the codes of conduct established by the UK’s governing family mediation bodies.',
  className = '',
}) => {
  const accreditations = [
    {
      name: 'Family Mediation Council (FMC)',
      role: 'Regulatory Standards & FMCA Certification',
      detail: 'Accredited mediators qualified to issue and sign statutory MIAM court certificates (Form C100 & Form A).',
      badgeSrc: '/images/family-mediation-council.webp',
      alt: 'Family Mediation Council Accredited Logo',
    },
    {
      name: 'College of Mediators',
      role: 'Approved Membership Body',
      detail: 'Dedicated to ethical standards, professional supervision, and rigorous continuous practice quality.',
      badgeSrc: '/images/college-of-mediators.webp',
      alt: 'College of Mediators Approved Member Logo',
    },
    {
      name: 'Resolution',
      role: 'Constructive Family Resolution',
      detail: 'Adhering to the non-confrontational Code of Practice prioritizing the welfare and best interests of children.',
      badgeSrc: '/images/resolution.webp',
      alt: 'Resolution First for Family Law Member Logo',
    },
  ];

  const isDark = variant === 'dark';

  return (
    <section
      className={`py-12 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-slate-900 border-y border-slate-800' : 'bg-slate-50 border-y border-slate-200'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-amber-100 text-amber-950 border border-amber-300">
            <ShieldCheckIcon className="w-4 h-4 text-amber-700" />
            <span>Professional Credentials & Standards</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {title}
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accreditations.map((item, idx) => (
            <div
              key={item.name}
              className={`rounded-2xl p-7 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group ${
                isDark
                  ? 'bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 shadow-lg hover:shadow-xl hover:border-slate-600'
                  : 'bg-white border border-slate-200/90 border-t-4 border-t-amber-500 shadow-sm hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex items-center justify-center mb-5 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={item.badgeSrc}
                  alt={item.alt}
                  width={96}
                  height={96}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className={`font-serif font-bold text-base sm:text-lg leading-snug ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {item.name}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-amber-950 bg-amber-100 border border-amber-300 uppercase tracking-wider mt-2 mb-3">
                {item.role}
              </span>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {item.detail}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Regulatory Body</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
