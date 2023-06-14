import React, {useRef, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';

import FeedItem from './FeedItem';
import InfoMessage from '../@common/InfoMessage';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import useThemeStore from '@/store/useThemeStore';

function FeedItemFavoriteList() {
  const {theme} = useThemeStore();
  const scrollRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  useScrollToTop(scrollRef);

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

  return (
    <FlatList
      ref={scrollRef}
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle={theme === 'dark' ? 'white' : 'black'}
      ListEmptyComponent={<InfoMessage message="북마크한 장소가 없습니다." />}
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

export default FeedItemFavoriteList;
