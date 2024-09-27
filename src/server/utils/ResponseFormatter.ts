import camelcaseKeys from 'camelcase-keys';

export class ResponseFormatter {
  static index<T>({ scope, nodes }: { scope: string; nodes: T[] }) {
    return {
      success: true,
      [scope]: {
        nodes: camelcaseKeys(nodes as Record<string, unknown>[], {
          deep: true,
        }),
      },
    };
  }
  static count({ count, scope }: { count: number; scope: string }) {
    return { success: true, [scope]: { count } };
  }
}
