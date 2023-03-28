import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignupScreen from '@/screens/auth/SignupScreen';
import LoginScreen from '@/screens/auth/LoginScreen';

export enum AuthNavigations {
  Login = 'Login',
  Signup = 'Signup',
}

export type AuthStackParamList = {
  [AuthNavigations.Login]: undefined;
  [AuthNavigations.Signup]: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthNavigations.Login} component={LoginScreen} />
      <Stack.Screen name={AuthNavigations.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
