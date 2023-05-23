import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {ResponseCalendarPost, createPost} from '@/api';
import {queryKeys} from '@/constants';
import type {Marker, UseMutationCustomOptions} from '@/types';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(createPost, {
    onSuccess: newPost => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.invalidateQueries([
        queryKeys.POST,
        queryKeys.GET_SEARCH_POSTS,
      ]);
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

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
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
          const date = new Date(newPost.date).getDate();
          const newCalendarPost = {
            id: newPost.id,
            title: newPost.title,
            address: newPost.address,
          };

          return {
            ...existingPosts,
            [date]: existingPosts[date]
              ? [...existingPosts[date], newCalendarPost]
              : [newCalendarPost],
          };
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
