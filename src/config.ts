export const VERSION = '0.2.1';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_CLIENT = typeof window !== 'undefined';

export const API_PATH = '/api/v1';
