import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  location: LatLng | null;
  setLocation: (coordinate: LatLng) => void;
}

const LocationStore = create<LocationState>(set => ({
  location: null,
  setLocation: (coordinate: LatLng) => {
    set(state => ({location: {...state.location, ...coordinate}}));
  },
}));

export default LocationStore;
