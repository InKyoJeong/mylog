import React, {Suspense} from 'react';

import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import Indicator from '@/components/@common/Indicator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <>
      <Suspense fallback={<Indicator />}>
        {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
      </Suspense>
    </>
  );
}

export default RootNavigator;
