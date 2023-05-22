import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import FeedItemFavoriteList from '@/components/feed/FeedItemFavoriteList';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <FeedItemFavoriteList />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });
export default FeedFavoriteScreen;
