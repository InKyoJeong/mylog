import {create} from 'zustand';

interface modalState {
  isVisible: boolean;
  markerId: number;
  showModal: (id: number) => void;
  hideModal: () => void;
}

const useModalStore = create<modalState>(set => ({
  isVisible: false,
  markerId: 0,
  showModal: (id: number) => {
    set({isVisible: true, markerId: id});
  },
  hideModal: () => {
    set({isVisible: false});
  },
}));

export default useModalStore;
