import {useMutation} from '@tanstack/react-query';

import axiosInstance from '@/api';
import {postLogin, postSignup} from '@/api/auth';
import type {
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

function useAuth() {
  const signupMutate = useSignup();
  const loginMutate = useLogin({
    onSuccess: ({accessToken, refreshToken}) => {
      setDefaultHeader('Authorization', `Bearer ${accessToken}`);
      console.log(refreshToken);
    },
  });

  return {signupMutate, loginMutate};
}

export default useAuth;
