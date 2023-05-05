import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {ResponsePost, createPost, getPost, getPosts} from '@/api/post';
import {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryKeys from '@/constants/queryKeys';
import queryClient from '@/api/queryClient';

function useGetPosts(
  queryOptions?: UseQueryOptions<ResponsePost[], ErrorResponse>,
) {
  return useQuery<ResponsePost[], ErrorResponse>(
    [queryKeys.POST, queryKeys.GET_POSTS],
    () => getPosts(),
    {
      ...queryOptions,
    },
  );
}

function useGetPost(
  id: number,
  queryOptions?: UseQueryOptions<ResponsePost, ErrorResponse>,
) {
  return useQuery<ResponsePost, ErrorResponse>(
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
