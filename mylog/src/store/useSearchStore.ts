import {create} from 'zustand';

interface SearchState {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const useSearchStore = create<SearchState>(set => ({
  keyword: '',
  setKeyword: (keyword: string) => {
    set({keyword});
  },
}));

export default useSearchStore;
