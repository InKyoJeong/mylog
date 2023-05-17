import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import type {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapStackNavigator from '@/navigations/stack/MapStackNavigator';
import FeedTabNavigator, {FeedTabParamList} from '../tab/FeedTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import {mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'map';
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'ios-reader';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.BLACK : colors.GRAY_700}
      size={18}
    />
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_700,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerContentStyle: {
          backgroundColor: colors.WHITE,
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{title: '피드'}}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
