import axiosInstance from '.';
import {ImageUri, Post} from '@/types';

export type ResponsePost = Post & {images: ImageUri[]};

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

export type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

export type RequestUpdatePost = {
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

export {getPosts, getSearchPosts, getPost, createPost, deletePost, updatePost};
