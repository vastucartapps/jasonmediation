import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-100/80 border-b border-slate-300 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-slate-800">
        <Link href="/" className="font-bold text-slate-800 hover:text-slate-950 transition">
          Home
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.href}>
              <span className="text-slate-600 font-bold">/</span>
              {isLast ? (
                <span className="font-bold text-slate-950" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="font-bold text-slate-800 hover:text-slate-950 transition">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
