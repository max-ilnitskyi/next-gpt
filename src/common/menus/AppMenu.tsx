import React from 'react';
import cl from 'classnames';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import { useToggle } from '@/common/hooks/useToggle';

import { LinkHelper } from '@/helpers/links/LinkHelper';
import { BaseButtonHelper } from '@/helpers/buttons/BaseButtonHelper';

import { AppPath } from '@/common/AppPath';
import { words } from '@/texts';

export function AppMenu() {
  const [showMobileMenu, toggleMobileMenu] = useToggle();

  return (
    <nav>
      <BaseButtonHelper className="block md:hidden" onClick={toggleMobileMenu}>
        <Bars3Icon className="w-8 h-8" />
      </BaseButtonHelper>
      <div
        className={cl(
          'z-5 bg-gray-800 absolute top-full left-0 right-0 border-gray-500 border-y md:border-0 drop-shadow-xl md:static md:flex',
          showMobileMenu ? null : 'hidden',
        )}
      >
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-900 hover:bg-opacity-40"
          href={AppPath.home()}
          text={words.home}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-900 hover:bg-opacity-40"
          href={AppPath.examples()}
          text={words.examples}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-900 hover:bg-opacity-40"
          href={AppPath.myMessages()}
          text={words.myMessages}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-900 hover:bg-opacity-40"
          href={AppPath.howItWorks()}
          text={words.howItWorks}
          onClick={toggleMobileMenu}
        />
        <LinkHelper
          className="block p-4 md:p-4 lg:p-6 text-center text-gray-100 hover:bg-gray-900 hover:bg-opacity-40"
          href={AppPath.contacts()}
          text={words.contacts}
          onClick={toggleMobileMenu}
        />
      </div>
    </nav>
  );
}
