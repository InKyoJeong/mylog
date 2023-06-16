import {create} from 'zustand';

export type ViewMode = 'feed' | 'album';

interface ViewModeState {
  mode: ViewMode;
  isVisible: boolean;
  setMode: (mode: ViewMode) => void;
  showOption: () => void;
  hideOption: () => void;
}

const useViewModeStore = create<ViewModeState>(set => ({
  mode: 'album',
  isVisible: false,
  setMode: (mode: ViewMode) => {
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
