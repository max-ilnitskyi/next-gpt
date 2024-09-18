'use client';
import React from 'react';

import { useMessagesCount } from '@/main/message/hooks/useMessagesCount';
import { BaseLinkHelper } from '@/helpers/links/BaseLinkHelper';

import { AppPath } from '@/common/AppPath';
import { pages } from '@/texts';

interface AppMenuMyMessagesLinkProps {
  className: string;
  onClick?: () => void;
}

export function AppMenuMyMessagesLink({
  className,
  onClick,
}: AppMenuMyMessagesLinkProps) {
  const { messagesCount } = useMessagesCount();

  if (!messagesCount) {
    return;
  }

  return (
    <BaseLinkHelper
      className={className}
      href={AppPath.myMessages()}
      onClick={onClick}
    >
      <span>{pages.myMessages.shortName}</span>
      <span className="ml-1 font-bold">({messagesCount})</span>
    </BaseLinkHelper>
  );
}
