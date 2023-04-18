import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants/colors';

type FeedLeftHeaderProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedLeftHeader(navigation: FeedLeftHeaderProps) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.openDrawer()}>
      <Ionicons name={'md-menu-sharp'} color={colors.BLACK} size={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default FeedLeftHeader;
