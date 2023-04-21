import {useEffect, useRef} from 'react';
import MapView, {LatLng} from 'react-native-maps';

import useLocationStore from '@/store/useLocationStore';

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const {location} = useLocationStore();

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    if (!location) {
      return;
    }

    moveMapView(location);
  }, [location]);

  return {mapRef, moveMapView};
}

export default useMoveMapView;
