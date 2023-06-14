import React, {Suspense, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import Indicator from '@/components/@common/Indicator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin, isLoadingLogin} = useAuth();

  useEffect(() => {
    if (!isLoadingLogin) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoadingLogin]);

  return (
    <RetryErrorBoundary>
      <Suspense fallback={<Indicator />}>
        {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
