import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticatedStackNavigator from './stack/AuthenticatedStackNavigator';
import AuthStackNavigator from './stack/AuthStackNavigator';

function Navigation() {
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
