import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import Conditional from '@/components/@common/Conditional';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {
  colors,
  mainNavigations,
  settingNavigations,
  // statisticsNavigations,
} from '@/constants';
import type {ThemeMode} from '@/types';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

  // const handlePressStatistics = () => {
  //   props.navigation.navigate(mainNavigations.STATISTICS, {
  //     screen: statisticsNavigations.STATISTICS_HOME,
  //   });
  // };

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
            <Conditional
              condition={imageUri === null && kakaoImageUri === null}>
              <FastImage
                source={require('@/assets/user-default.png')}
                style={styles.userImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Conditional>

            <Conditional condition={imageUri === null && !!kakaoImageUri}>
              <FastImage
                source={{uri: `${kakaoImageUri}`}}
                style={styles.userImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Conditional>

            <Conditional condition={imageUri !== null}>
              <FastImage
                source={{uri: `${imageUri}`}}
                style={styles.userImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Conditional>
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        {/* <Pressable onPress={handlePressStatistics}>
          <View style={styles.bottomMenu}>
            <MaterialIcons
              name={'leaderboard'}
              color={
                theme === 'light'
                  ? colors[theme].GRAY_700
                  : colors[theme].GRAY_500
              }
              size={18}
            />
            <Text style={styles.bottomMenuText}>통계</Text>
          </View>
        </Pressable> */}
        <Pressable onPress={handlePressSetting}>
          <View style={styles.bottomMenu}>
            <MaterialIcons
              name={'settings'}
              color={
                theme === 'light'
                  ? colors[theme].GRAY_700
                  : colors[theme].GRAY_500
              }
              size={18}
            />
            <Text style={styles.bottomMenuText}>설정</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: colors[theme].WHITE,
    },
    nameText: {
      color: colors[theme].BLACK,
    },
    userInfoContainer: {
      alignItems: 'center',
      marginTop: 15,
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
      borderRadius: 35,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
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
      color:
        theme === 'light' ? colors[theme].GRAY_700 : colors[theme].GRAY_500,
    },
  });

export default CustomDrawerContent;
