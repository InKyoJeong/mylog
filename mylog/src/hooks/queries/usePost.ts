import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {ResponsePost, createPost, getPost, getPosts} from '@/api/post';
import {ResponseError, UseMutationCustomOptions} from '@/types';
import queryKeys from '@/constants/queryKeys';
import queryClient from '@/api/queryClient';

function useGetPosts(
  queryOptions?: UseQueryOptions<ResponsePost[], ResponseError>,
) {
  return useQuery<ResponsePost[], ResponseError>(
    [queryKeys.POST, queryKeys.GET_POSTS],
    () => getPosts(),
    {
      ...queryOptions,
    },
  );
}

function useGetPost(
  id: number,
  queryOptions?: UseQueryOptions<ResponsePost, ResponseError>,
) {
  return useQuery<ResponsePost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_POST, id],
    () => getPost(id),
    {
      enabled: !!id,
      ...queryOptions,
    },
  );
}

function useCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.MARKER, queryKeys.GET_MARKERS]);
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
    },
    ...mutationOptions,
  });
}

export {useGetPosts, useGetPost, useCreatePost};
