import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {ResponseSinglePost, getPost} from '@/api';
import {queryKeys} from '@/constants';
import type {ResponseError} from '@/types';

function useGetPost(
  id: number,
  queryOptions?: UseQueryOptions<ResponseSinglePost, ResponseError>,
) {
  return useQuery<ResponseSinglePost, ResponseError>(
    [queryKeys.POST, queryKeys.GET_POST, id],
    () => getPost(id),
    {
      enabled: !!id,
      suspense: true,
      useErrorBoundary: true,
      ...queryOptions,
    },
  );
}

export default useGetPost;
