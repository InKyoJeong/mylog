import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {
  FlatList,
  PanResponder,
  StyleSheet,
  View,
  Pressable,
  Text,
  LayoutAnimation,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import CalendarDate from './CalendarDate';
import CalendarDayOfWeeks from './CalendarDayOfWeeks';
import CalendarHomeHeaderRight from './CalendarHomeHeaderRight';
import useThemeStore from '@/store/useThemeStore';
import {MonthYear, isSameAsCurrentDate} from '@/utils';
import {colors, numbers} from '@/constants';
import type {ThemeMode} from '@/types';

interface CalendarProps<T> {
  monthYear: MonthYear;
  schedules: Record<number, T[]>;
  selectedDate: number;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
  moveToToday: () => void;
}

function Calendar<T>({
  monthYear,
  schedules,
  selectedDate,
  onPressDate,
  onChangeMonth,
  moveToToday,
}: CalendarProps<T>) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {lastDate, firstDOW, year, month} = monthYear;
  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -numbers.MIN_CALENDAR_SLIDE_OFFEST) {
          onChangeMonth(1);
        }
        if (gestureState.dy > numbers.MIN_CALENDAR_SLIDE_OFFEST) {
          onChangeMonth(-1);
        }
      },
    }),
  ).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [schedules]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={25}
            color={colors[theme].BLACK}
          />
        </Pressable>
        <Text style={styles.titleText}>
          {year}년 {month}월
        </Text>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={25}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>

      <CalendarDayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          scrollEnabled
          {...panResponder.panHandlers}
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <CalendarDate
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 16,
    },
    monthButtonContainer: {
      padding: 10,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    bodyContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].GRAY_100,
    },
  });

export default Calendar;
