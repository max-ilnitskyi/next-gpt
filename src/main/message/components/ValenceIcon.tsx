import React from 'react';
import cl from 'classnames';
import includes from 'lodash/includes';

import FaceFrownIcon from '@heroicons/react/24/outline/FaceFrownIcon';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import ChatBubbleLeftEllipsisIcon from '@heroicons/react/24/outline/ChatBubbleLeftEllipsisIcon';

import { MessageValenceClassification } from '../messageTypes';

interface ValenceIconProps {
  valenceClassification: MessageValenceClassification;
  addClassName: string;
}

export function ValenceIcon({
  valenceClassification,
  addClassName,
}: ValenceIconProps) {
  if (
    includes(
      [
        MessageValenceClassification.NEGATIVE,
        MessageValenceClassification.STRONG_NEGATIVE,
      ],
      valenceClassification,
    )
  ) {
    return (
      <FaceFrownIcon
        className={cl(addClassName, {
          'text-red-500':
            valenceClassification ===
            MessageValenceClassification.STRONG_NEGATIVE,
          'text-pink-500':
            valenceClassification === MessageValenceClassification.NEGATIVE,
        })}
      />
    );
  }

  if (
    includes(
      [
        MessageValenceClassification.POSITIVE,
        MessageValenceClassification.STRONG_POSITIVE,
      ],
      valenceClassification,
    )
  ) {
    return (
      <FaceSmileIcon
        className={cl(addClassName, {
          'text-indigo-500':
            valenceClassification === MessageValenceClassification.POSITIVE,
          'text-green-500':
            valenceClassification ===
            MessageValenceClassification.STRONG_POSITIVE,
        })}
      />
    );
  }

  if (valenceClassification === MessageValenceClassification.NEUTRAL) {
    return (
      <ChatBubbleLeftEllipsisIcon
        className={cl(addClassName, 'text-gray-500')}
      />
    );
  }

  return null;
}
