import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {ResponseCalendarPost, updatePost} from '@/api';
import {queryKeys} from '@/constants';
import type {Marker, UseMutationCustomOptions} from '@/types';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(updatePost, {
    onSuccess: newPost => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.invalidateQueries([
        queryKeys.POST,
        queryKeys.GET_SEARCH_POSTS,
      ]);
      queryClient.invalidateQueries([
        queryKeys.FAVORITE,
        queryKeys.GET_FAVORITE_POSTS,
      ]);
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers?.map(marker =>
            marker.id === newPost.id ? newMarker : marker,
          );
        },
      );
      queryClient.setQueryData<ResponseCalendarPost>(
        [
          queryKeys.POST,
          queryKeys.GET_CALENDAR_POSTS,
          new Date(newPost.date).getFullYear(),
          new Date(newPost.date).getMonth() + 1,
        ],
        existingPosts => {
          if (!existingPosts) {
            return;
          }

          const day = new Date(newPost.date).getDate();
          const newCalendarPost = {
            id: newPost.id,
            title: newPost.title,
            address: newPost.address,
          };

          return {
            ...existingPosts,
            [day]: existingPosts[day].map(post =>
              post.id === newPost.id ? newCalendarPost : post,
            ),
          };
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
