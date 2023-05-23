import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import Conditional from '../@common/Conditional';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface CalendarDateProps {
  date: number;
  selectedDate: number;
  hasSchedule: boolean;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

function CalendarDate({
  date,
  selectedDate,
  hasSchedule,
  onPressDate,
}: CalendarDateProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      <Conditional condition={date > 0}>
        <View
          style={[
            styles.dateContainer,
            selectedDate === date && styles.selectedContainer,
          ]}>
          <Text
            style={[
              styles.dateText,
              selectedDate === date && styles.selectedDateText,
            ]}>
            {date}
          </Text>
        </View>
        {hasSchedule && <View style={styles.scheduleIndicator} />}
      </Conditional>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: deviceWidth / 7,
      height: deviceWidth / 7,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_200,
      alignItems: 'center',
    },
    dateContainer: {
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 28,
    },
    selectedContainer: {
      backgroundColor: colors[theme].BLACK,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      marginTop: 2,
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });

export default CalendarDate;
