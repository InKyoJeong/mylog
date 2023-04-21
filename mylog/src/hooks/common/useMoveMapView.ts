import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

function useMoveMapView(
  initialDelta: Pick<Region, 'latitudeDelta' | 'longitudeDelta'>,
) {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState(initialDelta);
  const [selectedMarker, setSelectedMarker] = useState<LatLng>();

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

  useEffect(() => {
    if (!selectedMarker) {
      return;
    }

    moveMapView(selectedMarker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker]);

  return {mapRef, moveMapView, handleChangeDelta, setSelectedMarker};
}

export default useMoveMapView;