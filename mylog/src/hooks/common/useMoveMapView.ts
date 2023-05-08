import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

import useLocationStore from '@/store/useLocationStore';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView(initialDelta: Delta) {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState(initialDelta);
  const {location} = useLocationStore();

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  useEffect(() => {
    moveMapView(location, {
      latitudeDelta: 0.006567527582639343,
      longitudeDelta: 0.003826171159730052,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
