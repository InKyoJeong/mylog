import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Svg, Path, Circle, G} from 'react-native-svg';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

type DataItem = {
  id: number;
  count: number;
  color: string;
  field: string;
};

interface DonutChartProps {
  data: DataItem[];
  title?: string;
}

function DonutChart({data, title}: DonutChartProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const totalCount = data.reduce((acc, item) => acc + item.count, 0);
  let startAngle = 0;

  const renderSlice = (item: DataItem, index: number) => {
    const {count, color} = item;
    const angle = (count / totalCount) * 360;
    const endAngle = startAngle + angle;
    const largeArcFlag = angle <= 180 ? 0 : 1;

    const slicePath = `
        M 100,100
        L ${100 + 100 * Math.cos((startAngle * Math.PI) / 180)}, ${
      100 + 100 * Math.sin((startAngle * Math.PI) / 180)
    }
        A 100,100 0 ${largeArcFlag} 1 ${
      100 + 100 * Math.cos((endAngle * Math.PI) / 180)
    }, ${100 + 100 * Math.sin((endAngle * Math.PI) / 180)}
        L 100,100
      `;

    startAngle += angle;

    return <Path key={index} d={slicePath} fill={color} />;
  };

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {title} ({totalCount})
          </Text>
        </View>
      )}
      <Svg width={200} height={200}>
        <G transform="rotate(-90 100 100)">{data.map(renderSlice)}</G>
        <Circle cx={100} cy={100} r={50} fill={colors[theme].WHITE} />
      </Svg>

      <View style={styles.legendContainer}>
        {data.map(item => (
          <View key={item.id} style={styles.legendItem}>
            <View style={[styles.fieldColor, {backgroundColor: item.color}]} />
            <Text style={styles.fieldText}>
              {item.field} ({Math.floor((item.count / totalCount) * 100)}%,{' '}
              {item.count})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 20,
    },
    titleContainer: {
      marginBottom: 15,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '600',
      fontSize: 15,
    },
    legendContainer: {
      marginVertical: 20,
      marginHorizontal: 15,
      display: 'flex',
      gap: 5,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    fieldColor: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 5,
    },
    fieldText: {
      color: colors[theme].BLACK,
    },
  });

export default DonutChart;
