'use client';
import React from 'react';

import { useMessages } from '@/main/message/hooks/useMessages';

import { pages } from '@/texts';
import { MessagesBlock } from '@/main/message/components/blocks/MessagesBlock';

export function MyMessagesPage() {
  const { messages, messagesLoading, messagesErrorMessage } = useMessages();

  return (
    <MessagesBlock
      title={pages.myMessages.shortName}
      messages={messages}
      messagesLoading={messagesLoading}
      messagesErrorMessage={messagesErrorMessage}
    />
  );
}
