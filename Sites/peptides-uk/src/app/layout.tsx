import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { MatomoTracker } from '@/components/MatomoTracker';
import { SITE_METADATA } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  keywords: [
    'UK peptides',
    'research peptides UK',
    'buy peptides UK research',
    'BPC-157 UK lab',
    'TB-500 UK supplier',
    'Semax UK',
    'GHK-Cu UK',
    'CJC-1295 UK',
    'Ipamorelin UK',
    'Tirzepatide peptide UK',
    'Semaglutide peptide UK',
    'HPLC verified peptides',
    'laboratory research chemicals UK',
  ],
  authors: [{ name: 'Peptides UK Laboratory Registry' }],
  creator: 'Peptides-UK.org Academic Editorial Desk',
  publisher: 'Peptides-UK.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_METADATA.url,
    types: {
      'text/markdown': `${SITE_METADATA.url}/llms-full.txt`,
    },
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: `${SITE_METADATA.url}/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Peptides UK British Laboratory Index',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
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
  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_METADATA.url}/#organization`,
        name: SITE_METADATA.name,
        url: SITE_METADATA.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_METADATA.url}/icon-512x512.png`,
          width: 512,
          height: 512,
        },
        description: SITE_METADATA.description,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'United Kingdom',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'laboratory inquiries',
          email: SITE_METADATA.contactEmail,
          availableLanguage: 'English',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.url}/#website`,
        url: SITE_METADATA.url,
        name: SITE_METADATA.name,
        description: SITE_METADATA.description,
        publisher: {
          '@id': `${SITE_METADATA.url}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_METADATA.url}/#catalog?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full Technical Compendium (LLMs)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden max-w-full">
        <Header />
        <main className="flex-1 w-full max-w-full overflow-hidden">{children}</main>
        <Footer />
        <CookieBanner />
        <MatomoTracker />
      </body>
    </html>
  );
}
