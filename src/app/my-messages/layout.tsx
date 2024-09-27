import type { Metadata } from 'next';

import { ContentLayout } from '@/common/layouts/ContentLayout';

import { pages } from '@/texts';

export const metadata: Metadata = {
  title: pages.myMessages.title,
  description: pages.myMessages.description,
};

export default function MyMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}
