import React, {memo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import Conditional from '../@common/Conditional';
import useThemeStore from '@/store/useThemeStore';
import SearchHistoryItem from './SearchHistoryItem';
import useSearchHistoryStorage from '@/hooks/storage/useSearchHistoryStorage';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface SearchHistoryListProps {
  storageKey: string;
}

function SearchHistoryList({storageKey}: SearchHistoryListProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {searchedList, clearList} = useSearchHistoryStorage(storageKey);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>최근 검색어</Text>
        <Pressable onPress={clearList}>
          <Text style={styles.deleteAllText}>전체삭제</Text>
        </Pressable>
      </View>

      <Conditional condition={searchedList.length > 0}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {searchedList.map((keyword, index) => (
              <SearchHistoryItem key={index} keyword={keyword} />
            ))}
          </View>
        </ScrollView>
      </Conditional>

      <Conditional condition={searchedList.length === 0}>
        <Text style={styles.noRecentText}>최근 검색어가 없습니다.</Text>
      </Conditional>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      color: colors[theme].BLACK,
      fontSize: 15,
      fontWeight: 'bold',
    },
    deleteAllText: {
      color: colors[theme].BLACK,
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    listContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    noRecentText: {
      textAlign: 'center',
      color: colors[theme].GRAY_300,
    },
  });

export default memo(SearchHistoryList);
