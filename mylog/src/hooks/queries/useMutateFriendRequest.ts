import {useMutation} from '@tanstack/react-query';

import {
  acceptFriendRequest,
  deleteFriendRequest,
  sendFriendRequest,
} from '@/api';
import queryClient from '@/api/queryClient';
import {captureException, isServerError} from '@/utils';
import {queryKeys} from '@/constants';
import type {Friend, UseMutationCustomOptions} from '@/types';

function useSendFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(sendFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    ...mutationOptions,
  });
}

function useAcceptFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(acceptFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    onSuccess: acceptedId => {
      queryClient.setQueryData<Friend[]>(
        [queryKeys.FRIEND, queryKeys.GET_PENDING_FRIENDS],
        existingRequests => {
          return existingRequests?.filter(friend => friend.id !== acceptedId);
        },
      );
    },
    ...mutationOptions,
  });
}

function useDeleteFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deleteFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    onSuccess: deletedId => {
      queryClient.setQueryData<Friend[]>(
        [queryKeys.FRIEND, queryKeys.GET_PENDING_FRIENDS],
        existingRequests => {
          return existingRequests?.filter(friend => friend.id !== deletedId);
        },
      );
    },
    ...mutationOptions,
  });
}

export {useSendFriendRequest, useAcceptFriendRequest, useDeleteFriendRequest};
