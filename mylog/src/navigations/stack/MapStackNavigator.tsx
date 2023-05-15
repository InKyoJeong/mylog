import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import type {LatLng} from 'react-native-maps';

import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import {mapNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
  [mapNavigations.SEARCH_LOCATION]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const mapStackOptions: StackNavigationOptions = {
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

function MapStackNavigator() {
  return (
    <Stack.Navigator screenOptions={mapStackOptions}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
