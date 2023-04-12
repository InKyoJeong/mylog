import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {
  ProfileResponse,
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
} from '@/api/auth';
import type {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/axiosInstance';
import {numbers} from '@/constants/numbers';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(postSignup, {
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions<TokenResponse>) {
  return useMutation(postLogin, {
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage('refreshToken', refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries(['auth', 'getAccessToken']);
      queryClient.invalidateQueries(['auth', 'getProfile']);
    },
    ...mutationOptions,
  });
}

function useRefreshToken(
  queryOptions?: UseQueryOptions<TokenResponse, ErrorResponse>,
) {
  return useQuery<TokenResponse, ErrorResponse>(
    ['auth', 'getAccessToken'],
    () => getAccessToken(),
    {
      onSuccess: ({accessToken, refreshToken}) => {
        setHeader('Authorization', `Bearer ${accessToken}`);
        setEncryptStorage('refreshToken', refreshToken);
      },
      onError: () => {
        removeHeader('Authorization');
        removeEncryptStorage('refreshToken');
      },
      useErrorBoundary: false,
      staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
      refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
      refetchOnReconnect: true,
      refetchIntervalInBackground: true,
      ...queryOptions,
    },
  );
}

function useGetProfile(
  queryOptions?: UseQueryOptions<ProfileResponse, ErrorResponse>,
) {
  return useQuery<ProfileResponse, ErrorResponse>(
    ['auth', 'getProfile'],
    () => getProfile(),
    {
      useErrorBoundary: false,
      ...queryOptions,
    },
  );
}

function useAuth() {
  const signupMutate = useSignup();
  const loginMutate = useLogin();
  const refreshTokenQuery = useRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutate,
    loginMutate,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
  };
}

export default useAuth;
