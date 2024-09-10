'use client';
import React, { ReactNode } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';

import { AppHeader } from '@/common/headers/AppHeader';
import { AppFooter } from '../footers/AppFooter';

import { AlertMessage } from '@/helpers/AlertMessage';
import { Loading } from '@/helpers/Loading';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, currentUserLoading, currentUserErrorMessage } =
    useAuth();
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-pink-950">
      <AlertMessage message={currentUserErrorMessage} />
      <Loading loaded={!currentUserLoading}>
        {currentUser ? (
          <div className="h-screen flex flex-col overflow-y-auto">
            <AppHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <AppFooter />
          </div>
        ) : null}
      </Loading>
    </div>
  );
}
