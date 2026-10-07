'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Calculator, Scale, Store } from 'lucide-react';

export function MobileTrustBar() {
  const pathname = usePathname();

  const links = [
    {
      label: 'Directory',
      href: '/#peptides-catalog',
      icon: BookOpen,
      isActive: pathname === '/' || pathname.startsWith('/peptides'),
    },
    {
      label: 'Calculator',
      href: '/#calculator',
      icon: Calculator,
      isActive: false,
    },
    {
      label: 'Regulatory',
      href: '/regulatory/',
      icon: Scale,
      isActive: pathname.startsWith('/regulatory'),
    },
    {
      label: 'Vendors',
      href: '/vendors/',
      icon: Store,
      isActive: pathname.startsWith('/vendors'),
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#02102b]/95 backdrop-blur-xl border-t border-[rgba(141,168,195,0.25)] shadow-2xl py-2 px-3">
      <div className="grid grid-cols-4 gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-center transition-colors ${
                link.isActive
                  ? 'bg-sky-500/15 text-sky-300 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-mono tracking-tight leading-none block">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
