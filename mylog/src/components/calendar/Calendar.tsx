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
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CalendarDate from './CalendarDate';
import CalendarDayOfWeeks from './CalendarDayOfWeeks';
import CalendarHomeHeaderRight from './CalendarHomeHeaderRight';
import YearSelector from './YearSelector';
import useModal from '@/hooks/useModal';
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
  const yearSelector = useModal();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => yearSelector.hide(),
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

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

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
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors[theme].GRAY_500}
          />
        </Pressable>
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

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentyear={year}
        onChangeYear={handleChangeYear}
        hide={yearSelector.hide}
      />
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
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
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
