import {useMutation} from '@tanstack/react-query';

import {acceptFriendRequest, sendFriendRequest} from '@/api';
import {captureException} from '@/utils';
import type {UseMutationCustomOptions} from '@/types';

function useSendFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(sendFriendRequest, {
    onError: error => captureException(error),
    ...mutationOptions,
  });
}

function useAcceptFriendRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(acceptFriendRequest, {
    onError: error => captureException(error),
    ...mutationOptions,
  });
}

export {useSendFriendRequest, useAcceptFriendRequest};
