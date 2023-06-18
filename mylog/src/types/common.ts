import type {AxiosError} from 'axios';
import type {UseMutationOptions} from '@tanstack/react-query';

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TData = unknown> = UseMutationOptions<
  TData,
  ResponseError,
  unknown
>;

type AxiosCommonRequestHeaders =
  | 'Accept'
  | 'Content-Length'
  | 'User-Agent'
  | 'Content-Encoding'
  | 'Authorization'
  | 'Content-Type';

type ThemeMode = 'light' | 'dark';

export type {
  ResponseError,
  UseMutationCustomOptions,
  AxiosCommonRequestHeaders,
  ThemeMode,
  Locale,
};
