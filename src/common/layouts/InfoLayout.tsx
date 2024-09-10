import React, { ReactNode } from 'react';

interface InfoLayoutProps {
  children: ReactNode;
}

export function InfoLayout({ children }: InfoLayoutProps) {
  return (
    <div className="h-full flex">
      <div className="h-full mx-auto px-6 sm:px-10 pt-20 pb-10 max-w-screen-md">
        {children}
      </div>
    </div>
  );
}
