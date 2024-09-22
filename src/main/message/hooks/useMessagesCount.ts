import { useCallback } from 'react';
import { useQuery, QueryPersister } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageCacheKey } from '../MessageCacheKey';
import { MessageApiPath } from '../MessageApiPath';
import { IS_CLIENT } from '@/config';

interface MessagesCountResponse {
  messagesCount: {
    count: number;
  };
}

const itemsKey = 'messagesCount';
export const cacheKey = MessageCacheKey.count();

const persister: unknown = IS_CLIENT
  ? experimental_createPersister({ storage: localStorage })
  : undefined;

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

  const queryKey = [cacheKey];

  const { data, isFetched, isLoading, error } = useQuery<MessagesCountResponse>(
    {
      queryKey,
      queryFn,
      persister: persister as QueryPersister<MessagesCountResponse>,
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
