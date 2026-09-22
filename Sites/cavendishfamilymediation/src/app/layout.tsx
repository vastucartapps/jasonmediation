import type { Metadata } from 'next';
import './globals.css';
import { CAVENDISH_BRAND } from '../config/brand';
import { Header, Footer, MobileStickyBar, generateLocalBusinessSchema } from '@mediation/core';

export const metadata: Metadata = {
  metadataBase: new URL(CAVENDISH_BRAND.siteUrl),
  title: {
    default: `${CAVENDISH_BRAND.brandName} | FMC-Accredited Family Mediation & MIAM Assessments`,
    template: `%s | ${CAVENDISH_BRAND.brandName}`,
  },
  description:
    'Premier FMC-accredited family mediation practice serving Suffolk, Essex, Kent, and Sussex. Discrete MIAM assessment certification, child arrangements, and financial clean breaks.',
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: CAVENDISH_BRAND.siteUrl,
    title: `${CAVENDISH_BRAND.brandName} | UK Family Mediation Practice`,
    description:
      'Accredited family dispute resolution across the South East & East Anglia. Discreet, calm solutions for child arrangements and financial settlements.',
    siteName: CAVENDISH_BRAND.brandName,
    images: [
      {
        url: '/images/hero-mediation.webp',
        width: 1200,
        height: 630,
        alt: `${CAVENDISH_BRAND.brandName} - Professional Family Mediation`,
      },
    ],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <meta name="theme-color" content="#064E3B" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F5] text-stone-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16 md:pb-0">
        <Header brand={CAVENDISH_BRAND} brandVariant="cavendish" />
        <main className="flex-grow">{children}</main>
        <Footer brand={CAVENDISH_BRAND} brandVariant="cavendish" />
        <MobileStickyBar brand={CAVENDISH_BRAND} brandVariant="cavendish" />
      </body>
    </html>
  );
}
