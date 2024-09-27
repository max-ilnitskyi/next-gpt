import type { Metadata } from 'next';

import { ContentLayout } from '@/common/layouts/ContentLayout';
import { ReactQueryPrefetch } from '@/common/ReactQueryPrefetch';

import { examplesRQPrefetch } from '@/common/prefetch/examplesRQPrefetch';

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
  return (
    <ContentLayout>
      <ReactQueryPrefetch prefetch={examplesRQPrefetch}>
        {children}
      </ReactQueryPrefetch>
    </ContentLayout>
  );
}
