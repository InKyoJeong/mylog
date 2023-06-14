import {create} from 'zustand';

interface MarkerState {
  markerId: number;
  isVisible: boolean;
  showModal: (id: number) => void;
  hideModal: () => void;
}

const useMarkerModalStore = create<MarkerState>(set => ({
  markerId: 0,
  isVisible: false,
  showModal: (id: number) => {
    set({markerId: id, isVisible: true});
  },
  hideModal: () => {
    set(state => ({...state, isVisible: false}));
  },
}));

export default useMarkerModalStore;
