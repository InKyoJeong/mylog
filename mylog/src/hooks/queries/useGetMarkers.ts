import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api';
import {captureException} from '@/utils';
import {queryKeys} from '@/constants';
import type {ResponseError, Marker} from '@/types';

function useGetMarkers(
  queryOptions?: UseQueryOptions<Marker[], ResponseError>,
) {
  return useQuery<Marker[], ResponseError>(
    [queryKeys.MARKER, queryKeys.GET_MARKERS],
    () => getMarkers(),
    {
      onError: error => captureException(error),
      ...queryOptions,
    },
  );
}

export default useGetMarkers;
