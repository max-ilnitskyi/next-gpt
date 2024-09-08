'use client';
import { useAuth } from '@/auth/hooks/useAuth';
import { AlertMessage } from '@/helpers/AlertMessage';
import { Loading } from '@/helpers/Loading';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, currentUserLoading, currentUserErrorMessage } =
    useAuth();
  return (
    <div className="h-full">
      <AlertMessage message={currentUserErrorMessage} />
      <Loading loaded={!currentUserLoading}>
        {/* temp */}
        {currentUser ? currentUser.id : null}

        {currentUser ? children : null}
      </Loading>
    </div>
  );
}
