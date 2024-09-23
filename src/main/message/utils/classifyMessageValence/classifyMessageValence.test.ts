import { classifyMessageValence } from './classifyMessageValence';
import { MessageValenceClassification } from '@/main/message/messageTypes';

describe('classifyMessageValence', () => {
  it('should return STRONG_POSITIVE for valence >= 0.66', () => {
    expect(classifyMessageValence(0.66)).toBe(
      MessageValenceClassification.STRONG_POSITIVE,
    );
    expect(classifyMessageValence(0.75)).toBe(
      MessageValenceClassification.STRONG_POSITIVE,
    );
    expect(classifyMessageValence(1)).toBe(
      MessageValenceClassification.STRONG_POSITIVE,
    );
  });

  it('should return POSITIVE for valence >= 0.33 and < 0.66', () => {
    expect(classifyMessageValence(0.33)).toBe(
      MessageValenceClassification.POSITIVE,
    );
    expect(classifyMessageValence(0.5)).toBe(
      MessageValenceClassification.POSITIVE,
    );
    expect(classifyMessageValence(0.65)).toBe(
      MessageValenceClassification.POSITIVE,
    );
  });

  it('should return NEUTRAL for valence > -0.33 and < 0.33', () => {
    expect(classifyMessageValence(0)).toBe(
      MessageValenceClassification.NEUTRAL,
    );
    expect(classifyMessageValence(0.1)).toBe(
      MessageValenceClassification.NEUTRAL,
    );
    expect(classifyMessageValence(-0.1)).toBe(
      MessageValenceClassification.NEUTRAL,
    );
  });

  it('should return NEGATIVE for valence > -0.66 and <= -0.33', () => {
    expect(classifyMessageValence(-0.33)).toBe(
      MessageValenceClassification.NEGATIVE,
    );
    expect(classifyMessageValence(-0.5)).toBe(
      MessageValenceClassification.NEGATIVE,
    );
    expect(classifyMessageValence(-0.65)).toBe(
      MessageValenceClassification.NEGATIVE,
    );
  });

  it('should return STRONG_NEGATIVE for valence > -1 and <= -0.66', () => {
    expect(classifyMessageValence(-0.66)).toBe(
      MessageValenceClassification.STRONG_NEGATIVE,
    );
    expect(classifyMessageValence(-0.9)).toBe(
      MessageValenceClassification.STRONG_NEGATIVE,
    );
  });

  it('should return null for valence <= -1', () => {
    expect(classifyMessageValence(-1)).toBeNull();
    expect(classifyMessageValence(-1.1)).toBeNull();
  });

  it('should return null for non-numeric input', () => {
    expect(classifyMessageValence(NaN)).toBeNull();
    expect(classifyMessageValence(null as unknown as number)).toBeNull();
    expect(classifyMessageValence(undefined as unknown as number)).toBeNull();
    expect(classifyMessageValence('string' as unknown as number)).toBeNull();
    expect(classifyMessageValence({} as unknown as number)).toBeNull();
    expect(classifyMessageValence([] as unknown as number)).toBeNull();
  });
});
