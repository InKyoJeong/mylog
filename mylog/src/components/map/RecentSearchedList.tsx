import React, {memo, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import Conditional from '../@common/Conditional';
import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import {colors} from '@/constants/colors';
import RecentSearchedItem from './RecentSearchedItem';

interface RecentSearchedListProps {
  storageKey: string;
}

function RecentSearchedList({storageKey}: RecentSearchedListProps) {
  const [searchedList, setSearchedList] = useState([]);

  const clearList = async () => {
    await setAsyncStorage(storageKey, []);
    setSearchedList([]);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage(storageKey)) ?? [];
      setSearchedList(storedData);
    })();
  }, [storageKey]);

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
              <RecentSearchedItem key={index} keyword={keyword} />
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  deleteAllText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  listContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  listItem: {
    borderColor: colors.PINK_700,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
  },
  itemText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  noRecentText: {
    textAlign: 'center',
    color: colors.GRAY_300,
  },
});

export default memo(RecentSearchedList);
