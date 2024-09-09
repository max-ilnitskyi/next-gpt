import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '../messageTypes';

import { classifyMessageArousal } from './classifyMessageArousal';
import { classifyMessageValence } from './classifyMessageValence';

interface ClassifyMessageValenceAndArousalMessage {
  valence: number;
  arousal: number;
}

interface ClassifyMessageValenceAndArousalReturn {
  valenceClassification: MessageValenceClassification | null;
  arousalClassification: MessageArousalClassification | null;
}

export function classifyMessageValenceAndArousal(
  message: ClassifyMessageValenceAndArousalMessage,
): ClassifyMessageValenceAndArousalReturn {
  return {
    arousalClassification: classifyMessageArousal(message.arousal),
    valenceClassification: classifyMessageValence(message.valence),
  };
}
