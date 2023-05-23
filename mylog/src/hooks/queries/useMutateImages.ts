import {useMutation} from '@tanstack/react-query';

import {uploadImages} from '@/api';
import type {UseMutationCustomOptions} from '@/types';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(uploadImages, {
    ...mutationOptions,
  });
}

export default useMutateImages;
