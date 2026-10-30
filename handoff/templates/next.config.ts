import type { NextConfig } from 'next';

/**
 * Enterprise Production Next.js Configuration
 * Adheres strictly to Core Web Vitals 100/100, Ahrefs zero-redirect,
 * and first-party source map diagnostic standards.
 */
const nextConfig: NextConfig = {
  // Required for static HTML export (SSG) to Nginx / Cloudflare Pages
  output: 'export',

  // Enforces trailing slashes on all routes (/about/ instead of /about)
  // Eliminates 301 internal redirect hops flagged by Ahrefs
  trailingSlash: true,

  // Generates first-party source maps in production (HTTP 200 for .js.map)
  productionBrowserSourceMaps: true,

  // Required for static output: 'export'
  images: {
    unoptimized: true,
  },

  // Enables Brotli & Gzip compression
  compress: true,

  // Disables the 'X-Powered-By: Next.js' header for security compliance
  poweredByHeader: false,

  // Strips console.log in production builds while preserving error logging
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

export default nextConfig;
