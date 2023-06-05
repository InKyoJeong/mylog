import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import FeedbackScreen from '@/screens/setting/FeedbackScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import useThemeStore from '@/store/useThemeStore';
import {colors, settingNavigations} from '@/constants';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
  [settingNavigations.FEED_BACK]: undefined;
  [settingNavigations.DELETE_ACCOUNT]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor:
            theme === 'light' ? colors[theme].GRAY_100 : colors[theme].WHITE,
        },
      }}>
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
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.FEED_BACK}
        component={FeedbackScreen}
        options={{
          headerTitle: '의견 보내기',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={{
          headerTitle: '회원탈퇴',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
