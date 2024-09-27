'use client';
import { ReactNode, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { AppQueryClient } from '@/utils/AppQueryClient';

export function AppProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => AppQueryClient.get());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
