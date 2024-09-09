import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageApiPath } from '../MessageApiPath';

interface CreateMessageResponse {
  message: {
    id: number;
    content: string;
    valence: number;
    arousal: number;
    createdAt: string;
  } | null;
}

interface CreateMessageInput {
  content: string;
}

const itemKey = 'message';

interface UseCreateMessageOptions {
  cacheKeys?: string[];
}

export function useCreateMessage({ cacheKeys }: UseCreateMessageOptions) {
  const queryClient = useQueryClient();

  const mutationFn = useCallback<
    (input: CreateMessageInput) => Promise<CreateMessageResponse>
  >(async (input) => {
    try {
      const response = await ApiRequest.post<CreateMessageResponse>(
        MessageApiPath.create(),
        input,
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

  const { data, error, isPending, mutateAsync, reset } = useMutation<
    CreateMessageResponse,
    unknown,
    CreateMessageInput
  >({
    mutationFn,
    onSettled: () => {
      if (isArray(cacheKeys)) {
        forEach(cacheKeys, (cacheKey) =>
          queryClient.invalidateQueries({ queryKey: [cacheKey] }),
        );
      }
    },
  });

  const message = data?.[itemKey] || null;

  return {
    message: message,
    createMessage: mutateAsync,
    createMessageError: error,
    createMessageErrorMessage: parseRequestError(error),
    createMessagePending: isPending,
    resetCreateMessage: reset,
  };
}
