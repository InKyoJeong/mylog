import {create} from 'zustand';
import type {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  selectLocation: LatLng | null;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
