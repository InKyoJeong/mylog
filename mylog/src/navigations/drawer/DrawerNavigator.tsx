import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../../screens/HomeScreen';
import FeedScreen from '../../screens/FeedScreen';

export type DrawerParamList = {
  Home: undefined;
  Feed: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Feed" component={FeedScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
