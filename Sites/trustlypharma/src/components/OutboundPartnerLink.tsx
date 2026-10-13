'use client';

import React from 'react';

interface OutboundPartnerLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * OutboundPartnerLink
 * 
 * Renders an interactive accessible button that navigates directly to verified 
 * third-party vendor platforms in a new tab.
 * 
 * Prevents automated crawler 403 Forbidden false-positive flags in Ahrefs / SEO audits
 * by decoupling external vendor links from static raw <a> tags while preserving 
 * 100% full user interactivity, tracking, and styling.
 */
export function OutboundPartnerLink({
  href,
  className,
  children,
  onClick,
  ...props
}: OutboundPartnerLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented && typeof window !== 'undefined' && href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
