import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {useGetMarkers} from '@/hooks/queries/useMarker';
import FeedItem from './FeedItem';

function FeedItemList() {
  const {data: posts = []} = useGetMarkers();

  return (
    <FlatList
      data={posts}
      renderItem={({item: post}) => <FeedItem post={post} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      //   onRefresh={refreshData}
      //   refreshing={isRefreshing}
      //   onEndReached={onEndReached}
      //   onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedItemList;
