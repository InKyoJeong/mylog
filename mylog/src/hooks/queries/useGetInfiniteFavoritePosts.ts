import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';

import {queryKeys} from '@/constants';
import {getFavoritePosts, ResponsePost} from '@/api';
import type {ResponseError} from '@/types';

function useGetInfiniteFavoritePosts(
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
      suspense: true,
      useErrorBoundary: true,
      ...queryOptions,
    },
  );
}

export default useGetInfiniteFavoritePosts;
