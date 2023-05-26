import React from 'react';
import {StyleSheet, View} from 'react-native';

import MyMapView from '@/components/map/MyMapView';
import MarkerModal from '@/components/map/MarkerModal';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useMarkerFilterStorage from '@/hooks/useMarkerFilterStorage';

function MapHomeScreen() {
  const markerFilter = useMarkerFilterStorage();
  const {data: markers = []} = useGetMarkers({
    select: markerFilter.transformFilteredMarker,
  });

  return (
    <View style={styles.container}>
      <MyMapView markers={markers} />
      <MarkerModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
