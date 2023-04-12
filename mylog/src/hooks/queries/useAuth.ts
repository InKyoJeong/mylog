import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {
  ProfileResponse,
  TokenResponse,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import type {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/axiosInstance';
import {numbers} from '@/constants/numbers';
import queryKeys from '@/constants/queryKeys';

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
      queryClient.refetchQueries([queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]);
      queryClient.invalidateQueries([queryKeys.AUTH, queryKeys.GET_PROFILE]);
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(logout, {
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.AUTH]);
    },
    ...mutationOptions,
  });
}

function useRefreshToken(
  queryOptions?: UseQueryOptions<TokenResponse, ErrorResponse>,
) {
  return useQuery<TokenResponse, ErrorResponse>(
    [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
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
    [queryKeys.AUTH, queryKeys.GET_PROFILE],
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
  const logoutMutate = useLogout();
  const refreshTokenQuery = useRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutate,
    loginMutate,
    logoutMutate,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
  };
}

export default useAuth;
