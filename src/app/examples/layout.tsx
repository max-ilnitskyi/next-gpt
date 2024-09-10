import type { Metadata } from 'next';

import { pages } from '@/texts';

export const metadata: Metadata = {
  title: pages.examples.title,
  description: pages.examples.description,
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
