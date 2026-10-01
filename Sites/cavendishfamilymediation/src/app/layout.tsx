import type { Metadata } from 'next';
import './globals.css';
import { CAVENDISH_BRAND } from '../config/brand';
import { Header, Footer, MobileStickyBar, generateLocalBusinessSchema, MatomoTracker, CookieConsentBanner } from '@mediation/core';

export const metadata: Metadata = {
  metadataBase: new URL(CAVENDISH_BRAND.siteUrl),
  title: {
    default: `${CAVENDISH_BRAND.brandName} | FMC-Accredited Mediation`,
    template: '%s',
  },
  description:
    'FMC-accredited family mediation practice serving the South East. Rapid MIAM assessments, financial clean breaks & child arrangements. Book in 48 hours.',
  keywords: [
    'family mediation Suffolk',
    'MIAM certificate Ipswich',
    'child arrangements Chelmsford',
    'divorce financial mediation Brighton',
    'family dispute mediation Maidstone',
    'Form C100 Southend',
  ],
  authors: [{ name: CAVENDISH_BRAND.brandName }],
  creator: CAVENDISH_BRAND.brandName,
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: './',
    title: `${CAVENDISH_BRAND.brandName} | UK Family Mediation Practice`,
    description:
      'Accredited family dispute resolution across the South East & East Anglia. Discreet, calm solutions for child arrangements and financial settlements.',
    siteName: CAVENDISH_BRAND.brandName,
    images: [
      {
        url: `${CAVENDISH_BRAND.siteUrl}/images/hero-mediation.webp`,
        width: 1200,
        height: 630,
        alt: `${CAVENDISH_BRAND.brandName} - Professional Family Mediation`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CAVENDISH_BRAND.brandName} | UK Family Mediation Practice`,
    description:
      'Accredited family dispute resolution across the South East & East Anglia. Discreet, calm solutions for child arrangements and financial settlements.',
    images: [`${CAVENDISH_BRAND.siteUrl}/images/hero-mediation.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessSchema = generateLocalBusinessSchema(CAVENDISH_BRAND);

  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          />
        </noscript>
        <link rel="preload" as="image" href="/images/hero-mediation.webp" fetchPriority="high" />
        {CAVENDISH_BRAND.googleSiteVerification && (
          <meta name="google-site-verification" content={CAVENDISH_BRAND.googleSiteVerification} />
        )}
        {CAVENDISH_BRAND.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${CAVENDISH_BRAND.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${CAVENDISH_BRAND.googleAnalyticsId}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true
                  });
                `,
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <MatomoTracker
          siteId={CAVENDISH_BRAND.matomoSiteId}
          baseUrl={CAVENDISH_BRAND.matomoBaseUrl}
        />
        <meta name="theme-color" content="#064E3B" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F5] text-stone-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16 md:pb-0">
        <Header brand={CAVENDISH_BRAND} brandVariant="cavendish" />
        <main className="flex-grow">{children}</main>
        <Footer brand={CAVENDISH_BRAND} brandVariant="cavendish" />
        <MobileStickyBar brand={CAVENDISH_BRAND} brandVariant="cavendish" />
        <CookieConsentBanner privacyHref="/privacy/" brandPrimaryColor={CAVENDISH_BRAND.theme.primaryHex} />
      </body>
    </html>
  );
}
