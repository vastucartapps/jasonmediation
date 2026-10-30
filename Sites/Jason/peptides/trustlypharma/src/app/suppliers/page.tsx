import VendorsDirectoryPage from '../vendors/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Chemical Vendors | Trustly Pharma',
  description:
    'Directory of verified commercial chemical vendors and laboratory synthesis partners supplying research-grade peptides, solvents, and analytical accessories.',
  alternates: {
    canonical: 'https://trustlypharma.uk/vendors/',
  },
  openGraph: {
    title: 'Commercial Chemical Vendors | Trustly Pharma',
    description:
      'Directory of verified commercial chemical vendors and laboratory synthesis partners supplying research-grade peptides, solvents, and analytical accessories.',
    url: 'https://trustlypharma.uk/vendors/',
    siteName: 'Trustly Pharma',
    type: 'website',
    images: [
      {
        url: 'https://trustlypharma.uk/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Trustly Pharma Commercial Chemical Vendors Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Chemical Vendors | Trustly Pharma',
    description:
      'Directory of verified commercial chemical vendors and laboratory synthesis partners supplying research-grade peptides, solvents, and analytical accessories.',
    images: ['https://trustlypharma.uk/icon-512x512.png'],
  },
};

export default VendorsDirectoryPage;
