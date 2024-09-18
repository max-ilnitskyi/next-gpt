import React, { ReactNode } from 'react';
import map from 'lodash/map';
import range from 'lodash/range';

import { MessageCardLoading } from '../cards/MessageCard.loading';

interface MessagesListProps {
  children?: ReactNode;
  loaded?: boolean;
  itemsCount?: number;
}

export function MessagesListLoading({
  children,
  loaded,
  itemsCount = 4,
}: MessagesListProps) {
  if (loaded) {
    return children;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {map(range(itemsCount), (i) => (
        <div key={i} className="grow w-full p-2">
          <MessageCardLoading />
        </div>
      ))}
    </div>
  );
}
