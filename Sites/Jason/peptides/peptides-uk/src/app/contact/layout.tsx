import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Editorial Desk & Chemical Errata',
  description:
    'Submit chemical monograph corrections, peer-reviewed PubMed citations, and laboratory accreditation inquiries to the Peptides UK registry team.',
  path: '/contact/',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
