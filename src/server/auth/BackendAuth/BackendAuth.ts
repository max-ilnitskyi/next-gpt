import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { User } from '@/server/models/user/user.entity';
import { UserService } from '@/server/models/user/user.service';

import { AuthorizationException } from '@/server/utils/exceptions/AuthorizationException';

const TOKEN_COOKIES_NAME = 'access-token';

const NEXT_API_SECRET = process.env.NEXT_API_SECRET as string;

interface BackendAuthTokenPayload {
  id: number;
}

class BackendAuth {
  static _getToken(): string | undefined {
    return cookies().get('access-token')?.value;
  }
  static async _setToken(value: string) {
    cookies().set(TOKEN_COOKIES_NAME, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // One month
      path: '/',
    });
  }

  static _decodeToken(token: string): BackendAuthTokenPayload {
    return jwt.verify(token, NEXT_API_SECRET) as BackendAuthTokenPayload;
  }

  static _encodeToken(value: BackendAuthTokenPayload): string {
    return jwt.sign(value, NEXT_API_SECRET);
  }

  static getCurrentUserId({ required }: { required?: boolean }) {
    try {
      const token = this._getToken();

      const payload = token ? this._decodeToken(token) : null;

      const currentUserId = payload?.id;

      if (!currentUserId && required) {
        throw new AuthorizationException();
      }

      return {
        currentUserId,
      };
    } catch (err) {
      throw new AuthorizationException(err);
    }
  }

  static async setNewUserId(): Promise<{
    currentUserId: number;
  }> {
    try {
      const newUser = new User();
      const response = await UserService.create(newUser);

      const newUserId = response.id;

      const token = newUserId ? this._encodeToken({ id: newUserId }) : null;

      if (!token || !newUserId) {
        throw new AuthorizationException();
      }

      this._setToken(token);

      return {
        currentUserId: newUserId,
      };
    } catch (err) {
      throw new AuthorizationException(err);
    }
  }
}

export default BackendAuth;
