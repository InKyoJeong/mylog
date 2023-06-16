import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import useSearchStore from '@/store/useSearchStore';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface SearchHistoryItemProps {
  keyword: string;
}

function SearchHistoryItem({keyword}: SearchHistoryItemProps) {
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
      backgroundColor:
        theme === 'light'
          ? colors[theme].PINK_200
          : colors[theme].UNCHANGE_BLACK,
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

export default SearchHistoryItem;
