import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {updateFavoritePost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import type {UseMutationCustomOptions} from '@/types';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(updateFavoritePost, {
    onSuccess: updatedId => {
      queryClient.invalidateQueries([
        queryKeys.POST,
        queryKeys.FAVORITE,
        queryKeys.GET_FAVORITE_POSTS,
      ]);

      const existingPost = queryClient.getQueryData<ResponseSinglePost>([
        queryKeys.POST,
        queryKeys.GET_POST,
        updatedId,
      ]) as ResponseSinglePost;

      queryClient.setQueryData<ResponseSinglePost>(
        [queryKeys.POST, queryKeys.GET_POST, updatedId],
        {...existingPost, isFavorite: !existingPost.isFavorite},
      );
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
