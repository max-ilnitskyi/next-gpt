import React, {
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useState,
} from 'react';

import { AuthenticatedUser } from './AuthenticatedUser';
import { AuthContextType } from './useAuth.types';

import { useFetchCurrentUser } from '../useFetchCurrentUser';

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  currentUserLoading: false,
  currentUserErrorMessage: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
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

  const context = useMemo(
    () => ({
      currentUser,
      currentUserLoading,
      currentUserErrorMessage,
    }),
    [currentUser, currentUserLoading, currentUserErrorMessage],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

// use only when auth already finished
export const useCurrentUser = () => {
  const context = useContext(AuthContext);

  return context.currentUser as unknown as AuthenticatedUser;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
