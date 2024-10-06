'use client';
import axios from 'axios';
import join from 'lodash/join';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import snakeCase from 'lodash/snakeCase';
import map from 'lodash/map';

import { API_PATH } from '@/config';

interface ApiRequestOptions {
  limit: number;
  page: number;
  sort: string[];
  filters: Record<string, unknown>;
}

const apiUrl =
  typeof window === 'undefined'
    ? null
    : join([window.location.origin, API_PATH], '');

function headers(additionalHeaders?: Record<string, string | number>) {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  };
}

export class ApiRequest {
  static _url(path: string) {
    return [apiUrl, path].join('/');
  }
  static _urlWithParams(path: string, options?: ApiRequestOptions) {
    return isEmpty(options)
      ? this._url(path)
      : this._url(
          [
            path,
            compact(
              map(options, (value, key) =>
                value
                  ? [snakeCase(key), JSON.stringify(value)].join('=')
                  : null,
              ),
            ).join('&'),
          ].join('?'),
        );
  }

  static get<T = unknown>(path: string, options?: ApiRequestOptions) {
    return axios.get<T>(this._urlWithParams(path, options), headers());
  }

  static post<T = unknown>(path: string, data?: unknown) {
    return axios.post<T>(this._url(path), data, headers());
  }

  static patch<T = unknown>(path: string, data?: unknown) {
    return axios.patch<T>(this._url(path), data, headers());
  }

  static delete<T = unknown>(path: string, data?: unknown) {
    return axios.delete<T>(this._url(path), {
      ...headers(),
      data,
    });
  }
}
