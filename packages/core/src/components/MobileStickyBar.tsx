'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCallIcon, CalendarIcon } from './Icons';
import { BrandConfig } from '../types';

interface MobileStickyBarProps {
  brand: BrandConfig;
  brandVariant?: 'alderton' | 'cavendish';
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ brand, brandVariant = 'alderton' }) => {
  const isAlderton = brandVariant === 'alderton';

  const callBtnStyle = isAlderton
    ? 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700'
    : 'bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-800';

  const ctaBtnStyle = isAlderton
    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm'
    : 'bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${brand.phone}`}
          onClick={() => {
            if (typeof window !== 'undefined') {
              const win = window as unknown as { dataLayer?: unknown[] };
              win.dataLayer = win.dataLayer || [];
              win.dataLayer.push({
                event: 'phone_call_click',
                phone_number: brand.phone,
                placement: 'mobile_sticky_bar',
              });
            }
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-[0.98] ${callBtnStyle}`}
          aria-label={`Call ${brand.brandName} Team`}
        >
          <PhoneCallIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="whitespace-nowrap font-bold tracking-tight">{brand.formattedPhone}</span>
        </a>

        {/* Book Consultation Button */}
        <Link
          href="/contact"
          onClick={() => {
            if (typeof window !== 'undefined') {
              const win = window as unknown as { dataLayer?: unknown[] };
              win.dataLayer = win.dataLayer || [];
              win.dataLayer.push({
                event: 'cta_click',
                cta_text: 'Book Consultation',
                placement: 'mobile_sticky_bar',
              });
            }
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-[0.98] ${ctaBtnStyle}`}
        >
          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">Book Consultation</span>
        </Link>
      </div>
    </div>
  );
};
