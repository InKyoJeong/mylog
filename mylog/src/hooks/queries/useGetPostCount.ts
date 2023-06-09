import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {
  ResponseColorCount,
  ResponseScoreCount,
  getColorCount,
  getScoreCount,
} from '@/api';
import {queryKeys} from '@/constants';
import type {ResponseError} from '@/types';

const transformCount = <T>(data: T, field: string) => {
  return data;
};

function useGetColorCount(
  queryOptions?: UseQueryOptions<ResponseColorCount, ResponseError>,
) {
  return useQuery<ResponseColorCount, ResponseError>(
    [queryKeys.POST, queryKeys.GET_COLOR_COUNT],
    () => getColorCount(),
    {
      select: (data: ResponseColorCount) => transformCount(data, 'color'),
      ...queryOptions,
    },
  );
}

function useGetScoreCount(
  queryOptions?: UseQueryOptions<ResponseScoreCount, ResponseError>,
) {
  return useQuery<ResponseScoreCount, ResponseError>(
    [queryKeys.POST, queryKeys.GET_SCORE_COUNT],
    () => getScoreCount(),
    {
      select: (data: ResponseScoreCount) => transformCount(data, 'score'),
      ...queryOptions,
    },
  );
}

export {useGetColorCount, useGetScoreCount};
