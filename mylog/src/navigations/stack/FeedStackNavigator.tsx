import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import type {LatLng} from 'react-native-maps';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedHomeHeaderRight from '@/components/feed/FeedHomeHeaderRight';
import useThemeStore from '@/store/useThemeStore';
import {colors, feedNavigations} from '@/constants';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerRight: FeedHomeHeaderRight,
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
