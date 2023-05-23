import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {deletePost} from '@/api';
import {queryKeys} from '@/constants';
import type {Marker, UseMutationCustomOptions} from '@/types';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deletePost, {
    onSuccess: deletedId => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.invalidateQueries([
        queryKeys.POST,
        queryKeys.GET_SEARCH_POSTS,
      ]);
      queryClient.invalidateQueries([
        queryKeys.FAVORITE,
        queryKeys.GET_FAVORITE_POSTS,
      ]);
      queryClient.invalidateQueries([
        queryKeys.POST,
        queryKeys.GET_CALENDAR_POSTS,
      ]);
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          return existingMarkers?.filter(marker => marker.id !== deletedId);
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
