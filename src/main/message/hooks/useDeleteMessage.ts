import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import { ApiRequest } from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageApiPath } from '../MessageApiPath';

interface DeleteMessageResponse {
  success?: boolean;
}

interface DeleteMessageInput {
  id: number;
}

interface UseDeleteMessageOptions {
  messageId?: number;
  cacheKeys?: string[];
}

export function useDeleteMessage({
  messageId,
  cacheKeys,
}: UseDeleteMessageOptions) {
  const queryClient = useQueryClient();

  const mutationFn = useCallback<
    (input: DeleteMessageInput) => Promise<DeleteMessageResponse>
  >(async (input) => {
    try {
      const response = await ApiRequest.delete<DeleteMessageResponse>(
        MessageApiPath.delete(input?.id),
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

  const { error, isPending, mutateAsync, reset } = useMutation<
    DeleteMessageResponse,
    unknown,
    DeleteMessageInput
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

  const handleDeleteMessage = useCallback<() => void>(
    () => (messageId ? mutateAsync({ id: messageId }) : null),
    [messageId, mutateAsync],
  );

  return {
    handleDeleteMessage,
    deleteMessage: mutateAsync,
    deleteMessageError: error,
    deleteMessageErrorMessage: parseRequestError(error),
    deleteMessagePending: isPending,
    resetDeleteMessage: reset,
  };
}
