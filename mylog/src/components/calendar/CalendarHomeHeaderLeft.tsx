import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {CalendarStackParamList} from '@/navigations/stack/CalendarStackNavigator';
import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import {colors, numbers} from '@/constants';

type CalendarHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<CalendarStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function CalendarHomeHeaderLeft(navigation: CalendarHomeHeaderLeftProps) {
  const {theme} = useThemeStore();

  return (
    <HeaderButton
      icon={
        <Ionicons
          name={'md-menu-sharp'}
          color={colors[theme].BLACK}
          size={numbers.HEADER_DRAWER_ICON}
        />
      }
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default CalendarHomeHeaderLeft;
