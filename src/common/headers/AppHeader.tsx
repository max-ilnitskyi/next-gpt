import React from 'react';

import { AppMenu } from '@/common/menus/AppMenu';

export function AppHeader() {
  return (
    <header className="z-10 sticky relative top-0 w-full px-10 bg-gray-950 bg-opacity-40 flex justify-between items-center">
      <div />

      <AppMenu />
    </header>
  );
}
