import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {ResponseCount, getColorCount, getScoreCount} from '@/api';
import {queryKeys} from '@/constants';
import type {MarkerColor, ResponseError} from '@/types';

function useGetColorCount(
  queryOptions?: UseQueryOptions<ResponseCount<MarkerColor>, ResponseError>,
) {
  return useQuery<ResponseCount<MarkerColor>, ResponseError>(
    [queryKeys.POST, queryKeys.GET_COLOR_COUNT],
    () => getColorCount(),
    {
      ...queryOptions,
    },
  );
}

function useGetScoreCount(
  queryOptions?: UseQueryOptions<ResponseCount<number>, ResponseError>,
) {
  return useQuery<ResponseCount<number>, ResponseError>(
    [queryKeys.POST, queryKeys.GET_SCORE_COUNT],
    () => getScoreCount(),
    {
      ...queryOptions,
    },
  );
}

export {useGetColorCount, useGetScoreCount};
