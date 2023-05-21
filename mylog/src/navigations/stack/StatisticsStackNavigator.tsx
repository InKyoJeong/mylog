import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StatisticsScreen from '@/screens/statistics/StatisticsScreen';
import StatisticsHeaderLeft from '@/components/statistics/StatisticsHeaderLeft';
import useThemeStore from '@/store/useThemeStore';
import {statisticsNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type StatisticsStackParamList = {
  [statisticsNavigations.STATISTICS_HOME]: undefined;
};

const Stack = createStackNavigator<StatisticsStackParamList>();

function StatisticsStackNavigator() {
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
        name={statisticsNavigations.STATISTICS_HOME}
        component={StatisticsScreen}
        options={({navigation}) => ({
          headerTitle: '통계',
          headerLeft: () => StatisticsHeaderLeft(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

export default StatisticsStackNavigator;
