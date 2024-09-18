import React, { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import { words } from '@/texts';

interface MessageCardLoadingProps {
  children?: ReactNode;
  loaded?: boolean;
}

export function MessageCardLoading({
  children,
  loaded,
}: MessageCardLoadingProps) {
  if (loaded) {
    return children;
  }

  return (
    <div className="w-full">
      <div className="relative bg-white text-gray-900 p-2 sm:p-6 rounded-lg shadow-lg w-full border-8 border-gray-500">
        {/* Message content */}
        <div className="w-full h-36 p-2 border border-gray-300 rounded overflow-y-auto">
          <span>
            <Skeleton count={5} />
          </span>
        </div>

        {/* Emotional indicators */}
        <div className="mt-2 sm:mt-4 flex items-center justify-between flex-col sm:flex-row">
          <div className="flex flex-wrap justify-around">
            {/* Valence indicator */}
            <div className="flex items-center px-1">
              <span className="sm:text-lg font-medium mr-2">
                {words.valence}:
              </span>
              <span className="sm:text-lg font-bold">
                <Skeleton width={32} />
              </span>
            </div>

            {/* Arousal indicator */}
            <Skeleton />
            <div className="flex items-center px-1">
              <span className="sm:text-lg font-medium mr-2">
                {words.arousal}:
              </span>
              <span className="sm:text-lg font-bold">
                <Skeleton width={32} />
              </span>
            </div>
          </div>

          <div className="size-10">
            <Skeleton className="size-10 shrink-0 text-gray-500" circle />
          </div>
        </div>
      </div>
    </div>
  );
}
