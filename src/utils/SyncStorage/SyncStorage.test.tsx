// SyncStorage.test.ts
import { SyncStorage } from './SyncStorage';

describe('SyncStorage', () => {
  let setItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;

  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};

    setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation((key, value) => {
        mockLocalStorage[key] = value;
      });

    getItemSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        return mockLocalStorage[key] || null;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should store an item in localStorage', () => {
    const key = 'testKey';
    const value = { data: 'testData' };

    SyncStorage.setItem(key, value);

    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value));
    expect(mockLocalStorage[key]).toBe(JSON.stringify(value));
  });

  it('should retrieve an item from localStorage', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    mockLocalStorage[key] = JSON.stringify(value);

    const result = SyncStorage.getItem<typeof value>(key);

    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it('should return null if item is not in localStorage', () => {
    const key = 'nonExistentKey';

    const result = SyncStorage.getItem(key);

    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });
});
