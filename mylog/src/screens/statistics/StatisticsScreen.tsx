import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import Indicator from '@/components/@common/Indicator';
import DonutChartList from '@/components/statistics/DonutChartList';

function StatisticsScreen() {
  return (
    <RetryErrorBoundary>
      <Suspense fallback={<Indicator />}>
        <SafeAreaView style={styles.container}>
          <DonutChartList />
        </SafeAreaView>
      </Suspense>
    </RetryErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StatisticsScreen;
