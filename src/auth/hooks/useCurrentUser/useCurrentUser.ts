import { useState } from 'react';

import { AuthenticatedUser } from './AuthenticatedUser';

import { useFetchCurrentUser } from '../useFetchCurrentUser';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(
    null,
  );

  const { currentUserLoading, currentUserErrorMessage } = useFetchCurrentUser({
    options: {
      onSuccess: (data) => {
        if (data?.currentUser) {
          setCurrentUser(new AuthenticatedUser(data.currentUser));
        }
      },
    },
  });

  return { currentUser, currentUserLoading, currentUserErrorMessage };
};
