import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderButton from '../@common/HeaderButton';
import {colors} from '@/constants/colors';

type SettingHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHomeHeaderLeft(navigation: SettingHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name={'md-menu-sharp'} color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default SettingHomeHeaderLeft;
