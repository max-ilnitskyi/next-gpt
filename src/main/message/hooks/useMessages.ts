import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageCacheKey } from '../MessageCacheKey';
import { MessageApiPath } from '../MessageApiPath';

interface MessagesResponse {
  messages: {
    nodes: {
      id: number;
      content: string;
      valence: number;
      arousal: number;
      createdAt: string;
    }[];
  };
}

const itemsKey = 'messages';
export const cacheKey = MessageCacheKey.index();

const params = {
  page: 1,
  limit: 1000,
  filters: {},
  sort: ['CREATED_AT_DESC'],
};

export function useMessages() {
  const queryFn = useCallback<() => Promise<MessagesResponse>>(async () => {
    try {
      const response = await ApiRequest.get<MessagesResponse>(
        MessageApiPath.index(),
        params,
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

  const { data, isFetched, isLoading, error } = useQuery<MessagesResponse>({
    queryKey: [cacheKey, params],
    queryFn,
  });

  const item = data?.[itemsKey]?.nodes || [];

  return {
    messages: item,
    messagesError: error,
    messagesErrorMessage: parseRequestError(error),
    messagesFetched: isFetched,
    messagesLoading: isLoading,
  };
}
