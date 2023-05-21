import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import useSearchStore from '@/store/useSearchStore';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

interface RecentSearchedItemProps {
  keyword: string;
}

function RecentSearchedItem({keyword}: RecentSearchedItemProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {setKeyword} = useSearchStore();

  return (
    <Pressable style={styles.listItem} onPress={() => setKeyword(keyword)}>
      <Text style={styles.itemText}>{keyword}</Text>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    listItem: {
      backgroundColor: colors[theme].PINK_200,
      borderColor: colors[theme].PINK_700,
      borderWidth: 1.5,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 15,
    },
    itemText: {
      color: colors[theme].PINK_700,
      fontWeight: 'bold',
    },
  });

export default RecentSearchedItem;
