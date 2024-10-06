import {
  classifyMessageValenceAndArousal,
  ClassifyMessageValenceAndArousalMessage,
} from './classifyMessageValenceAndArousal';
import {
  MessageValenceClassification,
  MessageArousalClassification,
} from '@/main/message/messageTypes';

describe('classifyMessageValenceAndArousal', () => {
  it('should classify both valence and arousal correctly', () => {
    const message = { valence: 0.75, arousal: 0.75 };
    const result = classifyMessageValenceAndArousal(message);
    expect(result.valenceClassification).toBe(
      MessageValenceClassification.STRONG_POSITIVE,
    );
    expect(result.arousalClassification).toBe(
      MessageArousalClassification.HIGH,
    );
  });

  it('should return null for invalid valence and arousal', () => {
    const message = { valence: -1.1, arousal: -1.1 };
    const result = classifyMessageValenceAndArousal(message);
    expect(result.valenceClassification).toBeNull();
    expect(result.arousalClassification).toBeNull();
  });

  it('should handle edge cases for valence and arousal', () => {
    const message = { valence: 0.33, arousal: 0.33 };
    const result = classifyMessageValenceAndArousal(message);
    expect(result.valenceClassification).toBe(
      MessageValenceClassification.POSITIVE,
    );
    expect(result.arousalClassification).toBe(
      MessageArousalClassification.MEDIUM,
    );
  });

  it('should return null for non-numeric input', () => {
    const message = { valence: null, arousal: null };
    const result = classifyMessageValenceAndArousal(
      message as unknown as ClassifyMessageValenceAndArousalMessage,
    );
    expect(result.valenceClassification).toBeNull();
    expect(result.arousalClassification).toBeNull();
  });
});
