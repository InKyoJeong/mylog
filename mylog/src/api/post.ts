import axiosInstance from '.';
import {ImageUri, Post} from '@/types/domain';

export type ResponsePost = Post & {images: ImageUri[]};

const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

const getPost = async (id: number): Promise<ResponsePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost) => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export {getPosts, getPost, createPost};
