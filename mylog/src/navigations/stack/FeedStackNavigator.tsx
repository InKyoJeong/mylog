import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import FeedScreen from '@/screens/feed/FeedScreen';
// import LocationDetailScreen from '@/screens/LocationDetailScreen';
import {feedNavigations} from '@/constants/navigations';
import FeedLeftHeader from '@/components/FeedLeftHeader';
import {colors} from '@/constants/colors';

export type FeedStackParamList = {
  [feedNavigations.LOCATION_FEED]: undefined;
  // [feedNavigations.LOCATION_DETAIL]: undefined;
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
        name={feedNavigations.LOCATION_FEED}
        component={FeedScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedLeftHeader(navigation),
        })}
      />
      {/* <Stack.Screen
        name={feedNavigations.LOCATION_DETAIL}
        component={LocationDetailScreen}
      /> */}
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
