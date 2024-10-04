import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '@/main/message/messageTypes';

import { classifyMessageArousal } from '@/main/message/utils/classifyMessageArousal';
import { classifyMessageValence } from '@/main/message/utils/classifyMessageValence';

export interface ClassifyMessageValenceAndArousalMessage {
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
