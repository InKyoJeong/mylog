import React, {Suspense} from 'react';

import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import ErrorBoundary from '@/components/@common/ErrorBoundary';
import ErrorFallback from '@/components/@common/ErrorFallback';
import Indicator from '@/components/@common/Indicator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <Suspense fallback={<Indicator />}>
      <ErrorBoundary fallback={ErrorFallback}>
        {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
      </ErrorBoundary>
    </Suspense>
  );
}

export default RootNavigator;
