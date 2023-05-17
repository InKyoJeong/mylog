import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeHeaderLeft from '@/components/setting/SettingHomeHeaderLeft';
import {settingNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

const settingStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.WHITE,
  },
  headerTitleStyle: {
    fontSize: 15,
  },
  headerTintColor: colors.BLACK,
  cardStyle: {
    backgroundColor: colors.WHITE,
  },
};

function SettingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={settingStackOptions}>
      <Stack.Screen
        name={settingNavigations.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
