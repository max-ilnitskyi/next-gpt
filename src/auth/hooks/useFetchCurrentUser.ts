import { useQuery } from 'react-query';
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

  const { data, isFetched, isLoading, error } = useQuery<CurrentUserResponse>(
    [cacheKey],
    async () => {
      try {
        const response = await ApiRequest.get<CurrentUserResponse>(
          AuthApiPath.currentUser(),
        );

        return response.data;
      } catch (err) {
        throw isEmpty(
          (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data
            ?.error?.fullMessages,
        )
          ? err
          : (err as AxiosRequestErrorType<PayloadErrorType>)?.response?.data
              ?.error;
      }
    },
    {
      // TODO look how fix Hydration
      // placeholderData: () => {
      //   return (
      //     SyncStorage.getItem<CurrentUserResponse>(
      //       localStoragePlaceholderKey,
      //     ) || undefined
      //   );
      // },
      onSuccess: (data) => {
        SyncStorage.setItem<CurrentUserResponse>(
          localStoragePlaceholderKey,
          data,
        );
        options?.onSuccess?.(data);
        return;
      },
    },
  );

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
