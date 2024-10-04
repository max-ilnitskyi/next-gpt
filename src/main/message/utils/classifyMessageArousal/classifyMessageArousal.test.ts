import { classifyMessageArousal } from './classifyMessageArousal';
import { MessageArousalClassification } from '@/main/message/messageTypes';

describe('classifyMessageArousal', () => {
  it('should return HIGH for arousal >= 0.66', () => {
    [0.66, 0.75, 1].forEach((arousal) => {
      expect(classifyMessageArousal(arousal)).toBe(
        MessageArousalClassification.HIGH,
      );
    });
  });

  it('should return MEDIUM for arousal >= 0.33 and < 0.66', () => {
    [0.33, 0.5, 0.65].forEach((arousal) => {
      expect(classifyMessageArousal(arousal)).toBe(
        MessageArousalClassification.MEDIUM,
      );
    });
  });

  it('should return LOW for arousal >= 0 and < 0.33', () => {
    [0, 0.1, 0.32].forEach((arousal) => {
      expect(classifyMessageArousal(arousal)).toBe(
        MessageArousalClassification.LOW,
      );
    });
  });

  it('should return null for arousal < 0', () => {
    [-0.1, -1].forEach((arousal) => {
      expect(classifyMessageArousal(arousal)).toBeNull();
    });
  });

  it('should return null for non-numeric input', () => {
    [NaN, null, undefined, 'string', {}, []].forEach((arousal) => {
      expect(classifyMessageArousal(arousal as unknown as number)).toBeNull();
    });
  });
});
