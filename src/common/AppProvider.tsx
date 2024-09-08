'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/auth/hooks/useAuth';

const queryClient = new QueryClient();

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
