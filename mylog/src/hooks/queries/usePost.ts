import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {
  ResponsePost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '@/api/post';
import queryKeys from '@/constants/queryKeys';
import type {ResponseError, UseMutationCustomOptions} from '@/types';
import type {Marker} from '@/types/domain';

function useGetInifinitePosts(
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

function useGetPost(
  id: number,
  queryOptions?: UseQueryOptions<ResponsePost, ResponseError>,
) {
  return useQuery<ResponsePost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_POST, id],
    () => getPost(id),
    {
      enabled: !!id,
      ...queryOptions,
    },
  );
}

function useCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(createPost, {
    onSuccess: data => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: data.id,
            latitude: data.latitude,
            longitude: data.longitude,
            color: data.color,
            score: data.score,
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

function useDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deletePost, {
    onSuccess: deletedId => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers =>
          existingMarkers?.filter(marker => marker.id !== deletedId),
      );
    },
    ...mutationOptions,
  });
}

function useUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POST]);
      queryClient.invalidateQueries([queryKeys.MARKER, queryKeys.GET_MARKERS]);
    },
    ...mutationOptions,
  });
}

export {
  useGetInifinitePosts,
  useGetPost,
  useCreatePost,
  useDeletePost,
  useUpdatePost,
};
