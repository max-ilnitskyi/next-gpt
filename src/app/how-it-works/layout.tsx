import type { Metadata } from 'next';

import { InfoLayout } from '@/common/layouts/InfoLayout';

import { pages } from '@/texts';

export const metadata: Metadata = {
  title: pages.howItWorks.title,
  description: pages.howItWorks.description,
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InfoLayout>{children}</InfoLayout>;
}
