import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { baseGetAction } from '@/common/actions/baseGetAction';

import { MessageCacheKey } from '../MessageCacheKey';
import { MessageApiPath } from '../MessageApiPath';
import { MY_MESSAGES_DEFAULT_PARAMS } from '../messageConstants';

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

const params = MY_MESSAGES_DEFAULT_PARAMS;

export function useMessages() {
  const queryFn = useCallback<() => Promise<MessagesResponse>>(async () => {
    return baseGetAction<MessagesResponse>({
      path: MessageApiPath.index(),
      params,
    });
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
