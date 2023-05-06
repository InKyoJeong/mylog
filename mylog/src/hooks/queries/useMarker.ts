import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api/marker';
import queryKeys from '@/constants/queryKeys';
import {ResponseError} from '@/types';
import {Marker} from '@/types/domain';

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
