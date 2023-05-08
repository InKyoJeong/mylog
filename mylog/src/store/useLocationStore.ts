import {create} from 'zustand';
import type {LatLng} from 'react-native-maps';

import {numbers} from '@/constants/numbers';

interface OptionState {
  location: LatLng;
  setLocation: (location: LatLng) => void;
}

const useLocationStore = create<OptionState>(set => ({
  location: {
    latitude: numbers.INITIAL_LATITUDE,
    longitude: numbers.INITIAL_LONGITUDE,
  },
  setLocation: (location: LatLng) => {
    set({location});
  },
}));

export default useLocationStore;
