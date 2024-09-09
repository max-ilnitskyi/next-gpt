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
    <div className="h-full bg-gray-900">
      <AlertMessage message={currentUserErrorMessage} />
      <Loading loaded={!currentUserLoading}>
        {currentUser ? (
          <div className="h-full bg-gray-900 text-white flex flex-col items-center">
            <AppHeader />
            {children}
          </div>
        ) : null}
      </Loading>
    </div>
  );
}
