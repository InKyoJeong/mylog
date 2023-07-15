import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {DrawerNavigationProp} from '@react-navigation/drawer';

import type {FriendStackParamList} from '@/navigations/stack/FriendStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import {colors, friendNavigations} from '@/constants';

type FriendHomeHeaderRightProps = CompositeNavigationProp<
  StackNavigationProp<FriendStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FriendHomeHeaderRight(navigation: FriendHomeHeaderRightProps) {
  const {theme} = useThemeStore();

  return (
    <HeaderButton
      icon={<Ionicons name="add" size={25} color={colors[theme].BLACK} />}
      onPress={() => navigation.navigate(friendNavigations.FRIEND_ADD)}
    />
  );
}

export default FriendHomeHeaderRight;
