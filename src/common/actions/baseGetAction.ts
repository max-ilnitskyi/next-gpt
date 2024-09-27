import isEmpty from 'lodash/isEmpty';

import ApiRequest from '@/utils/ApiRequest';
import { AxiosRequestErrorType, PayloadErrorType } from '@/types';

interface BaseGetActionOptions {
  path: string;
  params?: {
    limit: number;
    page: number;
    sort: string[];
    filters: Record<string, unknown>;
  };
}

export async function baseGetAction<T>({
  path,
  params,
}: BaseGetActionOptions): Promise<T> {
  try {
    const response = await ApiRequest.get<T>(path, params);

    return response.data;
  } catch (err) {
    throw isEmpty(
      (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data?.error
        ?.fullMessages,
    )
      ? err
      : (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data?.error;
  }
}
