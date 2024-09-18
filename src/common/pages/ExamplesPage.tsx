'use client';
import React from 'react';

import { useExampleMessages } from '@/main/message/hooks/useExampleMessages';

import { MessagesBlock } from '@/main/message/components/blocks/MessagesBlock';

import { pages } from '@/texts';

export function ExamplesPage() {
  const {
    exampleMessages,
    exampleMessagesLoading,
    exampleMessagesErrorMessage,
  } = useExampleMessages();

  return (
    <MessagesBlock
      title={pages.examples.shortName}
      messages={exampleMessages}
      messagesLoading={exampleMessagesLoading}
      messagesErrorMessage={exampleMessagesErrorMessage}
    />
  );
}
