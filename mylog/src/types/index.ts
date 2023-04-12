import type {AxiosError} from 'axios';
import type {UseMutationOptions} from '@tanstack/react-query';

type ErrorResponse = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TData = unknown> = UseMutationOptions<
  TData,
  ErrorResponse,
  unknown
>;

type AxiosCommonRequestHeaders =
  | 'Accept'
  | 'Content-Length'
  | 'User-Agent'
  | 'Content-Encoding'
  | 'Authorization'
  | 'Content-Type';

export type {
  ErrorResponse,
  UseMutationCustomOptions,
  AxiosCommonRequestHeaders,
};
