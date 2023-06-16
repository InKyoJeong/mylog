import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import FeedItem from './FeedItem';
import InfoMessage from '../@common/InfoMessage';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import useThemeStore from '@/store/useThemeStore';
import useViewModeStore from '@/store/useViewModeStore';
import {mainNavigations, mapNavigations} from '@/constants';

function FeedItemList() {
  const {theme} = useThemeStore();
  const {mode} = useViewModeStore();
  const scrollRef = useRef(null);
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
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

  const handlePressMoveHome = () => {
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  return (
    <>
      <FlatList
        key={mode}
        ref={scrollRef}
        data={posts?.pages.flat()}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => mode + String(item.id)}
        numColumns={mode === 'album' ? 2 : 1}
        scrollIndicatorInsets={{right: 1}}
        contentContainerStyle={styles.contentContainer}
        indicatorStyle={theme === 'dark' ? 'white' : 'black'}
        ListEmptyComponent={
          <InfoMessage
            message="아직 등록된 장소가 없어요."
            buttonLabel="홈으로 이동"
            onPress={handlePressMoveHome}
          />
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedItemList;
