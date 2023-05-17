import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {settingNavigations} from '@/constants/navigations';

type SettingHomeScreenProps = CompositeScreenProps<
  StackScreenProps<
    SettingStackParamList,
    typeof settingNavigations.SETTING_HOME
  >,
  DrawerScreenProps<MainDrawerParamList>
>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable
          onPress={() => navigation.navigate(settingNavigations.EDIT_PROFILE)}>
          <Text style={{fontSize: 20}}>프로필 수정</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingHomeScreen;
