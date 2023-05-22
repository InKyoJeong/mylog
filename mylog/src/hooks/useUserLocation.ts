import {useEffect, useState} from 'react';
import type {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import useAppState from './useAppState';
import {numbers} from '@/constants';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>(
    numbers.INITIAL_LOCATION,
  );
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
