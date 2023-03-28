import React from 'react';
import {Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import HomeStackNavigator from '@/navigations/stack/HomeStackNavigator';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator';
import {color} from '@/constants';

export enum MainNavigations {
  Home = 'Home',
  Feed = 'Feed',
}

export type MainDrawerParamList = {
  [MainNavigations.Home]: undefined;
  [MainNavigations.Feed]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const mainDrawerOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerType: 'front',
  drawerStyle: {
    width: Dimensions.get('screen').width * 0.6,
  },
  drawerActiveTintColor: color.BLACK,
  drawerInactiveTintColor: color.BLACK,
  drawerActiveBackgroundColor: color.PINK_200,
  drawerContentStyle: {
    backgroundColor: color.WIHTE,
  },
};

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={mainDrawerOptions}>
      <Drawer.Screen
        name={MainNavigations.Home}
        component={HomeStackNavigator}
        options={{title: '홈'}}
      />
      <Drawer.Screen
        name={MainNavigations.Feed}
        component={FeedStackNavigator}
        options={{title: '피드'}}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
