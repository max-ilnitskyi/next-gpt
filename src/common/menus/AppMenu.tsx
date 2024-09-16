'use client';
import React from 'react';
import cl from 'classnames';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import { useToggle } from '@/common/hooks/useToggle';

import { LinkHelper } from '@/helpers/links/LinkHelper';
import { BaseButtonHelper } from '@/helpers/buttons/BaseButtonHelper';

import { AppPath } from '@/common/AppPath';
import { pages } from '@/texts';

export function AppMenu() {
  const [showMobileMenu, toggleMobileMenu] = useToggle();

  return (
    <nav>
      <BaseButtonHelper className="block md:hidden" onClick={toggleMobileMenu}>
        <Bars3Icon className="h-12 w-12" />
      </BaseButtonHelper>
      <div
        className={cl(
          'z-5 bg-gray-900 md:bg-transparent absolute top-full left-0 right-0 border-gray-700 border-y md:border-0 drop-shadow-xl md:static md:flex',
          'bg-gradient-to-r from-[#000036] to-[#290011] md:from-transparent md:to-transparent',
          showMobileMenu ? null : 'hidden',
        )}
      >
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-100 hover:bg-opacity-10 uppercase"
          href={AppPath.home()}
          text={pages.home.shortName}
          onClick={toggleMobileMenu}
        />
        {/* <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-100 hover:bg-opacity-10 uppercase"
          href={AppPath.examples()}
          text={pages.examples.shortName}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-100 hover:bg-opacity-10 uppercase"
          href={AppPath.myMessages()}
          text={pages.myMessages.shortName}
          onClick={toggleMobileMenu}
        /> */}
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-100 hover:bg-opacity-10 uppercase"
          href={AppPath.howItWorks()}
          text={pages.howItWorks.shortName}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-100 hover:bg-opacity-10 uppercase"
          href={AppPath.contacts()}
          text={pages.contacts.shortName}
          onClick={toggleMobileMenu}
        />
      </div>
    </nav>
  );
}
