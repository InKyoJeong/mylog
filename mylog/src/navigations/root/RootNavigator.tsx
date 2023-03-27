import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

function RootNavigator() {
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigator;
