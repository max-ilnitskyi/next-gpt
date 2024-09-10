import type { Metadata } from 'next';

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
  return <>{children}</>;
}
