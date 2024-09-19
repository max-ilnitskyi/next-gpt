'use client';
import React from 'react';

import { useMessages, cacheKey } from '@/main/message/hooks/useMessages';

import { pages } from '@/texts';
import { MessagesBlock } from '@/main/message/components/blocks/MessagesBlock';

import { MessageCacheKey } from '@/main/message/MessageCacheKey';

const cacheKeys = [cacheKey, MessageCacheKey.count()];

export function MyMessagesPage() {
  const { messages, messagesLoading, messagesErrorMessage } = useMessages();

  return (
    <MessagesBlock
      title={pages.myMessages.shortName}
      messages={messages}
      messagesLoading={messagesLoading}
      messagesErrorMessage={messagesErrorMessage}
      withDeleteButton
      cacheKeys={cacheKeys}
      loadingItemsCount={2}
    />
  );
}
