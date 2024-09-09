'use client';
import React, { ReactNode } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';

import { AppHeader } from '@/common/headers/AppHeader';

import { AlertMessage } from '@/helpers/AlertMessage';
import { Loading } from '@/helpers/Loading';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, currentUserLoading, currentUserErrorMessage } =
    useAuth();
  return (
    <div className="h-full bg-gradient-to-br from-indigo-950 via-gray-900 to-pink-950">
      <AlertMessage message={currentUserErrorMessage} />
      <Loading loaded={!currentUserLoading}>
        {currentUser ? (
          <div className="h-full">
            <AppHeader />
            <main className="h-full">{children}</main>
          </div>
        ) : null}
      </Loading>
    </div>
  );
}
