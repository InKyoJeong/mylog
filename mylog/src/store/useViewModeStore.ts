import {create} from 'zustand';

export type Mode = 'feed' | 'album';

interface ViewMode {
  mode: Mode;
  isVisible: boolean;
  setMode: (mode: Mode) => void;
  showOption: () => void;
  hideOption: () => void;
}

const useViewModeStore = create<ViewMode>(set => ({
  mode: 'album',
  isVisible: false,
  setMode: (mode: Mode) => {
    set(state => ({...state, mode}));
  },
  showOption: () => {
    set(state => ({...state, isVisible: true}));
  },
  hideOption: () => {
    set(state => ({...state, isVisible: false}));
  },
}));

export default useViewModeStore;
