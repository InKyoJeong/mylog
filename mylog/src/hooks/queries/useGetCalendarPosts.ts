import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {queryKeys} from '@/constants';
import {captureException} from '@/utils';
import {getCalendarPosts} from '@/api';
import type {ResponseCalendarPost} from '@/api';
import type {ResponseError} from '@/types';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryOptions<ResponseCalendarPost, ResponseError>,
) {
  return useQuery<ResponseCalendarPost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    () => getCalendarPosts(year, month),
    {
      useErrorBoundary: false,
      keepPreviousData: true,
      onError: error => captureException(error),
      ...queryOptions,
    },
  );
}

export default useGetCalendarPosts;
