import React from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';

import RootNavigator from '@/navigations/root/RootNavigator';
import queryClient from '@/api/queryClient';
import Snackbar from '@/components/@common/Snackbar';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          <RootNavigator />
          <Snackbar />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
