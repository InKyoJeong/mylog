import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FeedItemList from '@/components/feed/FeedItemList';
import Indicator from '@/components/@common/Indicator';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator />}>
          <FeedItemList />
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
