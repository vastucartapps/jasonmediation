import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { MobileTrustBar } from '../components/MobileTrustBar';

export const metadata: Metadata = {
  metadataBase: new URL('https://trustlypharma.co.uk'),
  title: {
    template: '%s | Trustly Pharma — UK & International Peptide Index',
    default: 'Trustly Pharma | UK & International Peptide Index & Analytical Chemical Directory',
  },
  description:
    'Academic reference directory for synthetic research peptides. Features verified chemical formulas, CAS numbers, amino acid sequence profiles, HPLC purity standards, and commercial laboratory vendor sourcing catalogues.',
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
    url: 'https://trustlypharma.co.uk',
    siteName: 'Trustly Pharma',
    title: 'Trustly Pharma | UK & International Peptide Index & Analytical Chemical Directory',
    description:
      'Academic reference directory for synthetic research peptides. Features verified chemical formulas, CAS numbers, amino acid sequence profiles, HPLC purity standards, and commercial laboratory vendor sourcing catalogues.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustly Pharma | UK & International Peptide Index',
    description: 'Academic peptide reference catalog and commercial laboratory vendor sourcing catalogues.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
