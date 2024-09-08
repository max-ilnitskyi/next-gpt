import { BaseException } from './BaseException';

export class AuthorizationException extends BaseException {
  constructor(cause?: unknown) {
    super(401, 'Authorization Error', cause);
  }
}
