'use client';

import React from 'react';

export const CookieSettingsButton: React.FC<{ className?: string }> = ({
  className = 'hover:text-white transition underline cursor-pointer bg-transparent border-none p-0 text-xs font-medium text-slate-400',
}) => {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      Cookie Preferences
    </button>
  );
};
