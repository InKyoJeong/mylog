import {useMutation} from '@tanstack/react-query';

import {addFeedback} from '@/api';
import {captureException} from '@/utils';
import type {UseMutationCustomOptions} from '@/types';

function useMutateFeedback(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(addFeedback, {
    onError: error => captureException(error),
    ...mutationOptions,
  });
}

export default useMutateFeedback;
