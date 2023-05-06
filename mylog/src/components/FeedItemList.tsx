import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import FeedItem from './FeedItem';
import InfoMessage from './common/InfoMessage';
import {useGetInifinitePosts} from '@/hooks/queries/usePost';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {mainNavigations} from '@/constants/navigations';

function FeedItemList() {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  // const handlePressFeed = () => {
  //   navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id});
  // };

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
    <InfoMessage
      message="아직 등록된 위치가 없어요."
      buttonLabel="홈으로 이동"
      onPress={() => navigation.navigate(mainNavigations.HOME)}
    />
  );

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedItemList;
