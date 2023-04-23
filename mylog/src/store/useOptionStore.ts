import {create} from 'zustand';

interface optionState {
  isVisible: boolean;
  showOption: () => void;
  hideOption: () => void;
}

const useOptionStore = create<optionState>(set => ({
  isVisible: false,
  showOption: () => {
    set({isVisible: true});
  },
  hideOption: () => {
    set({isVisible: false});
  },
}));

export default useOptionStore;
