import { BaseException } from '../BaseException';

class AccessException extends BaseException {
  constructor(cause?: unknown) {
    super(403, 'Forbidden', cause);
  }
}

export default AccessException;
