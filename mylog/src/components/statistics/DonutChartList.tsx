import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import DonutChart from '@/components/statistics/DonutChart';
import useGetPostCount from '@/hooks/queries/useGetPostCount';

function DonutChartList() {
  const [{data: colorCount = []}, {data: scoreCount = []}] = useGetPostCount();

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{right: 1}}>
      <DonutChart data={colorCount} title="카테고리" />
      <DonutChart data={scoreCount} title="점수" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default DonutChartList;
