import React from 'react';

import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';

function RootNavigator() {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
