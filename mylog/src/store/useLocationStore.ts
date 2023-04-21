import {create} from 'zustand';
import type {LatLng} from 'react-native-maps';

interface LocationState {
  selectedMarker: LatLng | null;
  setSelectedMarker: (coordinate: LatLng) => void;
}

const LocationStore = create<LocationState>(set => ({
  selectedMarker: null,
  setSelectedMarker: (coordinate: LatLng) => {
    set(state => ({selectedMarker: {...state.selectedMarker, ...coordinate}}));
  },
}));

export default LocationStore;
