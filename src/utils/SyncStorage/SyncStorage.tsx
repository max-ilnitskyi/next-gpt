export class SyncStorage {
  static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(`Error trying to store data with key: ${key}`, e);
    }
  }
  static getItem<T>(key: string): T | null {
    try {
      const stringData = localStorage.getItem(key);
      return stringData ? (JSON.parse(stringData) as T) : null;
    } catch (e) {
      console.log(`Error trying to get stored data with key: ${key}`, e);
      return null;
    }
  }
}
