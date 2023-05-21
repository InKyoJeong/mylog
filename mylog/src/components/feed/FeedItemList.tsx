import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import FeedItem from './FeedItem';
import InfoMessage from '../@common/InfoMessage';
import {useGetInifinitePosts} from '@/hooks/queries/usePost';
import {mainNavigations, mapNavigations} from '@/constants/navigations';

function FeedItemList() {
  const scrollRef = useRef(null);
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInifinitePosts();
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
      data={posts?.pages.flatMap(page => page)}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle="black"
      ListEmptyComponent={
        <InfoMessage
          message="아직 등록된 위치가 없어요."
          buttonLabel="홈으로 이동"
          onPress={() =>
            navigation.navigate(mainNavigations.HOME, {
              screen: mapNavigations.MAP_HOME,
            })
          }
        />
      }
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
