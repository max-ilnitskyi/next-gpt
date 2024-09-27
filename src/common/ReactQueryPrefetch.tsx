import { ReactNode } from 'react';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

import { AppQueryClient } from '@/utils/AppQueryClient';

interface ReactQueryPrefetchProps {
  prefetch: (queryClient: QueryClient) => Promise<unknown>;
  children: ReactNode;
}

export async function ReactQueryPrefetch({
  prefetch,
  children,
}: ReactQueryPrefetchProps) {
  return <>{children}</>;
  const queryClient = AppQueryClient.get();

  await prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
