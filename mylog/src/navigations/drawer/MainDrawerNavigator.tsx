import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStackNavigator from '../stack/HomeStackNavigator';
import FeedStackNavigator from '../stack/FeedStackNavigator';

export enum MainNavigations {
  Home = 'Home',
  Feed = 'Feed',
}

export type MainDrawerParamList = {
  [MainNavigations.Home]: undefined;
  [MainNavigations.Feed]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name={MainNavigations.Home}
        component={HomeStackNavigator}
      />
      <Drawer.Screen
        name={MainNavigations.Feed}
        component={FeedStackNavigator}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
