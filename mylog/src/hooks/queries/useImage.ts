import {useMutation} from '@tanstack/react-query';

import {uploadImages} from '@/api';
import type {UseMutationCustomOptions} from '@/types';

function useUploadImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(uploadImages, {
    ...mutationOptions,
  });
}

export {useUploadImages};
