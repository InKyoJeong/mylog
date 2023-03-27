import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from '../../screens/FeedScreen';
import LocationDetailScreen from '../../screens/LocationDetailScreen';

export enum FeedNavigations {
  Feed = 'Feed',
  LocationDetail = 'LocationDetail',
}

export type FeedStackParamList = {
  [FeedNavigations.Feed]: undefined;
  [FeedNavigations.LocationDetail]: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={FeedNavigations.Feed} component={FeedScreen} />
      <Stack.Screen
        name={FeedNavigations.LocationDetail}
        component={LocationDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
