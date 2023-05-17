import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {feedNavigations, feedTabNavigations} from '@/constants/navigations';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: undefined;
  [feedTabNavigations.FEED_SEARCH]: undefined;
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator();

function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName =
              getFocusedRouteNameFromRoute(tabRoute) ??
              feedNavigations.FEED_HOME;

            if (routeName === feedNavigations.FEED_DETAIL) {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_SEARCH}
        component={FeedSearchScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={{
          headerTitle: '북마크',
        }}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigator;
