import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(cause?: unknown, fullMessages?: string[]) {
    super(404, 'Record Not Found', cause, fullMessages);
  }
}
