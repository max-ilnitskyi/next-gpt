import React, { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="mx-auto px-6 pt-6 pb-6 sm:px-10 sm:pt-8 md:pt-10 lg:pt-12 xl:pt-16 sm:pb-10 w-full max-w-screen-md">
      {children}
    </div>
  );
}
