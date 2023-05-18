import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import SettingItem from '@/components/setting/SettingItem';
import {settingNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';

type SettingHomeScreenProps = CompositeScreenProps<
  StackScreenProps<
    SettingStackParamList,
    typeof settingNavigations.SETTING_HOME
  >,
  DrawerScreenProps<MainDrawerParamList>
>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressFeedback = () => {
    navigation.navigate(settingNavigations.FEED_BACK);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem title="다크 모드" />
        <View style={styles.space} />
        <SettingItem title="의견 보내기" onPress={handlePressFeedback} />
        <SettingItem title="버전정보" subTitle="0.1.0" />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          icon={<Octicons name={'sign-out'} color={colors.RED_500} size={16} />}
          color={colors.RED_500}
          onPress={handlePressLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
