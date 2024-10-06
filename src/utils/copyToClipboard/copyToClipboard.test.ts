import { copyToClipboard } from './copyToClipboard';
import copy from 'copy-to-clipboard';

jest.mock('copy-to-clipboard', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('copyToClipboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call copy with the correct string', () => {
    const text = 'test string';
    copyToClipboard(text);

    expect(copy).toHaveBeenCalledWith(text);
  });

  it('should return true if copy is successful', () => {
    (copy as jest.Mock).mockReturnValue(true);

    const result = copyToClipboard('test string');
    expect(result).toBe(true);
  });

  it('should return false if copy fails', () => {
    (copy as jest.Mock).mockReturnValue(false);

    const result = copyToClipboard('test string');
    expect(result).toBe(false);
  });
});
