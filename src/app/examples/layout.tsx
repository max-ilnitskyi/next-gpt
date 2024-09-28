import type { Metadata } from 'next';

import { ContentLayout } from '@/common/layouts/ContentLayout';

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
  return <ContentLayout>{children}</ContentLayout>;
}
