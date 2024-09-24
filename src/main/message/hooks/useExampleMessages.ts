import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { baseGetAction } from '@/common/actions/baseGetAction';

import { MessageCacheKey } from '../MessageCacheKey';
import { MessageApiPath } from '../MessageApiPath';

interface ExampleMessagesResponse {
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
const cacheKey = MessageCacheKey.example();

const params = {
  page: 1,
  limit: 24,
  filters: {},
  sort: ['CREATED_AT_DESC'],
};

export function useExampleMessages() {
  const queryFn = useCallback<
    () => Promise<ExampleMessagesResponse>
  >(async () => {
    return baseGetAction<ExampleMessagesResponse>({
      path: MessageApiPath.example(),
      params,
    });
  }, []);

  const { data, isFetched, isLoading, error } =
    useQuery<ExampleMessagesResponse>({
      queryKey: [cacheKey, params],
      queryFn,
    });

  const item = data?.[itemsKey]?.nodes || [];

  return {
    exampleMessages: item,
    exampleMessagesError: error,
    exampleMessagesErrorMessage: parseRequestError(error),
    exampleMessagesFetched: isFetched,
    exampleMessagesLoading: isLoading,
  };
}
