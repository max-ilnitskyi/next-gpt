import React from 'react';
import cl from 'classnames';

import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '../../messageTypes';

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
}

export function MessageCard({ message }: MessageCardProps) {
  const { arousalClassification, valenceClassification } =
    classifyMessageValenceAndArousal(message);

  return (
    <BaseTooltipHelper
      className="w-full"
      contentClassName="max-w-md bg-gray-200 text-gray-900 rounded-lg overflow-hidden drop-shadow-xl"
      content={<MessageDescription message={message} />}
    >
      <div
        className={cl(
          'relative bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full',
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
        {/* Message content */}
        <div className="w-full h-36 p-2 border border-gray-300 rounded mb-4 overflow-y-auto">
          <span>{message.content}</span>
        </div>

        {/* Emotional indicators */}
        <div className="mt-4 flex items-center justify-between">
          {/* Valence indicator */}
          <div className="flex items-center">
            <span className="text-lg font-medium mr-2">{words.valence}:</span>
            <span className="text-lg font-bold">{message.valence}</span>
          </div>

          {/* Arousal indicator */}
          <div className="flex items-center">
            <span className="text-lg font-medium mr-2">{words.arousal}:</span>
            <span className="text-lg font-bold">{message.arousal}</span>
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
