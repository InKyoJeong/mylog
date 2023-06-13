import React from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import CodePush from 'react-native-code-push';

import RootNavigator from '@/navigations/root/RootNavigator';
import Snackbar from '@/components/@common/Snackbar';
import SyncProgressView from '@/components/@common/SyncProgressView';
import useCodePush from '@/hooks/useCodePush';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from '@/api/queryClient';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  const {theme} = useThemeStorage();
  const {hasUpdate, syncProgress} = useCodePush();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />
        <NavigationContainer>
          {hasUpdate && syncProgress ? (
            <SyncProgressView syncProgress={syncProgress} />
          ) : (
            <RootNavigator />
          )}
          <Snackbar />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default CodePush(App);
