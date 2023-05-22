import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';

import CalendarDayOfWeeks from '@/components/calendar/CalendarDayOfWeeks';
import useThemeStore from '@/store/useThemeStore';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {colors} from '@/constants';
import CalendarDate from '@/components/calendar/CalendarDate';
import {useGetCalendarPosts} from '@/hooks/queries/useCalendarPost';

interface CalendarHomeScreenProps {}

function CalendarHomeScreen({}: CalendarHomeScreenProps) {
  const {theme} = useThemeStore();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const {year, month, lastDate, firstDOW} = monthYear;
  const {data: posts, isLoading, isError} = useGetCalendarPosts(year, month);

  if (isLoading || isError) {
    return <></>;
  }

  console.log('monthYear', monthYear);
  console.log('posts', posts);

  const updateMonthYear = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 25,
            marginVertical: 18,
          }}>
          <Pressable
            onPress={() => updateMonthYear(-1)}
            style={{backgroundColor: 'red', padding: 10}}>
            <Text>이전</Text>
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: colors[theme].BLACK,
            }}>
            {year}년 {month}월
          </Text>
          <Pressable
            onPress={() => updateMonthYear(1)}
            style={{backgroundColor: 'red', padding: 10}}>
            <Text>다음</Text>
          </Pressable>
        </View>

        <CalendarDayOfWeeks />

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors[theme].GRAY_300,
            backgroundColor: colors[theme].GRAY_100,
          }}>
          <FlatList
            data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
              id: i,
              date: i - firstDOW + 1,
            }))}
            renderItem={({item}) => (
              <CalendarDate date={item.date} hasSchedule={!!posts[item.date]} />
            )}
            keyExtractor={item => String(item.id)}
            numColumns={7}
            // horizontal={false}
            // scrollEnabled={false}
          />
        </View>
      </View>

      <View style={{backgroundColor: 'yellow', marginTop: 30}}>
        <Text>목록</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default CalendarHomeScreen;
