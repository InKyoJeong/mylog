import {AxiosError} from 'axios';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {postLogin, postSignup} from '@/api/auth';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

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

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(postSignup, {
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions<TokenResponse>) {
  return useMutation(postLogin, {
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutate = useSignup();
  const loginMutate = useLogin();

  return {signupMutate, loginMutate};
}

export default useAuth;
