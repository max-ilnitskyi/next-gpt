import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { AxiosRequestErrorType, PayloadErrorType } from '@/types';
import { SyncStorage } from '@/utils/SyncStorage';
import { getQueryPlaceholderKey } from '@/utils/getQueryPlaceholderKey';
import ApiRequest from '@/utils/ApiRequest';
import parseRequestError from '@/utils/parseRequestError/parseRequestError';

import { AuthCacheKey } from '../AuthCacheKey';
import { AuthApiPath } from '../AuthApiPath';
import { UserInfo } from './useAuth';

interface CurrentUserResponse {
  currentUser: UserInfo | null;
}

const itemKey = 'currentUser';
const cacheKey = AuthCacheKey.currentUser();

interface UseFetchCurrentUserOptions {
  options: {
    onSuccess: (data: CurrentUserResponse) => void;
  };
}

export function useFetchCurrentUser({ options }: UseFetchCurrentUserOptions) {
  const localStoragePlaceholderKey = getQueryPlaceholderKey(cacheKey);

  const queryFn = useCallback<() => Promise<CurrentUserResponse>>(async () => {
    try {
      const response = await ApiRequest.get<CurrentUserResponse>(
        AuthApiPath.currentUser(),
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

  const { data, isFetched, isLoading, isSuccess, error } =
    useQuery<CurrentUserResponse>({
      queryKey: [cacheKey],
      queryFn,

      // TODO look how fix Hydration
      // placeholderData: () => {
      //   return (
      //     SyncStorage.getItem<CurrentUserResponse>(
      //       localStoragePlaceholderKey,
      //     ) || undefined
      //   );
      // },
    });

  useEffect(() => {
    if (isSuccess) {
      SyncStorage.setItem<CurrentUserResponse>(
        localStoragePlaceholderKey,
        data,
      );
      options?.onSuccess?.(data);
    }
  }, [isSuccess, data]);

  const item = data?.[itemKey] || null;

  return {
    currentUser: item,
    currentUserError: error,
    currentUserErrorMessage: parseRequestError(error),
    currentUserFetched: isFetched,
    currentUserLoading: isLoading,
  };
}

export default useFetchCurrentUser;
