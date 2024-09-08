import { AxiosError } from 'axios';

export type AxiosRequestErrorType<T = unknown> = AxiosError<{
  error: {
    statusCode: number;
    message: string;
  } & T;
}>;

export interface PayloadErrorType {
  fullMessages: string[] | null;
}
