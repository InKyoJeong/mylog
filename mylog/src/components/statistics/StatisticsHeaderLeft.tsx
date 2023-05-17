import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {StatisticsStackParamList} from '@/navigations/stack/StatisticsStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderButton from '../@common/HeaderButton';
import {colors} from '@/constants/colors';

type StatisticsHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<StatisticsStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function StatisticsHeaderLeft(navigation: StatisticsHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name={'md-menu-sharp'} color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default StatisticsHeaderLeft;
