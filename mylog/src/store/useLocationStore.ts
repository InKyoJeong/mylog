import {create} from 'zustand';
import type {LatLng} from 'react-native-maps';

interface OptionState {
  location: LatLng | null;
  setLocation: (location: LatLng) => void;
}

const useLocationStore = create<OptionState>(set => ({
  location: null,
  setLocation: (location: LatLng) => {
    set({location});
  },
}));

export default useLocationStore;
