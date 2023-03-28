import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import AddLocationScreen from '@/screens/AddLocationScreen';
import {homeNavigations} from '@/constants';

export type HomeStackParamList = {
  [homeNavigations.MAP_HOME]: undefined;
  [homeNavigations.ADD_LOCATION]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeNavigations.MAP_HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={homeNavigations.ADD_LOCATION}
        component={AddLocationScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
