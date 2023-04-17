import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import useAppState from './useAppState';

function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const {isComeback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log('error', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, [isComeback]);

  return {currentLocation};
}

export default useCurrentLocation;
