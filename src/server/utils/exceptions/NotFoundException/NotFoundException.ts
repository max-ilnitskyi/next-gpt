import { BaseException } from '../BaseException';

class NotFoundException extends BaseException {
  constructor(cause?: unknown) {
    super(404, 'Record Not Found', cause);
  }
}

export default NotFoundException;
