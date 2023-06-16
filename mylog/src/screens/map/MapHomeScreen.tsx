import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import MyMapView from '@/components/map/MyMapView';
import MarkerModal from '@/components/map/MarkerModal';
import useMarkerFilterStorage from '@/hooks/storage/useMarkerFilterStorage';
import useViewModeStorage from '@/hooks/storage/useViewModeStorage';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';

function MapHomeScreen() {
  const markerFilter = useMarkerFilterStorage();
  const {data: markers = []} = useGetMarkers({
    select: markerFilter.transformFilteredMarker,
  });
  const {data: posts} = useGetInfinitePosts();
  useViewModeStorage();

  useEffect(() => {
    const feedFirstPageImages = posts?.pages
      .flat()
      .flatMap(post => post.images.map(image => ({uri: image.uri})));

    FastImage.preload(feedFirstPageImages ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
