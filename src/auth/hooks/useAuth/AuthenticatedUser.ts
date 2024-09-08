import { UserID } from '@/main/user/userTypes';

import { UserInfo } from './useAuth.types';

export class AuthenticatedUser {
  id: UserID;

  constructor(values: UserInfo) {
    this.id = values.id;
  }
}
