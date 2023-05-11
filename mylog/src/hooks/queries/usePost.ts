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
} from '@/api/post';
import useDetailPostStore from '@/store/useDetailPostStore';
import useImageUriStore from '@/store/useImageUriStore';
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
  const {setImageUris} = useImageUriStore();
  const {setDetailPost} = useDetailPostStore();

  return useQuery<ResponsePost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_POST, id],
    () => getPost(id),
    {
      enabled: !!id,
      onSuccess: data => {
        const {images, ...detailPost} = data;
        setImageUris(images);
        setDetailPost(detailPost);
      },
      ...queryOptions,
    },
  );
}

function useCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.POST, queryKeys.GET_POSTS]);
      queryClient.invalidateQueries([queryKeys.MARKER, queryKeys.GET_MARKERS]);
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
        oldData => oldData?.filter(marker => marker.id !== deletedId),
      );
    },
    ...mutationOptions,
  });
}

export {useGetInifinitePosts, useGetPost, useCreatePost, useDeletePost};
