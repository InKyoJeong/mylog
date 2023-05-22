import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import MapLegendModal from '@/components/setting/MapLegendModal';
import SettingItem from '@/components/setting/SettingItem';
import DarkModeModal from '@/components/setting/DarkModeModal';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';
import {colors, settingNavigations} from '@/constants';

type SettingHomeScreenProps = CompositeScreenProps<
  StackScreenProps<
    SettingStackParamList,
    typeof settingNavigations.SETTING_HOME
  >,
  DrawerScreenProps<MainDrawerParamList>
>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {theme} = useThemeStore();
  const {logoutMutation} = useAuth();
  const mapLegendOption = useModal();
  const darkModeOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
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
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="범례 표시" onPress={mapLegendOption.show} />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />
        <View style={styles.space} />
        <SettingItem title="의견 보내기" onPress={handlePressFeedback} />
        <SettingItem title="버전정보" subTitle="0.1.0" />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          icon={
            <Octicons
              name={'sign-out'}
              color={colors[theme].RED_500}
              size={16}
            />
          }
          color={colors[theme].RED_500}
          onPress={handlePressLogout}
        />

        <MapLegendModal
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        />
        <DarkModeModal
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
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
