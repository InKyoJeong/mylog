import axiosInstance from '.';
import {getEncryptStorage} from '@/utils/encryptStorage';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserRequest {
  username: string;
  password: string;
}

export interface ProfileResponse {
  username: string;
}

const postSignup = async ({username, password}: UserRequest): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {username, password});

  return data;
};

const postLogin = async ({
  username,
  password,
}: UserRequest): Promise<TokenResponse> => {
  const {data} = await axiosInstance.post('/auth/signin', {username, password});

  return data;
};

const getProfile = async (): Promise<ProfileResponse> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<TokenResponse> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
