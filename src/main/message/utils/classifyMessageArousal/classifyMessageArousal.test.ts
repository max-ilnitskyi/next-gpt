import { classifyMessageArousal } from './classifyMessageArousal';
import { MessageArousalClassification } from '@/main/message/messageTypes';

describe('classifyMessageArousal', () => {
  it('should return HIGH for arousal >= 0.66', () => {
    expect(classifyMessageArousal(0.66)).toBe(
      MessageArousalClassification.HIGH,
    );
    expect(classifyMessageArousal(0.75)).toBe(
      MessageArousalClassification.HIGH,
    );
    expect(classifyMessageArousal(1)).toBe(MessageArousalClassification.HIGH);
  });

  it('should return MEDIUM for arousal >= 0.33 and < 0.66', () => {
    expect(classifyMessageArousal(0.33)).toBe(
      MessageArousalClassification.MEDIUM,
    );
    expect(classifyMessageArousal(0.5)).toBe(
      MessageArousalClassification.MEDIUM,
    );
    expect(classifyMessageArousal(0.65)).toBe(
      MessageArousalClassification.MEDIUM,
    );
  });

  it('should return LOW for arousal >= 0 and < 0.33', () => {
    expect(classifyMessageArousal(0)).toBe(MessageArousalClassification.LOW);
    expect(classifyMessageArousal(0.1)).toBe(MessageArousalClassification.LOW);
    expect(classifyMessageArousal(0.32)).toBe(MessageArousalClassification.LOW);
  });

  it('should return null for arousal < 0', () => {
    expect(classifyMessageArousal(-0.1)).toBeNull();
    expect(classifyMessageArousal(-1)).toBeNull();
  });

  it('should return null for non-numeric input', () => {
    expect(classifyMessageArousal(NaN)).toBeNull();
    expect(classifyMessageArousal(null as unknown as number)).toBeNull();
    expect(classifyMessageArousal(undefined as unknown as number)).toBeNull();
    expect(classifyMessageArousal('string' as unknown as number)).toBeNull();
    expect(classifyMessageArousal({} as unknown as number)).toBeNull();
    expect(classifyMessageArousal([] as unknown as number)).toBeNull();
  });
});
