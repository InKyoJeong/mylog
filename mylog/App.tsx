import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';

import RootNavigator from '@/navigations/root/RootNavigator';
import queryClient from '@/api/queryClient';
import MarkerModal from '@/components/modal/MarkerModal';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
        <MarkerModal />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
