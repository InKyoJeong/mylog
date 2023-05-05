import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api/marker';
import queryKeys from '@/constants/queryKeys';
import {ErrorResponse} from '@/types';
import {Marker} from '@/types/domain';

function useGetMarkers(
  queryOptions?: UseQueryOptions<Marker[], ErrorResponse>,
) {
  return useQuery<Marker[], ErrorResponse>(
    [queryKeys.MARKER, queryKeys.GET_MARKERS],
    () => getMarkers(),
    {
      ...queryOptions,
    },
  );
}

export {useGetMarkers};
