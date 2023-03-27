import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen';
import AddLocationScreen from '../../screens/AddLocationScreen';

export enum HomeNavigations {
  Home = 'Home',
  AddLocation = 'AddLocation',
}

export type HomeStackParamList = {
  [HomeNavigations.Home]: undefined;
  [HomeNavigations.AddLocation]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HomeNavigations.Home} component={HomeScreen} />
      <Stack.Screen
        name={HomeNavigations.AddLocation}
        component={AddLocationScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
