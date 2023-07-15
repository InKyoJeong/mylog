import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {getMyFriends, getPendingFriends} from '@/api';
import {captureException} from '@/utils';
import {queryKeys} from '@/constants';
import type {Friend, ResponseError} from '@/types';

function useGetMyFriends(
  queryOptions?: UseQueryOptions<Friend[], ResponseError>,
) {
  return useQuery<Friend[], ResponseError>(
    [queryKeys.FRIEND, queryKeys.GET_FRIENDS],
    () => getMyFriends(),
    {
      onError: error => captureException(error),
      ...queryOptions,
    },
  );
}

function useGetPendingFriends(
  queryOptions?: UseQueryOptions<Friend[], ResponseError>,
) {
  return useQuery<Friend[], ResponseError>(
    [queryKeys.FRIEND, queryKeys.GET_PENDING_FRIENDS],
    () => getPendingFriends(),
    {
      onError: error => captureException(error),
      ...queryOptions,
    },
  );
}

export {useGetMyFriends, useGetPendingFriends};
