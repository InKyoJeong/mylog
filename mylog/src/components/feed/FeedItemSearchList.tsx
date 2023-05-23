import React, {useState} from 'react';
import {Keyboard, FlatList, Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import SearchInput from '../@common/SearchInput';
import InfoMessage from '../@common/InfoMessage';
import FeedItem from './FeedItem';
import {useInfiniteSearchPostsQuery} from '@/hooks/queries/usePost';
import useDebounce from '@/hooks/useDebounce';
import useThemeStore from '@/store/useThemeStore';
import {colors, numbers} from '@/constants';
import type {ThemeMode} from '@/types';

function FeedItemSearchList() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
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
  } = useInfiniteSearchPostsQuery(debouncedSearchText, {
    enabled: !!debouncedSearchText.trim().length,
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
    <FlatList
      data={posts?.pages.flatMap(page => page)}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle={theme === 'dark' ? 'white' : 'black'}
      ListEmptyComponent={<InfoMessage message="검색 결과가 없습니다." />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.drawerIconContainer}
            onPress={() => navigation.openDrawer()}>
            <Ionicons
              name={'md-menu-sharp'}
              color={colors[theme].BLACK}
              size={25}
            />
          </Pressable>
          <Animated.View
            style={styles.inputContainer}
            entering={FadeInRight.duration(500)}>
            <SearchInput
              autoFocus
              placeholder="주소 또는 제목으로 검색"
              value={keyword}
              onChangeText={handleChangeKeyword}
              onSubmit={() => Keyboard.dismiss()}
            />
          </Animated.View>
        </View>
      }
      stickyHeaderIndices={[0]}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 15,
    },
    headerContainer: {
      flexDirection: 'row',
      gap: 5,
      backgroundColor: colors[theme].WHITE,
      paddingHorizontal: 5,
      paddingTop: 5,
      paddingBottom: 10,
    },
    drawerIconContainer: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
    },
    inputContainer: {
      flex: 1,
    },
  });

export default FeedItemSearchList;
