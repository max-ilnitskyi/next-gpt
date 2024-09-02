import { BaseException } from '../BaseException';

class AuthorizationException extends BaseException {
  constructor(cause?: unknown) {
    super(401, 'Authorization Error', cause);
  }
}

export default AuthorizationException;
