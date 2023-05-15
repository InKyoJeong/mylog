import React, {memo, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import Conditional from './Conditional';
import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import {colors} from '@/constants/colors';

interface RecentSearchedListProps {
  storageKey: string;
}

function RecentSearchedList({storageKey}: RecentSearchedListProps) {
  const [value, setValue] = useState([]);

  const clearList = async () => {
    await setAsyncStorage(storageKey, []);
    setValue([]);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage(storageKey)) ?? [];
      setValue(storedData);
    })();
  }, [storageKey]);

  return (
    <Conditional condition={value.length > 0}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>최근 검색어</Text>
          <Pressable onPress={clearList}>
            <Text style={styles.deleteAllText}>전체삭제</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {value.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Conditional>
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
});

export default memo(RecentSearchedList);
