'use client';
import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { MessagesList } from '@/main/message/components/lists/MessagesList';
import { MessagesListLoading } from '@/main/message/components/lists/MessagesList.loading';
import { AlertMessage } from '@/helpers/AlertMessage';

import { strings } from '@/texts';

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
}

export function MessagesBlock({
  title,
  messages,
  messagesLoading,
  messagesErrorMessage,
}: MessagesBlockProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 px-2">{title}</h1>
      <MessagesListLoading loaded={!messagesLoading}>
        <AlertMessage message={messagesErrorMessage} />
        {isEmpty(messages) && !messagesErrorMessage ? (
          <div>{strings.thereIsNoMessagesYet}</div>
        ) : (
          <MessagesList messages={messages} />
        )}
      </MessagesListLoading>
    </div>
  );
}
