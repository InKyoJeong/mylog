import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseProfile,
  ResponseToken,
  editProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/axiosInstance';
import {numbers} from '@/constants/numbers';
import {queryKeys, storageKeys} from '@/constants/keys';
import type {ResponseError, UseMutationCustomOptions} from '@/types';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(postSignup, {
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions<ResponseToken>) {
  return useMutation(postLogin, {
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
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
      queryClient.removeQueries([queryKeys.MARKER]);
      queryClient.removeQueries([queryKeys.POST]);
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.AUTH]);
    },
    ...mutationOptions,
  });
}

function useRefreshToken(
  queryOptions?: UseQueryOptions<ResponseToken, ResponseError>,
) {
  return useQuery<ResponseToken, ResponseError>(
    [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    () => getAccessToken(),
    {
      onSuccess: ({accessToken, refreshToken}) => {
        setHeader('Authorization', `Bearer ${accessToken}`);
        setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      },
      onError: () => {
        removeHeader('Authorization');
        removeEncryptStorage(storageKeys.REFRESH_TOKEN);
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
  queryOptions?: UseQueryOptions<ResponseProfile, ResponseError>,
) {
  return useQuery<ResponseProfile, ResponseError>(
    [queryKeys.AUTH, queryKeys.GET_PROFILE],
    () => getProfile(),
    {
      useErrorBoundary: false,
      ...queryOptions,
    },
  );
}

function useEditProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(editProfile, {
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshTokenQuery = useRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const profileMutation = useEditProfile();
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    refreshTokenQuery,
    getProfileQuery,
    profileMutation,
    isLogin,
  };
}

export default useAuth;
