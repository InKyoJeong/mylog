import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import axiosInstance from '@/api';
import {
  ProfileResponse,
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
} from '@/api/auth';
import type {
  ErrorResponse,
  UseMutationCustomOptions,
  AxiosCommonRequestHeaders,
} from '@/types';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const setDefaultHeader = (key: AxiosCommonRequestHeaders, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

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

function useRefreshToken(
  queryOptions?: UseQueryOptions<TokenResponse, ErrorResponse>,
) {
  return useQuery<TokenResponse, ErrorResponse>([], () => getAccessToken(), {
    ...queryOptions,
  });
}

function useGetProfile(
  queryOptions?: UseQueryOptions<ProfileResponse, ErrorResponse>,
) {
  return useQuery<ProfileResponse, ErrorResponse>(
    ['auth', 'getProfile'],
    () => getProfile(),
    {
      ...queryOptions,
    },
  );
}

function useAuth() {
  const signupMutate = useSignup();
  const loginMutate = useLogin({
    onSuccess: ({accessToken, refreshToken}) => {
      setDefaultHeader('Authorization', `Bearer ${accessToken}`);
      console.log(refreshToken);
    },
  });
  const refreshTokenQuery = useRefreshToken();
  const getProfileQuery = useGetProfile();
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
