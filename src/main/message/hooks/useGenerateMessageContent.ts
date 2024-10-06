import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import { ApiRequest } from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { MessageApiPath } from '../MessageApiPath';
import { GenerateMessageContentTypes } from '../messageTypes';

interface GenerateMessageContentResponse {
  generateMessageContent: {
    content: string;
  };
}

interface GenerateMessageContentInput {
  type: GenerateMessageContentTypes;
}

const itemKey = 'generateMessageContent';

interface UseGenerateMessageContentOptions {
  cacheKeys?: string[];
}

export function useGenerateMessageContent({
  cacheKeys,
}: UseGenerateMessageContentOptions) {
  const queryClient = useQueryClient();

  const mutationFn = useCallback<
    (
      input: GenerateMessageContentInput,
    ) => Promise<GenerateMessageContentResponse>
  >(async (input) => {
    try {
      const response = await ApiRequest.post<GenerateMessageContentResponse>(
        MessageApiPath.generateContent(),
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
    GenerateMessageContentResponse,
    unknown,
    GenerateMessageContentInput
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
    generateMessageContentData: data?.[itemKey] || null,
    generateMessageContent: mutateAsync,
    generateMessageContentError: error,
    generateMessageContentErrorMessage: parseRequestError(error),
    generateMessageContentPending: isPending,
    resetGenerateMessageContent: reset,
  };
}
