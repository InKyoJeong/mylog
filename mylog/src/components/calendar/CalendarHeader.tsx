import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';
import type {MonthYear} from '@/utils';

interface CalendarHeaderProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

function CalendarHeader({monthYear, onChangeMonth}: CalendarHeaderProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {year, month} = monthYear;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChangeMonth(-1)}
        style={styles.buttonContainer}>
        <Text>이전</Text>
      </Pressable>
      <Text style={styles.titleText}>
        {year}년 {month}월
      </Text>
      <Pressable
        onPress={() => onChangeMonth(1)}
        style={styles.buttonContainer}>
        <Text>다음</Text>
      </Pressable>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 18,
    },
    buttonContainer: {
      padding: 10,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
  });

export default CalendarHeader;
