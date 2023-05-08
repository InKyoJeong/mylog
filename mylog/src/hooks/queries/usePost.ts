import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {ResponsePost, createPost, getPost, getPosts} from '@/api/post';
import {ResponseError, UseMutationCustomOptions} from '@/types';
import queryKeys from '@/constants/queryKeys';

function useGetInifinitePosts(
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      ResponsePost[],
      ResponseError,
      ResponsePost[],
      ResponsePost[],
      [string, string]
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useInfiniteQuery(
    [queryKeys.POST, queryKeys.GET_POSTS],
    ({pageParam = 1}) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPost = lastPage[lastPage.length - 1];
        return lastPost ? allPages.length + 1 : undefined;
      },
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

export {useGetInifinitePosts, useGetPost, useCreatePost};
