import { getQueryPlaceholderKey } from './getQueryPlaceholderKey';

describe('getQueryPlaceholderKey', () => {
  it('should return the correct placeholder key for a given cache key', () => {
    const cacheKey = 'testKey';
    const expected = 'rq-testKey-placeholder';
    const result = getQueryPlaceholderKey(cacheKey);
    expect(result).toBe(expected);
  });
});
