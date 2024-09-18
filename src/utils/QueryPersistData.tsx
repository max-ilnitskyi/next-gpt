import crypto from 'crypto';

import { SyncStorage } from './SyncStorage';

// temp
export class QueryPersistData {
  static _getParamsHash(queryKey: unknown) {
    const stringifiedParams = JSON.stringify(queryKey);
    const hash = crypto.createHash('sha256');
    hash.update(stringifiedParams);

    return hash.digest('hex');
  }

  static _getStorageKey({
    cacheKey,
    queryKey,
  }: {
    cacheKey: string;
    queryKey: unknown;
  }) {
    const hash = this._getParamsHash(queryKey);

    return `rc-${cacheKey}-${hash}`;
  }

  static setData({
    cacheKey,
    queryKey,
    data,
  }: {
    cacheKey: string;
    queryKey: unknown;
    data: unknown;
  }): void {
    const storageKey = this._getStorageKey({ cacheKey, queryKey });
    SyncStorage.setItem(storageKey, data);
  }

  static getData<T>({
    cacheKey,
    queryKey,
  }: {
    cacheKey: string;
    queryKey: unknown;
  }): T | null {
    const storageKey = this._getStorageKey({ cacheKey, queryKey });
    return SyncStorage.getItem<T>(storageKey);
  }
}
