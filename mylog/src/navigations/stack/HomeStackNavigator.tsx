import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen';
import AddLocationScreen from '../../screens/AddLocationScreen';

export enum HomeNavigations {
  MapHome = 'MapHome',
  AddLocation = 'AddLocation',
}

export type HomeStackParamList = {
  [HomeNavigations.MapHome]: undefined;
  [HomeNavigations.AddLocation]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeNavigations.MapHome}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={HomeNavigations.AddLocation}
        component={AddLocationScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
