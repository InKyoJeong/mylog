import {create} from 'zustand';

interface ModalState {
  markerId: number;
  isVisible: boolean;
  showModal: (id: number) => void;
  hideModal: () => void;
}

const useMarkerStore = create<ModalState>(set => ({
  markerId: 0,
  isVisible: false,
  showModal: (id: number) => {
    set({isVisible: true, markerId: id});
  },
  hideModal: () => {
    set(state => ({...state, isVisible: false}));
  },
}));

export default useMarkerStore;
