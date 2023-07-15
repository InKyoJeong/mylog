import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {FriendStackParamList} from '@/navigations/stack/FriendStackNavigator';
import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import {colors, numbers} from '@/constants';

type FriendHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FriendStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FriendHomeHeaderLeft(navigation: FriendHomeHeaderLeftProps) {
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

export default FriendHomeHeaderLeft;
