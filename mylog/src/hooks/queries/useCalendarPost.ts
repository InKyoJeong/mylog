import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {queryKeys} from '@/constants';
import {getCalendarPosts} from '@/api';
import type {ResponseCalendarPost} from '@/api';
import {ResponseError} from '@/types';

function useCalendarPostsQuery(
  year: number,
  month: number,
  queryOptions?: UseQueryOptions<ResponseCalendarPost, ResponseError>,
) {
  return useQuery<ResponseCalendarPost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    () => getCalendarPosts(year, month),
    {
      keepPreviousData: true,
      ...queryOptions,
    },
  );
}

export {useCalendarPostsQuery};
