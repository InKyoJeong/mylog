import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api';
import {queryKeys} from '@/constants';
import type {ResponseError, Marker} from '@/types';

function useMarkersQuery(
  queryOptions?: UseQueryOptions<Marker[], ResponseError>,
) {
  return useQuery<Marker[], ResponseError>(
    [queryKeys.MARKER, queryKeys.GET_MARKERS],
    () => getMarkers(),
    {
      ...queryOptions,
    },
  );
}

export {useMarkersQuery};
