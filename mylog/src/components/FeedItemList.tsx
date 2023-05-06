import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useGetInifinitePosts} from '@/hooks/queries/usePost';
import FeedItem from './FeedItem';

function FeedItemList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInifinitePosts();

  const renderEmptyList = () => (
    <View>
      <Text>No data found.</Text>
    </View>
  );

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={posts?.pages?.flatMap(page => page) ?? []}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle="black"
      ListEmptyComponent={renderEmptyList}
      //   onRefresh={refreshData}
      //   refreshing={isRefreshing}
      onEndReached={handleEndReached}
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
