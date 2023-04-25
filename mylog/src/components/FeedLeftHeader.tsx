import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants/colors';
import HeaderButton from './common/HeaderButton';

type FeedLeftHeaderProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedLeftHeader(navigation: FeedLeftHeaderProps) {
  return (
    <HeaderButton
      icon={<Ionicons name={'md-menu-sharp'} color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default FeedLeftHeader;
