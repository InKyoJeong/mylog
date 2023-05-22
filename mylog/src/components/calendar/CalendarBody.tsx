import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import CalendarDate from './CalendarDate';
import useThemeStore from '@/store/useThemeStore';
import type {MonthYear} from '@/utils';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface CalendarBodyProps<T> {
  monthYear: MonthYear;
  schedules: Record<number, T[]>;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

function CalendarBody<T>({
  monthYear,
  schedules,
  selectedDate,
  onPressDate,
}: CalendarBodyProps<T>) {
  const {lastDate, firstDOW} = monthYear;
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
          id: i,
          date: i - firstDOW + 1,
        }))}
        renderItem={({item}) => (
          <CalendarDate
            date={item.date}
            selectedDate={selectedDate}
            hasSchedule={!!schedules[item.date]}
            onPressDate={onPressDate}
          />
        )}
        keyExtractor={item => String(item.id)}
        numColumns={7}
        // horizontal={false}
        // scrollEnabled={false}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].GRAY_100,
    },
  });

export default CalendarBody;
