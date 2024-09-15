import React from 'react';

import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '../../messageTypes';

import { classifyMessageValenceAndArousal } from '../../utils/classifyMessageValenceAndArousal';

import { strings, words } from '@/texts';

const messageValenceDescriptions: Record<MessageValenceClassification, string> =
  {
    [MessageValenceClassification.STRONG_NEGATIVE]:
      strings.valenceClassification.strong_negative,
    [MessageValenceClassification.NEGATIVE]:
      strings.valenceClassification.negative,
    [MessageValenceClassification.NEUTRAL]:
      strings.valenceClassification.neutral,
    [MessageValenceClassification.POSITIVE]:
      strings.valenceClassification.positive,
    [MessageValenceClassification.STRONG_POSITIVE]:
      strings.valenceClassification.strong_positive,
  };
const messageArousalDescriptions: Record<MessageArousalClassification, string> =
  {
    [MessageArousalClassification.LOW]: strings.arousalClassification.low,
    [MessageArousalClassification.MEDIUM]: strings.arousalClassification.medium,
    [MessageArousalClassification.HIGH]: strings.arousalClassification.high,
  };

interface MessageDescriptionProps {
  message: {
    valence: number;
    arousal: number;
  };
}

export function MessageDescription({ message }: MessageDescriptionProps) {
  const { arousalClassification, valenceClassification } =
    classifyMessageValenceAndArousal(message);

  return (
    <div className="p-2 md:p-4 w-full space-y-2 md:space-y-4">
      <h2 className="text-lg md:text-xl font-bold">{words.description}</h2>

      {/* Valence description */}
      <div>
        <h3>
          <span className="text-base md:text-lg  font-bold">
            {words.valence}: {message.valence}
          </span>
          <span className="font-normal text-xs md:text-base">{`(${strings.fromMinus1to1})`}</span>
        </h3>
        <p className="leading-4">
          {messageValenceDescriptions[
            valenceClassification as MessageValenceClassification
          ] || words.unknown}
        </p>
      </div>

      {/* Arousal description */}
      <div>
        <h3>
          <span className="text-base md:text-lg font-bold">
            {words.arousal}: {message.arousal}
          </span>
          <span className="font-normal text-xs md:text-base">{`(${strings.from0to1})`}</span>
        </h3>
        <p className="leading-4">
          {messageArousalDescriptions[
            arousalClassification as MessageArousalClassification
          ] || words.unknown}
        </p>
      </div>
    </div>
  );
}
