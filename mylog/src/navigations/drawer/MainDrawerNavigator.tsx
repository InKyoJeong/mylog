import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import type {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from '@/navigations/stack/HomeStackNavigator';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator';
import {mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.FEED]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(
  route: RouteProp<MainDrawerParamList, keyof MainDrawerParamList>,
) {
  let iconName = '';
  if (route.name === mainNavigations.HOME) {
    iconName = 'map';
  } else if (route.name === mainNavigations.FEED) {
    iconName = 'ios-reader';
  }

  return <Ionicons name={iconName} color={colors.BLACK} size={18} />;
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.BLACK,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerContentStyle: {
          backgroundColor: colors.WHITE,
        },
        drawerIcon: () => DrawerIcons(route),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={HomeStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedStackNavigator}
        options={{title: '피드'}}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
