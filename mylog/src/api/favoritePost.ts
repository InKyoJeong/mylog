import axiosInstance from '.';

import type {ResponsePost} from './post';

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

export {getFavoritePosts, updateFavoritePost};
