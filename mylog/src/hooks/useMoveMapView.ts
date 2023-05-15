import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

import useLocationStore from '@/store/useLocationStore';
import {numbers} from '@/constants/numbers';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

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
    moveLocation && moveMapView(moveLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveLocation]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
