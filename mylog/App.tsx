import React, {useEffect} from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';

import RootNavigator from '@/navigations/root/RootNavigator';
import Snackbar from '@/components/@common/Snackbar';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from '@/api/queryClient';

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
  const {theme} = useThemeStorage();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <NavigationContainer>
          <RootNavigator />
          <Snackbar />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
