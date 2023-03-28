import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignupScreen from '@/screens/auth/SignupScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import {authNavigations} from '@/constants';

export type AuthStackParamList = {
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigations.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
