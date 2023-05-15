import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import useSearchStore from '@/store/useSearchStore';
import {colors} from '@/constants/colors';

interface RecentSearchedItemProps {
  keyword: string;
}

function RecentSearchedItem({keyword}: RecentSearchedItemProps) {
  const {setKeyword} = useSearchStore();

  return (
    <Pressable style={styles.listItem} onPress={() => setKeyword(keyword)}>
      <Text style={styles.itemText}>{keyword}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.PINK_200,
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

export default RecentSearchedItem;
