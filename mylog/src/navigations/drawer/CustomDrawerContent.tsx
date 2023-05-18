import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants/colors';
import {
  mainNavigations,
  settingNavigations,
  statisticsNavigations,
} from '@/constants/navigations';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {username} = getProfileQuery.data || {};

  const handlePressStatistics = () => {
    props.navigation.navigate(mainNavigations.STATISTICS, {
      screen: statisticsNavigations.STATISTICS_HOME,
    });
  };

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={require('@/assets/user-default.png')}
              style={styles.userImage}
            />
          </View>
          <Text>{username}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable onPress={handlePressStatistics}>
          <View style={styles.bottomMenu}>
            <Ionicons
              name={'pie-chart-outline'}
              color={colors.BLACK}
              size={20}
            />
            <Text style={styles.bottomMenuText}>통계</Text>
          </View>
        </Pressable>
        <Pressable onPress={handlePressSetting}>
          <View style={styles.bottomMenu}>
            <Ionicons
              name={'settings-outline'}
              color={colors.BLACK}
              size={20}
            />
            <Text style={styles.bottomMenuText}>설정</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 15,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomMenuText: {
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 15,
  },
});

export default CustomDrawerContent;
