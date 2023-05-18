import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import StatisticsScreen from '@/screens/statistics/StatisticsScreen';
import StatisticsHeaderLeft from '@/components/statistics/StatisticsHeaderLeft';
import {statisticsNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type StatisticsStackParamList = {
  [statisticsNavigations.STATISTICS_HOME]: undefined;
};

const Stack = createStackNavigator<StatisticsStackParamList>();

const statisticsStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
  headerTitleStyle: {
    fontSize: 15,
  },
  headerTintColor: colors.BLACK,
  cardStyle: {
    backgroundColor: colors.WHITE,
  },
};

function StatisticsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={statisticsStackOptions}>
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
