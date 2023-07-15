import {useMutation} from '@tanstack/react-query';

import {
  acceptFriendRequest,
  deleteFriendRequest,
  sendFriendRequest,
} from '@/api';
import {captureException, isServerError} from '@/utils';
import type {UseMutationCustomOptions} from '@/types';

function useSendFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(sendFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    ...mutationOptions,
  });
}

function useAcceptFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(acceptFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    onSuccess: data => console.log(data),
    ...mutationOptions,
  });
}

function useDeleteFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(deleteFriendRequest, {
    onError: error => isServerError(error) && captureException(error),
    onSuccess: data => console.log(data),
    ...mutationOptions,
  });
}

export {useSendFriendRequest, useAcceptFriendRequest, useDeleteFriendRequest};
