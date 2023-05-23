import React from 'react';
import {StyleSheet, View} from 'react-native';

import Calendar from '@/components/calendar/Calendar';
import CalendarContentsList from '@/components/calendar/CalendarContentsList';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import useCalendar from '@/hooks/useCalendar';

function CalendarHomeScreen() {
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
        moveToToday={moveToToday}
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
