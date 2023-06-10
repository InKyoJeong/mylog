import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {ResponseCalendarPost, ResponseCount, createPost} from '@/api';
import {queryKeys} from '@/constants';
import type {Marker, MarkerColor, UseMutationCustomOptions} from '@/types';

function incrementCount<T>(existingCounts: ResponseCount<T>, field: T) {
  const copyCounts = [...existingCounts];
  const findCount = copyCounts.findIndex(c => c.field === field);

  if (findCount !== -1) {
    copyCounts[findCount].count++;
    return copyCounts;
  }

  return [...copyCounts, {field, count: 1}];
}

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
      queryClient.setQueryData<ResponseCount<MarkerColor>>(
        [queryKeys.POST, queryKeys.POST_COUNT, queryKeys.GET_COLOR_COUNT],
        existingCounts => {
          if (!existingCounts) {
            return;
          }

          return incrementCount(existingCounts, newPost.color);
        },
      );
      queryClient.setQueryData<ResponseCount<number>>(
        [queryKeys.POST, queryKeys.POST_COUNT, queryKeys.GET_SCORE_COUNT],
        existingCounts => {
          if (!existingCounts) {
            return;
          }

          return incrementCount(existingCounts, newPost.score);
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
