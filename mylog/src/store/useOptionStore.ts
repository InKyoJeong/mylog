import {create} from 'zustand';

interface OptionState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

const useOptionStore = create<OptionState>(set => ({
  isVisible: false,
  show: () => {
    set({isVisible: true});
  },
  hide: () => {
    set({isVisible: false});
  },
}));

export default useOptionStore;
