'use client';
import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { MessagesList } from '@/main/message/components/lists/MessagesList';
import { MessagesListLoading } from '@/main/message/components/lists/MessagesList.loading';
import { AlertMessage } from '@/helpers/AlertMessage';
import { LinkHelper } from '@/helpers/links/LinkHelper';

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
  cacheKeys?: string[];
}

export function MessagesBlock({
  title,
  messages,
  messagesLoading,
  messagesErrorMessage,
  withDeleteButton,
  cacheKeys,
}: MessagesBlockProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 px-2 text-center">{title}</h1>
      <MessagesListLoading loaded={!messagesLoading}>
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
