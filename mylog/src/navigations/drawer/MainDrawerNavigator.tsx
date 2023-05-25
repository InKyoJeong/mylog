import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import type {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MapStackNavigator, {
  MapStackParamList,
} from '@/navigations/stack/MapStackNavigator';
import StatisticsStackNavigator from '../stack/StatisticsStackNavigator';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import CalendarStackNavigator from '../stack/CalendarStackNavigator';
import FeedTabNavigator, {FeedTabParamList} from '../tab/FeedTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import useThemeStore from '@/store/useThemeStore';
import {colors, mainNavigations} from '@/constants';
import {ThemeMode} from '@/types';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
  [mainNavigations.STATISTICS]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
  theme: ThemeMode,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
    case mainNavigations.STATISTICS: {
      iconName = 'leaderboard';
      break;
    }
    case mainNavigations.SETTING: {
      iconName = 'settings';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      color={focused ? colors[theme].UNCHANGE_BLACK : colors[theme].GRAY_500}
      size={18}
    />
  );
}

function MainDrawerNavigator() {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors[theme].WHITE,
        },
        drawerActiveTintColor: colors[theme].UNCHANGE_BLACK,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerActiveBackgroundColor:
          theme === 'light' ? colors[theme].PINK_200 : colors[theme].PINK_500,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 3,
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused, theme),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarStackNavigator}
        options={{title: '캘린더'}}
      />
      <Drawer.Screen
        name={mainNavigations.STATISTICS}
        component={StatisticsStackNavigator}
        options={{
          title: '통계',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
