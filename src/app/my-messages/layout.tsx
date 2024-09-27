import type { Metadata } from 'next';

import { ContentLayout } from '@/common/layouts/ContentLayout';
import { ReactQueryPrefetch } from '@/common/ReactQueryPrefetch';

import { myMessagesRQPrefetch } from '@/common/prefetch/myMessagesRQPrefetch';

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
  return (
    <ContentLayout>
      <ReactQueryPrefetch prefetch={myMessagesRQPrefetch}>
        {children}
      </ReactQueryPrefetch>
    </ContentLayout>
  );
}
