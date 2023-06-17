import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import type {StackScreenProps} from '@react-navigation/stack';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import MapLegendOption from '@/components/setting/MapLegendOption';
import SettingItem from '@/components/setting/SettingItem';
import DarkModeOption from '@/components/setting/DarkModeOption';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useVersionCheck from '@/hooks/useVersionCheck';
import useThemeStore from '@/store/useThemeStore';
import {colors, numbers, settingNavigations} from '@/constants';

type SettingHomeScreenProps = StackScreenProps<
  SettingStackParamList,
  typeof settingNavigations.SETTING_HOME
>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {theme} = useThemeStore();
  const {logoutMutation} = useAuth();
  const mapLegendOption = useModal();
  const darkModeOption = useModal();
  const {checkVersion} = useVersionCheck();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressFAQ = () => {
    navigation.navigate(settingNavigations.FAQ);
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
        <SettingItem title="FAQ" onPress={handlePressFAQ} />
        <SettingItem title="의견 보내기" onPress={handlePressFeedback} />
        <SettingItem
          title="버전정보"
          subTitle={Platform.select({
            ios: numbers.CURRENT_VERSION.IOS,
            android: numbers.CURRENT_VERSION.ANDROID,
          })}
          onPress={checkVersion}
        />
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

        <MapLegendOption
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        />
        <DarkModeOption
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
