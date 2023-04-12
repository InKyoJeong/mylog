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

export type {ErrorResponse, UseMutationCustomOptions};
