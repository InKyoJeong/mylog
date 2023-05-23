import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import type {CalendarStackParamList} from '@/navigations/stack/CalendarStackNavigator';
import Calendar from '@/components/calendar/Calendar';
import CalendarHomeHeaderRight from '@/components/calendar/CalendarHomeHeaderRight';
import CalendarContentsList from '@/components/calendar/CalendarContentsList';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import useCalendar from '@/hooks/useCalendar';

type CalendarHomeScreenProps = StackScreenProps<CalendarStackParamList>;

function CalendarHomeScreen({navigation}: CalendarHomeScreenProps) {
  const {
    monthYear,
    selectedDate,
    handlePressDate,
    handleUpdateMonth,
    moveToToday,
  } = useCalendar();
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        onChangeMonth={handleUpdateMonth}
      />
      <CalendarContentsList posts={posts[selectedDate]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarHomeScreen;
