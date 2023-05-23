import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import {queryKeys} from '@/constants';
import queryClient from '@/api/queryClient';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getSearchPosts,
  updatePost,
} from '@/api';
import type {ResponsePost, ResponseSinglePost} from '@/api';
import type {ResponseError, UseMutationCustomOptions, Marker} from '@/types';

function useInifinitePostsQuery(
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      ResponsePost[],
      ResponseError,
      ResponsePost[],
      ResponsePost[],
      [string, string]
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useInfiniteQuery(
    [queryKeys.POST, queryKeys.GET_POSTS],
    ({pageParam = 1}) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPost = lastPage[lastPage.length - 1];
        return lastPost ? allPages.length + 1 : undefined;
      },
      ...queryOptions,
    },
  );
}

function useInifiniteSearchPostsQuery(
  query: string,
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      ResponsePost[],
      ResponseError,
      ResponsePost[],
      ResponsePost[],
      [string, string, string]
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useInfiniteQuery(
    [queryKeys.POST, queryKeys.GET_SEARCH_POSTS, query],
    ({pageParam = 1}) => getSearchPosts(pageParam, query),
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastPost = lastPage[lastPage.length - 1];
        return lastPost ? allPages.length + 1 : undefined;
      },
      ...queryOptions,
    },
  );
}

function usePostQuery(
  id: number,
  queryOptions?: UseQueryOptions<ResponseSinglePost, ResponseError>,
) {
  return useQuery<ResponseSinglePost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_POST, id],
    () => getPost(id),
    {
      enabled: !!id,
      ...queryOptions,
    },
  );
}

function useCreatePostMutation(mutationOptions?: UseMutationCustomOptions) {
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

          if (existingMarkers) {
            return [...existingMarkers, newMarker];
          }

          return [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

function useDeletePostMutation(mutationOptions?: UseMutationCustomOptions) {
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

function useUpdatePostMutation(mutationOptions?: UseMutationCustomOptions) {
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
    },
    ...mutationOptions,
  });
}

export {
  useInifinitePostsQuery,
  useInifiniteSearchPostsQuery,
  usePostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
};
