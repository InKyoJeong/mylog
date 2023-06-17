import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FeedItemSearchList from '@/components/feed/FeedItemSearchList';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import Indicator from '@/components/@common/Indicator';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

function FeedSearchScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator />}>
          <FeedItemSearchList />
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

export default FeedSearchScreen;
