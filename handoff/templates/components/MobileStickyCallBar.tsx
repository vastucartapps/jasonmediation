'use client';

import React from 'react';
import { PhoneCall, Zap } from 'lucide-react';

interface MobileStickyCallBarProps {
  phone: string;
  formattedPhone: string;
  ctaText?: string;
  quoteAnchor?: string;
}

/**
 * Mobile-First Persistent Bottom Sticky Bar
 * Displays strictly on mobile viewports (< 768px) with 0ms CLS.
 * Provides high-contrast, immediate access to phone dispatch.
 */
export const MobileStickyCallBar: React.FC<MobileStickyCallBarProps> = ({
  phone,
  formattedPhone,
  ctaText = 'Call Dispatch',
  quoteAnchor = '#lead-form',
}) => {
  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800 p-2.5 sm:hidden shadow-2xl transition-transform"
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-98"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span>{ctaText}</span>
        </a>
        <a
          href={quoteAnchor}
          className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-98"
        >
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Instant Quote</span>
        </a>
      </div>
    </aside>
  );
};
