'use client';
import React from 'react';

import { useMessages, cacheKey } from '@/main/message/hooks/useMessages';
import {
  useMessagesCount,
  cacheKey as countCacheKey,
} from '@/main/message/hooks/useMessagesCount';

import { pages } from '@/texts';
import { MessagesBlock } from '@/main/message/components/blocks/MessagesBlock';

const cacheKeys = [cacheKey, countCacheKey];

export function MyMessagesPage() {
  const { messages, messagesLoading, messagesErrorMessage } = useMessages();

  const { messagesCount } = useMessagesCount();

  return (
    <MessagesBlock
      title={pages.myMessages.shortName}
      messages={messages}
      messagesLoading={messagesLoading}
      messagesErrorMessage={messagesErrorMessage}
      withDeleteButton
      withDeleteAllButton={!!messagesCount}
      cacheKeys={cacheKeys}
      loadingItemsCount={2}
    />
  );
}
