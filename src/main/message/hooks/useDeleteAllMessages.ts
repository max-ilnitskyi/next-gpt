import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageApiPath } from '../MessageApiPath';

interface DeleteAllMessagesResponse {
  success?: boolean;
}

interface UseDeleteAllMessagesOptions {
  cacheKeys?: string[];
}

export function useDeleteAllMessages({
  cacheKeys,
}: UseDeleteAllMessagesOptions) {
  const queryClient = useQueryClient();

  const mutationFn = useCallback<
    () => Promise<DeleteAllMessagesResponse>
  >(async () => {
    try {
      const response = await ApiRequest.delete<DeleteAllMessagesResponse>(
        MessageApiPath.deleteAll(),
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
    DeleteAllMessagesResponse,
    unknown
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

  return {
    deleteAllMessages: mutateAsync,
    deleteAllMessagesError: error,
    deleteAllMessagesErrorMessage: parseRequestError(error),
    deleteAllMessagesPending: isPending,
    resetDeleteAllMessages: reset,
  };
}
