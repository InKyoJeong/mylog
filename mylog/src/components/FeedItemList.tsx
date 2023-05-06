import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useGetInifinitePosts} from '@/hooks/queries/usePost';
import FeedItem from './FeedItem';

function FeedItemList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInifinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderEmptyList = () => (
    <View>
      <Text>No data found.</Text>
    </View>
  );

  return (
    <FlatList
      data={posts?.pages.flatMap(page => page)}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle="black"
      ListEmptyComponent={renderEmptyList}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedItemList;
