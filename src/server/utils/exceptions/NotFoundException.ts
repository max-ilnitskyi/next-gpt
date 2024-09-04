import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(cause?: unknown) {
    super(404, 'Record Not Found', cause);
  }
}
