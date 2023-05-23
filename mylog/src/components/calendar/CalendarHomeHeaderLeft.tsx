import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {CalendarStackParamList} from '@/navigations/stack/CalendarStackNavigator';
import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';

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
          size={25}
        />
      }
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default CalendarHomeHeaderLeft;
