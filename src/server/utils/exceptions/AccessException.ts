import { BaseException } from './BaseException';

export class AccessException extends BaseException {
  constructor(cause?: unknown) {
    super(403, 'Forbidden', cause);
  }
}
