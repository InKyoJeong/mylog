import {useMutation} from '@tanstack/react-query';

import {addFeedback} from '@/api';
import type {UseMutationCustomOptions} from '@/types';

function useFeedbackMutation(mutationOptions?: UseMutationCustomOptions) {
  return useMutation(addFeedback, {
    ...mutationOptions,
  });
}

export {useFeedbackMutation};
