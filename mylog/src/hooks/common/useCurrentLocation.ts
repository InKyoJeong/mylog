import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import useAppState from './useAppState';

function useCurrentLocation(initialLocation: LatLng) {
  const [currentLocation, setCurrentLocation] =
    useState<LatLng>(initialLocation);
  const [isCurrentLocationError, setIsCurrentLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setCurrentLocation({latitude, longitude});
        setIsCurrentLocationError(false);
      },
      error => {
        console.log('error 권한 에러', error);
        setIsCurrentLocationError(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  }, [isComeback]);

  return {currentLocation, isCurrentLocationError};
}

export default useCurrentLocation;
