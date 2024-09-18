import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageCacheKey } from '../MessageCacheKey';
import { MessageApiPath } from '../MessageApiPath';

interface MessagesCountResponse {
  messagesCount: {
    count: number;
  };
}

const itemsKey = 'messagesCount';
const cacheKey = MessageCacheKey.count();

export function useMessagesCount() {
  const queryFn = useCallback<
    () => Promise<MessagesCountResponse>
  >(async () => {
    try {
      const response = await ApiRequest.get<MessagesCountResponse>(
        MessageApiPath.count(),
      );

      return response.data;
    } catch (err) {
      throw isEmpty(
        (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data?.error
          ?.fullMessages,
      )
        ? err
        : (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data
            ?.error;
    }
  }, []);

  const { data, isFetched, isLoading, error } = useQuery<MessagesCountResponse>(
    {
      queryKey: [cacheKey],
      queryFn,
    },
  );

  const messagesCount = data?.[itemsKey]?.count || 0;

  return {
    messagesCount,
    messagesCountError: error,
    messagesCountErrorMessage: parseRequestError(error),
    messagesCountFetched: isFetched,
    messagesCountLoading: isLoading,
  };
}
