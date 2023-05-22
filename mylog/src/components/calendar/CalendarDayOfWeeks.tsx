import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors, dayOfWeekList} from '@/constants';
import type {ThemeMode} from '@/types';

const deviceWidth = Dimensions.get('window').width;

function CalendarDayOfWeeks() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      {dayOfWeekList.map((dayOfWeek, i) => {
        return (
          <View key={i} style={styles.item}>
            <Text style={styles.text}>{dayOfWeek}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      width: deviceWidth / 7,
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: colors[theme].BLACK,
    },
  });

export default CalendarDayOfWeeks;
