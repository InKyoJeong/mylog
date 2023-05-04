import {create} from 'zustand';

type SnackbarType = 'success' | 'fail';

interface SnackbarState {
  isVisible: boolean;
  info: {message: string; type: SnackbarType};
  show: (message: string, type?: SnackbarType) => void;
  hide: () => void;
}

const useSnackbarStore = create<SnackbarState>((set, get) => ({
  isVisible: false,
  info: {message: '', type: 'success'},
  show: (message: string, type: SnackbarType = 'success') => {
    set({isVisible: true, info: {message, type}});
  },
  hide: () => {
    set({isVisible: false, info: {message: '', type: get().info.type}});
  },
}));

export default useSnackbarStore;
