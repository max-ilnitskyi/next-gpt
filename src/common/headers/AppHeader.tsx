import React from 'react';

import { AppMenu } from '@/common/menus/AppMenu';

export function AppHeader() {
  return (
    <header className="drop-shadow-md shrink-0 border-gray-700 border-b z-5 sticky relative top-0 w-full px-6 sm:px-10 bg-gradient-to-r from-[#000036] to-[#2e0c1a] flex justify-between items-center">
      <div />

      <AppMenu />
    </header>
  );
}
