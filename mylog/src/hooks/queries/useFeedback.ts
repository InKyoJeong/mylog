import {useMutation} from '@tanstack/react-query';

import {addFeedback} from '@/api/feedback';
import type {UseMutationCustomOptions} from '@/types';

function useFeedback(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(addFeedback, {
    ...mutationOptions,
  });
}

export {useFeedback};
