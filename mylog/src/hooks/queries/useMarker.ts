import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api/marker';
import {queryKeys} from '@/constants';
import type {Marker} from '@/types/domain';
import type {ResponseError} from '@/types';

function useGetMarkers(
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

export {useGetMarkers};
