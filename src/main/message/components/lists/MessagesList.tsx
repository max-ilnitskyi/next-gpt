import React from 'react';
import map from 'lodash/map';

import { MessageCard } from '../cards/MessageCard';

interface MessagesListProps {
  messages: {
    id: number;
    content: string;
    valence: number;
    arousal: number;
    createdAt: string;
  }[];
  withDeleteButton?: boolean;
  cacheKeys?: string[];
}

export function MessagesList({
  messages,
  withDeleteButton,
  cacheKeys,
}: MessagesListProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {map(messages, (message) => (
        <div key={message.id} className="grow w-full p-2">
          <MessageCard
            message={message}
            withDeleteButton={withDeleteButton}
            cacheKeys={cacheKeys}
          />
        </div>
      ))}
    </div>
  );
}
