import React from 'react';
import cl from 'classnames';

import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '../../messageTypes';

import { DeleteMessageButton } from '@/main/message/components/buttons/DeleteMessageButton';
import { MessageDescription } from './MessageDescription';
import { ValenceIcon } from '../ValenceIcon';
import { BaseTooltipHelper } from '@/helpers/tooltips/BaseTooltipHelper';

import { classifyMessageValenceAndArousal } from '../../utils/classifyMessageValenceAndArousal';

import { words } from '@/texts';

interface MessageCardProps {
  message: {
    id: number;
    content: string;
    valence: number;
    arousal: number;
    createdAt: string;
  };
  withDeleteButton?: boolean;
  cacheKeys?: string[];
}

export function MessageCard({
  message,
  withDeleteButton,
  cacheKeys,
}: MessageCardProps) {
  const { arousalClassification, valenceClassification } =
    classifyMessageValenceAndArousal(message);

  return (
    <BaseTooltipHelper
      className="w-full"
      contentClassName="z-20 bg-gray-200 text-gray-900 rounded-lg drop-shadow-xl"
      content={
        <div className="max-w-md">
          <MessageDescription message={message} />
        </div>
      }
    >
      <div
        className={cl(
          'relative bg-white text-gray-900 p-2 sm:p-6 rounded-lg shadow-lg w-full',
          {
            'border-4':
              arousalClassification === MessageArousalClassification.LOW,
            'border-6':
              arousalClassification === MessageArousalClassification.MEDIUM,
            'border-8':
              arousalClassification === MessageArousalClassification.HIGH,
            'border-red-500':
              valenceClassification ===
              MessageValenceClassification.STRONG_NEGATIVE,
            'border-pink-500':
              valenceClassification === MessageValenceClassification.NEGATIVE,
            'border-gray-500':
              valenceClassification === MessageValenceClassification.NEUTRAL,
            'border-indigo-500':
              valenceClassification === MessageValenceClassification.POSITIVE,
            'border-green-500':
              valenceClassification ===
              MessageValenceClassification.STRONG_POSITIVE,
          },
        )}
      >
        {withDeleteButton ? (
          <div className="absolute right-0 top-0">
            <DeleteMessageButton
              className="round rounded-full p-1 hover:scale-125"
              iconClassName="size-6"
              messageId={message.id}
              cacheKeys={cacheKeys}
            />
          </div>
        ) : null}

        {/* Message content */}
        <div className="w-full h-36 p-2 border border-gray-300 rounded overflow-y-auto">
          <span>{message.content}</span>
        </div>

        {/* Emotional indicators */}
        <div className="mt-2 sm:mt-4 flex items-center justify-between flex-col sm:flex-row">
          <div className="flex flex-wrap justify-around">
            {/* Valence indicator */}
            <div className="flex items-center px-1">
              <span className="sm:text-lg font-medium mr-2">
                {words.valence}:
              </span>
              <span className="sm:text-lg font-bold">{message.valence}</span>
            </div>

            {/* Arousal indicator */}
            <div className="flex items-center px-1">
              <span className="sm:text-lg font-medium mr-2">
                {words.arousal}:
              </span>
              <span className="sm:text-lg font-bold">{message.arousal}</span>
            </div>
          </div>

          {valenceClassification ? (
            <ValenceIcon
              addClassName="size-10"
              valenceClassification={valenceClassification}
            />
          ) : null}
        </div>
      </div>
    </BaseTooltipHelper>
  );
}
