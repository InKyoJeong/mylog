import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseProfile,
  ResponseToken,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {
  removeEncryptStorage,
  setEncryptStorage,
  removeHeader,
  setHeader,
} from '@/utils';
import {numbers, queryKeys, storageKeys} from '@/constants';
import type {
  ResponseError,
  UseMutationCustomOptions,
  Category,
  Profile,
} from '@/types';

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

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useGetProfile(
  queryOptions?: UseQueryOptions<
    ResponseProfile,
    ResponseError,
    ResponseSelectProfile
  >,
) {
  return useQuery<ResponseProfile, ResponseError, ResponseSelectProfile>(
    [queryKeys.AUTH, queryKeys.GET_PROFILE],
    () => getProfile(),
    {
      select: transformProfileCategory,
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

function useDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deleteAccount, {
    ...mutationOptions,
  });
}

function useEditCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(editCategory, {
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
  const deleteAccountMutation = useDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useEditCategory();

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    refreshTokenQuery,
    getProfileQuery,
    profileMutation,
    isLogin,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;
