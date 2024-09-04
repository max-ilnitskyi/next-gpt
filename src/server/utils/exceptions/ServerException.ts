import { BaseException } from './BaseException';

export class ServerException extends BaseException {
  constructor(errorMessage?: string, cause?: unknown, fullMessages?: string[]) {
    super(500, errorMessage || 'Server Error', cause);
    this.fullMessages = fullMessages;
  }
}
