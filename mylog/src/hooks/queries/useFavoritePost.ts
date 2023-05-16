import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';

import {getFavoritePosts, updateFavoritePost} from '@/api/favoritePost';
import {ResponsePost} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import type {ResponseError, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';

function useGetInifiniteFavoritePosts(
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

function useUpdateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(updateFavoritePost, {
    onSuccess: updatedId => {
      queryClient.invalidateQueries([
        queryKeys.FAVORITE,
        queryKeys.GET_FAVORITE_POSTS,
      ]);
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POST]);
    },
    ...mutationOptions,
  });
}

export {useGetInifiniteFavoritePosts, useUpdateFavoritePost};
