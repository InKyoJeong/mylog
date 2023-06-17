import {useMutation} from '@tanstack/react-query';

import {uploadImages} from '@/api';
import type {UseMutationCustomOptions} from '@/types';
import {captureException} from '@/utils';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(uploadImages, {
    onError: error => captureException(error),
    ...mutationOptions,
  });
}

export default useMutateImages;
