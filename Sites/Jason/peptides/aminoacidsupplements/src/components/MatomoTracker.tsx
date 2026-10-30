'use client';

import React, { useEffect } from 'react';

interface MatomoTrackerProps {
  siteId?: string;
  baseUrl?: string;
  disableCookies?: boolean;
}

declare global {
  interface Window {
    _paq?: any[];
    _paq_loaded?: boolean;
  }
}

/**
 * High-Performance Matomo Analytics Tracker for AminoAcidSupplements.co
 * Strictly configured with site ID 114.
 * Deferred execution ensures 0ms Main Thread blocking during FCP/LCP.
 */
export const MatomoTracker: React.FC<MatomoTrackerProps> = ({
  siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '114',
  baseUrl = process.env.NEXT_PUBLIC_MATOMO_URL || '//analytics.1str.co.uk/',
}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || window._paq_loaded) return;

    const loadMatomo = () => {
      if (window._paq_loaded) return;
      window._paq_loaded = true;

      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const _paq = (window._paq = window._paq || []);
      _paq.push(['setTrackerUrl', `${cleanBaseUrl}matomo.php`]);
      _paq.push(['setSiteId', siteId]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);

      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.defer = true;
      g.src = `${cleanBaseUrl}matomo.js`;
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      } else {
        d.head.appendChild(g);
      }
    };

    // Defer until browser is completely idle so initial render & LCP are instant
    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadMatomo, { timeout: 2000 });
      } else {
        setTimeout(loadMatomo, 1000);
      }
    } else {
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadMatomo, { timeout: 2000 });
        } else {
          setTimeout(loadMatomo, 1000);
        }
      }, { once: true });
    }
  }, [siteId, baseUrl]);

  return null;
};
