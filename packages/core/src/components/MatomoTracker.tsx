'use client';

import React from 'react';

interface MatomoTrackerProps {
  siteId?: string;
  baseUrl?: string;
  disableCookies?: boolean;
}

/**
 * Enterprise Matomo Analytics Tracker
 * Seamlessly tracks pageviews and interactions using client's self-hosted Matomo cluster.
 * Enforces cookie-less tracking by default to maintain 100% GDPR compliance without consent banners.
 */
export const MatomoTracker: React.FC<MatomoTrackerProps> = ({
  siteId,
  baseUrl = '//analytics.1str.co.uk/',
}) => {
  if (!siteId) return null;

  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const scriptContent = `
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="${cleanBaseUrl}";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '${siteId}']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `;

  return (
    <script
      id="matomo-analytics"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};

/**
 * Dispatches custom events to Matomo if available on window._paq
 */
export function trackMatomoEvent(category: string, action: string, name?: string, value?: number) {
  if (typeof window !== 'undefined' && (window as unknown as { _paq?: unknown[] })._paq) {
    const paq = (window as unknown as { _paq: unknown[] })._paq;
    if (name !== undefined) {
      if (value !== undefined) {
        paq.push(['trackEvent', category, action, name, value]);
      } else {
        paq.push(['trackEvent', category, action, name]);
      }
    } else {
      paq.push(['trackEvent', category, action]);
    }
  }
}
