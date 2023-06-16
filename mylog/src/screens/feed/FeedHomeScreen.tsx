import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Indicator from '@/components/@common/Indicator';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import FeedItemList from '@/components/feed/FeedItemList';
import FeedViewModeOption from '@/components/feed/FeedViewModeOption';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator />}>
          <FeedItemList />
          <FeedViewModeOption />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
