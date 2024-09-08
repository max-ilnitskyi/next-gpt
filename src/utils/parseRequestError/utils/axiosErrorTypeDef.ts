import { AxiosRequestErrorType } from '@/types';

export function axiosErrorTypeDef(
  error: unknown,
): error is AxiosRequestErrorType {
  return (error as AxiosRequestErrorType)?.response?.data?.error ? true : false;
}
