import isNumber from 'lodash/isNumber';

import { MessageArousalClassification } from '@/main/message/messageTypes';

export function classifyMessageArousal(
  arousal: number,
): MessageArousalClassification | null {
  if (!isNumber(arousal)) {
    return null;
  }

  if (arousal >= 0.66) {
    return MessageArousalClassification.HIGH;
  }

  if (arousal >= 0.33) {
    return MessageArousalClassification.MEDIUM;
  }

  if (arousal >= 0) {
    return MessageArousalClassification.LOW;
  }

  return null;
}
