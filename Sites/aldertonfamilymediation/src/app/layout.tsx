import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ALDERTON_BRAND } from '../config/brand';
import { Header, Footer, MobileStickyBar, generateLocalBusinessSchema } from '@mediation/core';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(ALDERTON_BRAND.siteUrl),
  title: {
    default: `${ALDERTON_BRAND.brandName} | FMC-Accredited Family Mediation & MIAM Assessments`,
    template: `%s | ${ALDERTON_BRAND.brandName}`,
  },
  description:
    'FMC-accredited family mediation practice serving Leicestershire, Rutland, Lincolnshire, and Nottinghamshire. Rapid MIAM court certificates, child arrangements, and financial clean breaks.',
  keywords: [
    'family mediation Leicestershire',
    'MIAM certificate Leicester',
    'child arrangements Nottingham',
    'financial divorce mediation Lincoln',
    'family court mediation Rutland',
    'Form C100 mediation',
  ],
  authors: [{ name: ALDERTON_BRAND.brandName }],
  creator: ALDERTON_BRAND.brandName,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: ALDERTON_BRAND.siteUrl,
    title: `${ALDERTON_BRAND.brandName} | UK Family Mediation Practice`,
    description:
      'Accredited family dispute resolution across the East Midlands. Resolve parenting routines and financial settlements without court litigation.',
    siteName: ALDERTON_BRAND.brandName,
    images: [
      {
        url: '/images/hero-mediation.webp',
        width: 1200,
        height: 630,
        alt: `${ALDERTON_BRAND.brandName} - Professional Family Mediation`,
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
  const businessSchema = generateLocalBusinessSchema(ALDERTON_BRAND);

  return (
    <html lang="en-GB" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        {ALDERTON_BRAND.googleSiteVerification && (
          <meta name="google-site-verification" content={ALDERTON_BRAND.googleSiteVerification} />
        )}
        {ALDERTON_BRAND.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ALDERTON_BRAND.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ALDERTON_BRAND.googleAnalyticsId}', {
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
        <meta name="theme-color" content="#0B192C" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900 pb-16 md:pb-0">
        <Header brand={ALDERTON_BRAND} brandVariant="alderton" />
        <main className="flex-grow">{children}</main>
        <Footer brand={ALDERTON_BRAND} brandVariant="alderton" />
        <MobileStickyBar brand={ALDERTON_BRAND} brandVariant="alderton" />
      </body>
    </html>
  );
}
