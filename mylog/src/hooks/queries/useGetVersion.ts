import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {ResponseVersion, getVersion} from '@/api';
import {queryKeys} from '@/constants';
import type {ResponseError} from '@/types';

function useGetVersion(
  queryOptions?: UseQueryOptions<ResponseVersion, ResponseError>,
) {
  return useQuery<ResponseVersion, ResponseError>(
    [queryKeys.VERSION],
    () => getVersion(),
    {
      useErrorBoundary: false,
      ...queryOptions,
    },
  );
}

export default useGetVersion;
