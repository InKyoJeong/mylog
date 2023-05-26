import {create} from 'zustand';

import {getObjectWithValue} from '@/utils';
import {categoryList, scoreList} from '@/constants';

interface FilterState {
  filterItems: Record<string, boolean>;
  setFilterItems: (filterItems: Record<string, boolean>) => void;
}

const useMarkerFilterStore = create<FilterState>(set => ({
  filterItems: {
    ...getObjectWithValue(categoryList, true),
    ...getObjectWithValue(scoreList, true),
  },
  setFilterItems: (filterItems: Record<string, boolean>) => {
    set({filterItems});
  },
}));

export default useMarkerFilterStore;
