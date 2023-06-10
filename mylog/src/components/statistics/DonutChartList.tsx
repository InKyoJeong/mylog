import React from 'react';
import {ScrollView} from 'react-native';

import DonutChart from '@/components/statistics/DonutChart';
import useGetPostCount from '@/hooks/queries/useGetPostCount';

function DonutChartList() {
  const [{data: colorCount = []}, {data: scoreCount = []}] = useGetPostCount();

  return (
    <ScrollView>
      <DonutChart data={colorCount} title="카테고리" />
      <DonutChart data={scoreCount} title="점수" />
    </ScrollView>
  );
}

export default DonutChartList;
