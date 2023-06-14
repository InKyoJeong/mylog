import React, {Suspense} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import Indicator from '@/components/@common/Indicator';
import FeedItemFavoriteList from '@/components/feed/FeedItemFavoriteList';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator />}>
          <FeedItemFavoriteList />
        </Suspense>
      </RetryErrorBoundary>
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
