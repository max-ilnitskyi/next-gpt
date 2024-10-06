import { classifyMessageValence } from './classifyMessageValence';
import { MessageValenceClassification } from '@/main/message/messageTypes';

describe('classifyMessageValence', () => {
  it('should return STRONG_POSITIVE for valence >= 0.66', () => {
    [0.66, 0.75, 1].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBe(
        MessageValenceClassification.STRONG_POSITIVE,
      );
    });
  });

  it('should return POSITIVE for valence >= 0.33 and < 0.66', () => {
    [0.33, 0.5, 0.65].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBe(
        MessageValenceClassification.POSITIVE,
      );
    });
  });

  it('should return NEUTRAL for valence > -0.33 and < 0.33', () => {
    [0, 0.1, -0.1].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBe(
        MessageValenceClassification.NEUTRAL,
      );
    });
  });

  it('should return NEGATIVE for valence > -0.66 and <= -0.33', () => {
    [0.33, 0.5, 0.65].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBe(
        MessageValenceClassification.POSITIVE,
      );
    });
  });

  it('should return STRONG_NEGATIVE for valence > -1 and <= -0.66', () => {
    [-0.66, -0.9].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBe(
        MessageValenceClassification.STRONG_NEGATIVE,
      );
    });
  });

  it('should return null for valence <= -1', () => {
    [-1, -1.1].forEach((valence) => {
      expect(classifyMessageValence(valence)).toBeNull();
    });
  });

  it('should return null for non-numeric input', () => {
    [NaN, null, undefined, 'string', {}, []].forEach((valence) => {
      expect(classifyMessageValence(valence as unknown as number)).toBeNull();
    });
  });
});
