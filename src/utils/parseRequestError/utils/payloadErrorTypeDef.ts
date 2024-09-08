import isArray from 'lodash/isArray';

import { PayloadErrorType } from '@/types';

export function payloadErrorTypeDef(error: unknown): error is PayloadErrorType {
  return isArray((error as PayloadErrorType)?.fullMessages) ? true : false;
}
