import React, { ReactNode } from 'react';

import { AppHeader } from '@/common/headers/AppHeader';
import { AppFooter } from '../footers/AppFooter';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-pink-950">
      <div className="h-screen flex flex-col overflow-y-auto">
        <AppHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
