import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

import HomeScreen from '@/screens/HomeScreen';
import AddLocationScreen from '@/screens/AddLocationScreen';
import {homeNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type HomeStackParamList = {
  [homeNavigations.MAP_HOME]: undefined;
  [homeNavigations.ADD_LOCATION]: {location: LatLng};
};

const Stack = createStackNavigator<HomeStackParamList>();

const homeStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
  headerTintColor: colors.BLACK,
  cardStyle: {
    backgroundColor: colors.WHITE,
  },
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={homeStackOptions}>
      <Stack.Screen
        name={homeNavigations.MAP_HOME}
        component={HomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={homeNavigations.ADD_LOCATION}
        component={AddLocationScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
