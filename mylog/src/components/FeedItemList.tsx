import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {useGetPosts} from '@/hooks/queries/usePost';
import FeedItem from './FeedItem';

function FeedItemList() {
  const {data: posts = []} = useGetPosts();

  return (
    <FlatList
      data={posts}
      renderItem={({item: post}) => <FeedItem post={post} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle="black"
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
