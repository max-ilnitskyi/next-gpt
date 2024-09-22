'use client';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

import { MessagesList } from '@/main/message/components/lists/MessagesList';
import { MessagesListLoading } from '@/main/message/components/lists/MessagesList.loading';
import { AlertMessage } from '@/helpers/AlertMessage';
import { LinkHelper } from '@/helpers/links/LinkHelper';
import { DeleteAllMessagesConfirmButton } from '../buttons/DeleteAllMessagesConfirmButton';

import { strings } from '@/texts';
import { AppPath } from '@/common/AppPath';

interface MessagesBlockProps {
  title: string;
  messages: {
    id: number;
    content: string;
    valence: number;
    arousal: number;
    createdAt: string;
  }[];
  messagesLoading?: boolean;
  messagesErrorMessage?: string | null;
  withDeleteButton?: boolean;
  withDeleteAllButton?: boolean;
  loadingItemsCount?: number;
  cacheKeys?: string[];
}

export function MessagesBlock({
  title,
  messages,
  messagesLoading,
  messagesErrorMessage,
  withDeleteButton,
  withDeleteAllButton,
  loadingItemsCount,
  cacheKeys,
}: MessagesBlockProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold mb-4 px-2 text-center">{title}</h1>
        {withDeleteAllButton ? (
          <DeleteAllMessagesConfirmButton
            className="mr-2 flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            cacheKeys={cacheKeys}
          >
            <span>{strings.clearAll}</span>
            <XMarkIcon className="size-4 ml-1" />
          </DeleteAllMessagesConfirmButton>
        ) : null}
      </div>
      <MessagesListLoading
        loaded={!messagesLoading}
        itemsCount={loadingItemsCount}
      >
        <AlertMessage message={messagesErrorMessage} />
        {isEmpty(messages) && !messagesErrorMessage ? (
          <div className="text-center p-4">
            <p>{strings.thereIsNoMessagesYet}</p>
            <p className="mt-2">
              <LinkHelper
                className="underline hover:no-underline text-lg font-bold"
                text={strings.goToTheAnalyzer}
                href={AppPath.home()}
              />
            </p>
          </div>
        ) : (
          <MessagesList
            messages={messages}
            withDeleteButton={withDeleteButton}
            cacheKeys={cacheKeys}
          />
        )}
      </MessagesListLoading>
    </div>
  );
}
