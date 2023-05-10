import {create} from 'zustand';

import type {Post} from '@/types/domain';

interface DetailPostState {
  detailPost: Post | null;
  setDetailPost: (detailPost: Post) => void;
}

const useDetailPostStore = create<DetailPostState>(set => ({
  detailPost: null,
  setDetailPost: (detailPost: Post) => {
    set({detailPost});
  },
}));

export default useDetailPostStore;
