import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {ResponsePost, createPost, getPost, getPosts} from '@/api/post';
import {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryKeys from '@/constants/queryKeys';
import queryClient from '@/api/queryClient';

function useGetPosts(
  queryOptions?: UseQueryOptions<ResponsePost[], ErrorResponse>,
) {
  return useQuery<ResponsePost[], ErrorResponse>(
    [queryKeys.POST, 'getPosts'],
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
    [queryKeys.POST, 'getPost', id],
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
      queryClient.invalidateQueries([queryKeys.MARKER, 'getMarkers']);
      queryClient.invalidateQueries([queryKeys.POST, 'getPosts']);
    },
    ...mutationOptions,
  });
}

export {useGetPosts, useGetPost, useCreatePost};
