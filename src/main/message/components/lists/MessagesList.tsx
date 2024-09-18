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
}

export function MessagesList({ messages }: MessagesListProps) {
  return (
    <div
      // className="px-4 grid grid-cols-auto-fill grid-cell-min-48 xl:grid-cell-min-52 2xl:grid-cell-min-64 3xl:grid-cell-min-72 gap-4 xl:gap-8 2xl:gap-12"
      className="flex flex-wrap justify-center"
    >
      {map(messages, (message) => (
        <div key={message.id} className="grow w-full p-2">
          <MessageCard message={message} />
        </div>
      ))}
    </div>
  );
}
