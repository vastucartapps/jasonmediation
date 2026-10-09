import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { MobileTrustBar } from '../components/MobileTrustBar';
import { MatomoTracker } from '../components/MatomoTracker';

export const metadata: Metadata = {
  metadataBase: new URL('https://trustlypharma.uk'),
  title: {
    template: '%s',
    default: 'Trustly Pharma | UK & International Peptide Index',
  },
  alternates: {
    canonical: 'https://trustlypharma.uk/',
  },
  description:
    'Peer-reviewed peptide research index, verified PubChem chemical structures, CAS registry numbers, and third-party commercial laboratory vendor directories.',
  keywords: [
    'peptide research index',
    'chemical sequence encyclopedia',
    'HPLC peptide testing transparency',
    'BPC-157 CAS number',
    'TB-500 amino acid sequence',
    'laboratory grade peptides',
    'in vitro research chemicals',
  ],
  authors: [{ name: 'Trustly Pharma Editorial & Analytical Board' }],
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://trustlypharma.uk/',
    siteName: 'Trustly Pharma',
    title: 'Trustly Pharma | UK & International Peptide Index',
    description:
      'Peer-reviewed peptide research index, verified PubChem chemical structures, CAS registry numbers, and commercial laboratory vendor directories.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustly Pharma | UK & International Peptide Index',
    description:
      'Academic peptide reference catalog and commercial laboratory vendor sourcing catalogues.',
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
  other: {
    'geo.region': 'GB-ENG',
    'geo.placename': 'London, United Kingdom',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.uk/#website',
        url: 'https://trustlypharma.uk/',
        name: 'Trustly Pharma',
        description:
          'UK & International Peptide Index & Analytical Chemical Reference Repository',
        inLanguage: 'en-GB',
        publisher: {
          '@id': 'https://trustlypharma.uk/#organization',
        },
      },
      {
        '@type': 'ResearchOrganization',
        '@id': 'https://trustlypharma.uk/#organization',
        name: 'Trustly Pharma',
        url: 'https://trustlypharma.uk/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://trustlypharma.uk/icon.svg',
          width: 512,
          height: 512,
        },
        description:
          'Curated molecular profiles, CAS registry numbers, amino acid sequence structures, and peer-reviewed PubMed citations for synthetic research peptides.',
        sameAs: [
          'https://pubchem.ncbi.nlm.nih.gov/',
          'https://www.uniprot.org/',
          'https://pubmed.ncbi.nlm.nih.gov/',
        ],
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'United Kingdom',
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        <MatomoTracker />
      </head>
      <body className="min-h-screen bg-[#02102b] text-slate-100 flex flex-col antialiased selection:bg-amber-400 selection:text-slate-950 pb-16 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <MobileTrustBar />
      </body>
    </html>
  );
}
