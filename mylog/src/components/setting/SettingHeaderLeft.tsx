import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft(navigation: SettingHeaderLeftProps) {
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

export default SettingHeaderLeft;
