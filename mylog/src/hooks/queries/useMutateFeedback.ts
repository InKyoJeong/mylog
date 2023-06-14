import {useMutation} from '@tanstack/react-query';

import {addFeedback} from '@/api';
import type {UseMutationCustomOptions} from '@/types';

function useMutateFeedback(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(addFeedback, {
    ...mutationOptions,
  });
}

export default useMutateFeedback;
