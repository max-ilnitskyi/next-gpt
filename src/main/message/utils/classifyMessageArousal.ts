import { MessageArousalClassification } from '../messageTypes';

export function classifyMessageArousal(
  arousal: number,
): MessageArousalClassification | null {
  if (arousal >= 7) {
    return MessageArousalClassification.HIGH;
  }

  if (arousal >= 3) {
    return MessageArousalClassification.MEDIUM;
  }

  if (arousal >= 0) {
    return MessageArousalClassification.LOW;
  }

  return null;
}
