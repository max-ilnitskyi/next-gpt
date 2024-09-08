import isRegExp from 'lodash/isRegExp';
import { axiosErrorTypeDef } from './axiosErrorTypeDef';

export function checkAxiosErrorStatus(
  error: unknown,
  status: RegExp | number,
): boolean {
  if (
    !axiosErrorTypeDef(error) ||
    !error?.response?.data?.error?.statusCode ||
    !status
  ) {
    return false;
  }

  if (isRegExp(status)) {
    return status.test(String(error.response.data.error.statusCode));
  }

  return status === error.response.data.error.statusCode;
}
