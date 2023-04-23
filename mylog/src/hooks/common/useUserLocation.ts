import {useEffect, useState} from 'react';
import type {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import useAppState from './useAppState';

function useUserLocation(initialLocation: LatLng) {
  const [userLocation, setUserLocation] = useState(initialLocation);
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      error => {
        console.log('사용자 위치 권한 에러', error);
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 20000,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
