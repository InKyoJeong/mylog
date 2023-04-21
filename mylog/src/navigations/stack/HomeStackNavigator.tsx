import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddLocationScreen from '@/screens/map/AddLocationScreen';
import {homeNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type HomeStackParamList = {
  [homeNavigations.MAP_HOME]: undefined;
  [homeNavigations.ADD_LOCATION]: {location: LatLng};
};

const Stack = createStackNavigator<HomeStackParamList>();

const mapStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
  headerTintColor: colors.BLACK,
  cardStyle: {
    backgroundColor: colors.WHITE,
  },
};

function MapStackNavigator() {
  return (
    <Stack.Navigator screenOptions={mapStackOptions}>
      <Stack.Screen
        name={homeNavigations.MAP_HOME}
        component={MapHomeScreen}
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

export default MapStackNavigator;
