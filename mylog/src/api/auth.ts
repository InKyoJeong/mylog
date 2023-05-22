import axiosInstance from './axios';
import {getEncryptStorage} from '@/utils';
import type {Category, Profile} from '@/types';

type RequestUser = {
  username: string;
  password: string;
};

const postSignup = async ({username, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {username, password});

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  username,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {username, password});

  return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

type RequestProfile = Omit<Profile, 'username'>;

const editProfile = async (body: RequestProfile): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.patch('/auth/me', body);

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
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

const deleteAccount = async () => {
  await axiosInstance.delete('/auth/me');
};

const editCategory = async (body: Category): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.patch('/auth/category', body);

  return data;
};

export {
  postSignup,
  postLogin,
  getProfile,
  editProfile,
  getAccessToken,
  logout,
  deleteAccount,
  editCategory,
};
export type {RequestUser, ResponseToken, ResponseProfile, RequestProfile};
