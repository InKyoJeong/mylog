import {useQueries} from '@tanstack/react-query';

import useAuth from './useAuth';
import {ResponseCount, getColorCount, getScoreCount} from '@/api';
import {colorHex, countColor, queryKeys} from '@/constants';
import type {MarkerColor} from '@/types';

function useGetPostCount() {
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};

  return useQueries({
    queries: [
      {
        queryKey: [queryKeys.POST, queryKeys.GET_COLOR_COUNT],
        queryFn: () => getColorCount(),
        select: (data: ResponseCount<MarkerColor>) =>
          data.map((countData, id) => ({
            id,
            ...countData,
            field: categories?.[countData.field] ?? '',
            color: colorHex()[countData.field],
          })),
        enabled: Boolean(categories),
        suspense: true,
        useErrorBoundary: true,
      },
      {
        queryKey: [queryKeys.POST, queryKeys.GET_SCORE_COUNT],
        queryFn: () => getScoreCount(),
        select: (data: ResponseCount<number>) =>
          data.map((countData, id) => ({
            ...countData,
            id,
            field: `${countData.field}점`,
            color: countColor[countData.field],
          })),
        suspense: true,
        useErrorBoundary: true,
      },
    ],
  });
}

export default useGetPostCount;
