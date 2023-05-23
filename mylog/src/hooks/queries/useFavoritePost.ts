import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {getFavoritePosts, updateFavoritePost} from '@/api';
import type {ResponsePost, ResponseSinglePost} from '@/api';
import type {ResponseError, UseMutationCustomOptions} from '@/types';

function useInifiniteFavoritePostsQuery(
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
    [queryKeys.FAVORITE, queryKeys.GET_FAVORITE_POSTS],
    ({pageParam = 1}) => getFavoritePosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPost = lastPage[lastPage.length - 1];
        return lastPost ? allPages.length + 1 : undefined;
      },
      ...queryOptions,
    },
  );
}

function useFavoritePostMutation(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(updateFavoritePost, {
    onSuccess: updatedId => {
      queryClient.invalidateQueries([
        queryKeys.FAVORITE,
        queryKeys.GET_FAVORITE_POSTS,
      ]);

      const existingPost = queryClient.getQueryData<ResponseSinglePost>([
        queryKeys.POST,
        queryKeys.GET_POST,
        updatedId,
      ]) as ResponseSinglePost;

      queryClient.setQueryData<ResponseSinglePost>(
        [queryKeys.POST, queryKeys.GET_POST, updatedId],
        {...existingPost, isFavorite: !existingPost.isFavorite},
      );
    },
    ...mutationOptions,
  });
}

export {useInifiniteFavoritePostsQuery, useFavoritePostMutation};
