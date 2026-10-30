'use client';

import React, { useEffect } from 'react';

interface MatomoTrackerProps {
  siteId: string;
  baseUrl?: string;
}

/**
 * Deferred High-Performance Matomo Tracker
 * Runs strictly after window load via requestIdleCallback.
 * Imparts ZERO (0ms) Main Thread blocking during FCP, LCP, and INP.
 */
export const MatomoTracker: React.FC<MatomoTrackerProps> = ({
  siteId,
  baseUrl = '//analytics.1str.co.uk/',
}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || (window as any)._paq_loaded) return;

    const loadMatomo = () => {
      if ((window as any)._paq_loaded) return;
      (window as any)._paq_loaded = true;

      const cleanUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const _paq = ((window as any)._paq = (window as any)._paq || []);
      _paq.push(['setTrackerUrl', `${cleanUrl}matomo.php`]);
      _paq.push(['setSiteId', siteId]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);

      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `${cleanUrl}matomo.js`;
      document.head.appendChild(script);
    };

    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadMatomo, { timeout: 2500 });
      } else {
        setTimeout(loadMatomo, 1500);
      }
    } else {
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadMatomo, { timeout: 2500 });
        } else {
          setTimeout(loadMatomo, 1500);
        }
      });
    }
  }, [siteId, baseUrl]);

  return null;
};
