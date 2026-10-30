# Core Web Vitals & Performance Engineering (100/100 Benchmark)

> **CORE MANDATE**: Every website must achieve a **100/100 score on Google Lighthouse** for Performance, Accessibility, Best Practices, and SEO on both Desktop and Mobile viewports.

---

## 1. The 3 Core Web Vitals & How We Enforce Perfection

| Metric | Target | Root Cause of Failure | Mandatory Architectural Fix |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **< 1.2s** | Hoisting 10 below-the-fold blog images into `<head>` preloads; uncompressed hero images. | Preload **ONLY** the single above-the-fold hero image (`priority={true}`). Enforce WebP format. |
| **CLS** (Cumulative Layout Shift) | **0.00** | Images and embeds rendered without explicit `width` and `height`. | Explicit dimensions on every `<img>` + Tailwind `aspect-video` containers. |
| **INP** (Interaction to Next Paint) | **< 50ms** | Third-party analytics scripts (Matomo, GA4) blocking the browser main thread during initial parse. | Defer all tracking scripts via `requestIdleCallback` after `window.addEventListener('load')`. |

---

## 2. Next.js 15+ Production Configuration (`next.config.ts`)

Every static Next.js project must use this exact baseline configuration:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enforces clean static export for Apache, Nginx, or Cloudflare Pages
  output: 'export',

  // Enforces trailing slashes on all routes (/about/ instead of /about)
  // This eliminates 301 redirect hops on static web servers
  trailingSlash: true,

  // Generates first-party source maps in production (HTTP 200 for .js.map)
  // Essential for Google DevTools and Ahrefs diagnostic health
  productionBrowserSourceMaps: true,

  // Required for static HTML export
  images: {
    unoptimized: true,
  },

  // Enables Brotli and Gzip compression
  compress: true,

  // Disables the 'X-Powered-By: Next.js' header for security compliance
  poweredByHeader: false,

  // Strips console.log in production builds while preserving console.error
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

export default nextConfig;
```

---

## 3. The LCP & Preload Hoisting Directive (Zero AI Mistakes)

### ❌ The Common AI Failure Mode:
Many AI coding tools inject `priority={true}` or `<link rel="preload" as="image">` on **every single image component** across the page (blog card thumbnails, partner logos, author avatars). As a result:
- The browser downloads 15 heavy images before downloading critical CSS and JavaScript.
- LCP degrades from 0.8s to 4.2s (failing Core Web Vitals).

### ✅ The Strict Preload Standard:
1. **Above-the-Fold Hero Image ONLY**: Exactly **one** image per page may have `priority={true}` or `fetchpriority="high"`.
2. **All Other Images**: Every other image on the page **MUST** use:
   ```html
   <img 
     src="/images/case-study.webp" 
     alt="Descriptive caption" 
     width="600" 
     height="338" 
     loading="lazy" 
     decoding="async" 
     class="w-full h-auto aspect-video object-cover" 
   />
   ```
3. In Next.js:
   ```tsx
   // Above the fold (Hero):
   <Image src="/images/hero.webp" alt="Hero banner" width={1200} height={675} priority />

   // Below the fold (All other images):
   <Image src="/images/diagram.webp" alt="Diagram" width={800} height={450} loading="lazy" />
   ```

---

## 4. Zero Main-Thread Blocking Analytics (Matomo / GA4)

Analytics and telemetry scripts must **NEVER** run during initial DOM evaluation. They must be deferred until the browser is idle:

```tsx
'use client';

import React, { useEffect } from 'react';

interface MatomoProps {
  siteId: string;
  baseUrl?: string;
}

export const MatomoTracker: React.FC<MatomoProps> = ({
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

    // Defer until browser is completely idle (0ms main thread blocking)
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
```

---

## 5. Mandatory Production Security Headers

When serving via Nginx, Apache, or Cloudflare Pages, the web server **must return all 5 security headers**:

```nginx
# Nginx Security Header Block
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

---

## 6. Zero Cumulative Layout Shift (CLS = 0) Checklist

- [ ] All images have explicit HTML `width` and `height` attributes matching their intrinsic aspect ratio.
- [ ] CSS containers for dynamic elements (e.g. hero carousels, accordions) specify minimum height (`min-h-[...]`).
- [ ] Fonts use `next/font` (Google Fonts with built-in font fallback sizing) or declare `font-display: swap`.
- [ ] Dynamic banners (e.g. cookie disclaimers) use `position: fixed` or `position: absolute` so they float above the layout without pushing body content downward.
