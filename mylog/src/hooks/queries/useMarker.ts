import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';

import {GetMarkerResponse, createMarker, getMarkers} from '@/api/marker';
import queryKeys from '@/constants/queryKeys';
import {ErrorResponse, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';

function useGetMarkers(
  queryOptions?: UseQueryOptions<GetMarkerResponse[], ErrorResponse>,
) {
  return useQuery<GetMarkerResponse[], ErrorResponse>(
    [queryKeys.MARKER, 'getMarkers'],
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
      queryClient.invalidateQueries([queryKeys.MARKER]);
    },
    ...mutationOptions,
  });
}

export {useGetMarkers, useCreateMarker};
