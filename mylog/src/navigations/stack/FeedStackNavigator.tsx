import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {feedNavigations} from '@/constants/navigations';
import FeedLeftHeader from '@/components/FeedLeftHeader';
import {colors} from '@/constants/colors';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

const feedStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
  headerTitleStyle: {
    fontSize: 15,
  },
  headerTintColor: colors.BLACK,
  // cardStyle: {
  //   backgroundColor: colors.WHITE,
  // },
};

function FeedStackNavigator() {
  return (
    <Stack.Navigator screenOptions={feedStackOptions}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedLeftHeader(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
