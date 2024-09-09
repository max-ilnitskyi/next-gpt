import React from 'react';

import { AppMenu } from '@/common/menus/AppMenu';
import { BaseLinkHelper } from '@/helpers/links/BaseLinkHelper';

import { AppPublicIcons } from '@/common/AppPublicIcons';
import { AppPath } from '@/common/AppPath';

export function AppHeader() {
  return (
    <header className="z-10 sticky relative top-0 w-full px-10 bg-gray-800 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <BaseLinkHelper href={AppPath.home()}>
          <img
            className="h-12 w-12 lg:h-16 lg:w-16"
            src={AppPublicIcons.iconLight()}
          />
        </BaseLinkHelper>
      </div>
      <AppMenu />
    </header>
  );
}
