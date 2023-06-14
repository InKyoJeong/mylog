import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import CalendarHomeHeaderLeft from '@/components/calendar/CalendarHomeHeaderLeft';
import useThemeStore from '@/store/useThemeStore';
import {calendarNavigations, colors} from '@/constants';

export type CalendarStackParamList = {
  [calendarNavigations.CALENDAR_HOME]: undefined;
};

const Stack = createStackNavigator<CalendarStackParamList>();

function CalendarStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name={calendarNavigations.CALENDAR_HOME}
        component={CalendarHomeScreen}
        options={({navigation}) => ({
          headerTitle: '캘린더',
          headerLeft: () => CalendarHomeHeaderLeft(navigation),
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default CalendarStackNavigator;
