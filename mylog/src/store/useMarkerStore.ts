import {create} from 'zustand';

interface MarkerState {
  markerId: number;
  isVisible: boolean;
  showModal: (id: number) => void;
  hideModal: () => void;
}

const useMarkerStore = create<MarkerState>(set => ({
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
