import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseMarker,
  createMarker,
  getMarker,
  getMarkers,
} from '@/api/marker';
import queryKeys from '@/constants/queryKeys';
import {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';

export type MarkerLocation = Pick<
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
      ...queryOptions,
    },
  );
}

function useGetMarker(
  markerId: number,
  queryOptions?: UseQueryOptions<ResponseMarker, ErrorResponse>,
) {
  return useQuery<ResponseMarker, ErrorResponse>(
    [queryKeys.MARKER, 'getMarker', markerId],
    () => getMarker(markerId),
    {
      enabled: !!markerId,
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

export {useGetMarkers, useGetMarker, useGetMarkerLocations, useCreateMarker};
