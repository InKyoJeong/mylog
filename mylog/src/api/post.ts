import axiosInstance from './axios';
import {ImageUri, MarkerColor, Post} from '@/types';

type ResponsePost = Post & {images: ImageUri[]};

const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

const getSearchPosts = async (
  page = 1,
  query: string,
): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(
    `/posts/my/search?query=${query}&page=${page}`,
  );

  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

type ResponseCalendarPost = Record<number, CalendarPost[]>;

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);

  return data;
};

type ResponseCount<T> = {field: T; count: number}[];

const getScoreCount = async (): Promise<ResponseCount<number>> => {
  const {data} = await axiosInstance.get('/posts/scores/count');

  return data;
};

const getColorCount = async (): Promise<ResponseCount<MarkerColor>> => {
  const {data} = await axiosInstance.get('/posts/colors/count');

  return data;
};

export {
  getPosts,
  getSearchPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getCalendarPosts,
  getScoreCount,
  getColorCount,
};
export type {
  ResponsePost,
  ResponseSinglePost,
  RequestCreatePost,
  RequestUpdatePost,
  CalendarPost,
  ResponseCalendarPost,
  ResponseCount,
};
