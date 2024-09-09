import { MessageValenceClassification } from '../messageTypes';

export function classifyMessageValence(
  valence: number,
): MessageValenceClassification | null {
  if (valence >= 0.7) {
    return MessageValenceClassification.STRONG_POSITIVE;
  }

  if (valence >= 0.3) {
    return MessageValenceClassification.POSITIVE;
  }

  if (valence > -0.3) {
    return MessageValenceClassification.NEUTRAL;
  }

  if (valence > -0.7) {
    return MessageValenceClassification.NEGATIVE;
  }

  if (valence > -1) {
    return MessageValenceClassification.STRONG_NEGATIVE;
  }

  return null;
}
