import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {ResponseVersion, getVersion} from '@/api';
import {captureException} from '@/utils';
import {queryKeys} from '@/constants';
import type {ResponseError} from '@/types';

function useGetVersion(
  queryOptions?: UseQueryOptions<ResponseVersion, ResponseError>,
) {
  return useQuery<ResponseVersion, ResponseError>(
    [queryKeys.VERSION],
    () => getVersion(),
    {
      suspense: false,
      useErrorBoundary: false,
      onError: error => captureException(error),
      ...queryOptions,
    },
  );
}

export default useGetVersion;
