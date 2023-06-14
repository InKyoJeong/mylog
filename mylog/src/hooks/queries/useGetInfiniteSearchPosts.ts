import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';

import {ResponsePost, getSearchPosts} from '@/api';
import {queryKeys} from '@/constants';
import type {ResponseError} from '@/types';

function useGetInfiniteSearchPosts(
  query: string,
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      ResponsePost[],
      ResponseError,
      ResponsePost[],
      ResponsePost[],
      [string, string, string]
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useInfiniteQuery(
    [queryKeys.POST, queryKeys.GET_SEARCH_POSTS, query],
    ({pageParam = 1}) => getSearchPosts(pageParam, query),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPost = lastPage[lastPage.length - 1];
        return lastPost ? allPages.length + 1 : undefined;
      },
      ...queryOptions,
    },
  );
}

export default useGetInfiniteSearchPosts;
