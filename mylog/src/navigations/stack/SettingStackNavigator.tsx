import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import FeedbackScreen from '@/screens/setting/FeedbackScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import {settingNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
  [settingNavigations.FEED_BACK]: undefined;
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
};

function SettingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={settingStackOptions}>
      <Stack.Screen
        name={settingNavigations.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.FEED_BACK}
        component={FeedbackScreen}
        options={{
          headerTitle: '의견 보내기',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
