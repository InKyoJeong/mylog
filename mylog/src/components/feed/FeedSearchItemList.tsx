import React, {useState} from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import SearchInput from '../@common/SearchInput';
import InfoMessage from '../@common/InfoMessage';
import FeedItem from './FeedItem';
import {useGetInifiniteSearchPosts} from '@/hooks/queries/usePost';
import useDebounce from '@/hooks/useDebounce';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';

interface FeedSearchItemListProps {}

function FeedSearchItemList({}: FeedSearchItemListProps) {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const [keyword, setKeyword] = useState('');

  const debouncedSearchText = useDebounce(
    keyword,
    numbers.SEARCH_INPUT_DEBOUNCE_TIME,
  );

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // refetch,
  } = useGetInifiniteSearchPosts(debouncedSearchText, {
    enabled: Boolean(keyword.trim().length),
  });

  const handleChangeKeyword = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
        ListEmptyComponent={<InfoMessage message="검색 결과가 없습니다." />}
        ListHeaderComponent={
          <View style={{flexDirection: 'row', gap: 5}}>
            <Pressable
              style={{
                justifyContent: 'center',
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: colors.GRAY_200,
                borderRadius: 5,
              }}
              onPress={() => navigation.openDrawer()}>
              <Ionicons name={'md-menu-sharp'} color={colors.BLACK} size={25} />
            </Pressable>

            <View style={{flex: 1}}>
              <SearchInput
                //   autoFocus
                placeholder="주소 또는 제목으로 검색"
                value={keyword}
                onChangeText={handleChangeKeyword}
                onSubmit={() => {}}
              />
            </View>
          </View>
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedSearchItemList;
