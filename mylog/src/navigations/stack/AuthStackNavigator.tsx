import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignupScreen from '@/screens/auth/SignupScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import {authNavigations} from '@/constants';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigations.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
