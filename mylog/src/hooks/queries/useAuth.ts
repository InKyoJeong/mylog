import {
  MutationFunction,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import {
  ResponseProfile,
  ResponseToken,
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
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
  isServerError,
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
    useErrorBoundary: error => isServerError(error),
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginMethod: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions<ResponseToken>,
) {
  return useMutation(loginMethod, {
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries([queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]);
      queryClient.invalidateQueries([queryKeys.AUTH, queryKeys.GET_PROFILE]);
    },
    useErrorBoundary: error => isServerError(error),
    ...mutationOptions,
  });
}

function useEmailLogin(
  mutationOptions?: UseMutationCustomOptions<ResponseToken>,
) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(
  mutationOptions?: UseMutationCustomOptions<ResponseToken>,
) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useAppleLogin(
  mutationOptions?: UseMutationCustomOptions<ResponseToken>,
) {
  return useLogin(appleLogin, mutationOptions);
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

function useGetRefreshToken(
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
      suspense: false,
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
      suspense: false,
      useErrorBoundary: false,
      select: transformProfileCategory,
      ...queryOptions,
    },
  );
}

function useMutateProfile(mutationOptions?: UseMutationCustomOptions) {
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

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deleteAccount, {
    ...mutationOptions,
  });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
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
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const profileMutation = useMutateProfile();
  const isLogin = getProfileQuery.isSuccess;
  const isLoadingLogin = refreshTokenQuery.isLoading;
  const deleteAccountMutation = useMutateDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    logoutMutation,
    refreshTokenQuery,
    getProfileQuery,
    profileMutation,
    isLogin,
    isLoadingLogin,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;
