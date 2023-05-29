import React, {Suspense} from 'react';

import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import Indicator from '@/components/@common/Indicator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      <Suspense fallback={<Indicator />}>
        {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
