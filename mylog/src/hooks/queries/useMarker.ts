import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {ResponseMarker, createMarker, getMarkers} from '@/api/marker';
import queryKeys from '@/constants/queryKeys';
import {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';

type MarkerLocation = Pick<
  ResponseMarker,
  'id' | 'latitude' | 'longitude' | 'color'
>;

const extractLocation = (markers: MarkerLocation[]) => {
  return markers.map(({id, latitude, longitude, color}) => ({
    id,
    latitude,
    longitude,
    color,
  }));
};

function useGetMarkerLocations(
  queryOptions?: UseQueryOptions<MarkerLocation[], ErrorResponse>,
) {
  return useQuery<MarkerLocation[], ErrorResponse>(
    [queryKeys.MARKER, 'getMarkers', 'locations'],
    () => getMarkers(),
    {
      useErrorBoundary: false,
      select: markers => extractLocation(markers),
      ...queryOptions,
    },
  );
}

function useGetMarkers(
  queryOptions?: UseQueryOptions<ResponseMarker[], ErrorResponse>,
) {
  return useQuery<ResponseMarker[], ErrorResponse>(
    [queryKeys.MARKER, 'getMarkers', 'all'],
    () => getMarkers(),
    {
      useErrorBoundary: false,
      ...queryOptions,
    },
  );
}

function useCreateMarker(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(createMarker, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.MARKER, 'getMarkers']);
    },
    ...mutationOptions,
  });
}

export {useGetMarkers, useGetMarkerLocations, useCreateMarker};
