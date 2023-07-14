import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FriendHomeScreen from '@/screens/friend/FriendHomeScreen';
import FriendAddScreen from '@/screens/friend/FriendAddScreen';
import FriendHomeHeaderLeft from '@/components/friend/FriendHomeHeaderLeft';
import FriendHomeHeaderRight from '@/components/friend/FriendHomeHeaderRight';
import useThemeStore from '@/store/useThemeStore';
import {colors, friendNavigations} from '@/constants';

export type FriendStackParamList = {
  [friendNavigations.FRIEND_HOME]: undefined;
  [friendNavigations.FRIEND_ADD]: undefined;
};

const Stack = createStackNavigator<FriendStackParamList>();

function FriendStackNavigator() {
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
        headerBackTitleVisible: false,
        headerTintColor: colors[theme].BLACK,
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name={friendNavigations.FRIEND_HOME}
        component={FriendHomeScreen}
        options={({navigation}) => ({
          headerTitle: '친구 목록',
          headerLeft: () => FriendHomeHeaderLeft(navigation),
          headerRight: () => FriendHomeHeaderRight(navigation),
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        })}
      />
      <Stack.Screen
        name={friendNavigations.FRIEND_ADD}
        component={FriendAddScreen}
        options={{
          headerTitle: '친구 추가',
        }}
      />
    </Stack.Navigator>
  );
}

export default FriendStackNavigator;
