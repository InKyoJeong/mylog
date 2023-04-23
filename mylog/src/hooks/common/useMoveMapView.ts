import {useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

function useMoveMapView(
  initialDelta: Pick<Region, 'latitudeDelta' | 'longitudeDelta'>,
) {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState(initialDelta);

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...regionDelta,
    });
  };

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
