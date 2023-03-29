import React from 'react';
import {Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import HomeStackNavigator from '@/navigations/stack/HomeStackNavigator';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator';
import {mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.FEED]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const mainDrawerOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerType: 'front',
  drawerStyle: {
    width: Dimensions.get('screen').width * 0.6,
  },
  drawerActiveTintColor: colors.BLACK,
  drawerInactiveTintColor: colors.BLACK,
  drawerActiveBackgroundColor: colors.PINK_200,
  drawerContentStyle: {
    backgroundColor: colors.WHITE,
  },
};

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={mainDrawerOptions}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={HomeStackNavigator}
        options={{title: '홈'}}
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
