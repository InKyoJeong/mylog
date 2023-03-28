import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from '@/screens/FeedScreen';
import LocationDetailScreen from '@/screens/LocationDetailScreen';
import {feedNavigations} from '@/constants';

export type FeedStackParamList = {
  [feedNavigations.LOCATION_FEED]: undefined;
  [feedNavigations.LOCATION_DETAIL]: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={feedNavigations.LOCATION_FEED}
        component={FeedScreen}
      />
      <Stack.Screen
        name={feedNavigations.LOCATION_DETAIL}
        component={LocationDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
