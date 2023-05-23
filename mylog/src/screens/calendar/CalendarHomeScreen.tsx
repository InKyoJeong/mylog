import React from 'react';
import {StyleSheet, View} from 'react-native';

import CalendarDayOfWeeks from '@/components/calendar/CalendarDayOfWeeks';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarBody from '@/components/calendar/CalendarBody';
import CalendarContentsList from '@/components/calendar/CalendarContentsList';
import {useCalendarPostsQuery} from '@/hooks/queries/useCalendarPost';
import useCalendar from '@/hooks/useCalendar';

interface CalendarHomeScreenProps {}

function CalendarHomeScreen({}: CalendarHomeScreenProps) {
  const {monthYear, selectedDate, handlePressDate, handleUpdateMonth} =
    useCalendar();
  const {
    data: posts,
    isLoading,
    isError,
  } = useCalendarPostsQuery(monthYear.year, monthYear.month);

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <CalendarHeader monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
      <CalendarDayOfWeeks />
      <CalendarBody
        monthYear={monthYear}
        schedules={posts}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
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
