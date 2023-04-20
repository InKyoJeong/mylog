import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Octicons from 'react-native-vector-icons/Octicons';

import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants/colors';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation, getProfileQuery} = useAuth();
  const {username} = getProfileQuery.data || {};

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={require('@/assets/user.png')}
              style={styles.userImage}
            />
          </View>
          <Text>{username}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable onPress={handleLogout}>
          <View style={styles.bottomMenu}>
            <Octicons name={'sign-out'} color={colors.BLACK} size={18} />
            <Text style={styles.bottomMenuText}>로그아웃</Text>
          </View>
        </Pressable>
      </View>
    </View>
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
    marginVertical: 30,
    marginHorizontal: 15,
  },
  userImageContainer: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 25,
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
  },
});

export default CustomDrawerContent;
