import { UserID } from '@/main/user/userTypes';
import { AuthenticatedUser } from './AuthenticatedUser';

export interface UserInfo {
  id: UserID;
}

export interface AuthContextType {
  currentUser: null | AuthenticatedUser;
  currentUserLoading: boolean;
  currentUserErrorMessage: null | string;
}
