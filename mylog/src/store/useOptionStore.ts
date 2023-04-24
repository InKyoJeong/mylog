import {create} from 'zustand';

interface OptionState {
  isVisible: boolean;
  showOption: () => void;
  hideOption: () => void;
}

const useOptionStore = create<OptionState>(set => ({
  isVisible: false,
  showOption: () => {
    set({isVisible: true});
  },
  hideOption: () => {
    set({isVisible: false});
  },
}));

export default useOptionStore;
