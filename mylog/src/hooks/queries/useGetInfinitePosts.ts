import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';

import {ResponsePost, getPosts} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';

function useGetInfinitePosts(
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

export default useGetInfinitePosts;
