import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from '@/types';
import {uploadImages} from '@/api/image';

function useUploadImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(uploadImages, {
    ...mutationOptions,
  });
}

export {useUploadImages};
