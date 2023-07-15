import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Conditional from '@/components/@common/Conditional';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {Friend, ThemeMode} from '@/types';

interface FriendCardProps {
  friend: Friend;
  onPress?: () => void;
  children: ReactNode;
}

function FriendCard({friend, onPress, children}: FriendCardProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={styles.userContainer}>
        <View style={styles.userImageContainer}>
          <Conditional
            condition={
              friend.imageUri === null && friend.kakaoImageUri === null
            }>
            <FastImage
              source={require('@/assets/user-default.png')}
              style={styles.userImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Conditional>

          <Conditional
            condition={friend.imageUri === null && !!friend.kakaoImageUri}>
            <FastImage
              source={{uri: `${friend.kakaoImageUri}`}}
              style={styles.userImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Conditional>

          <Conditional condition={friend.imageUri !== null}>
            <FastImage
              source={{uri: `${friend.imageUri}`}}
              style={styles.userImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Conditional>
        </View>
        <View style={styles.nicknameContainer}>
          <Text style={styles.nicknameText}>{friend.nickname}</Text>
          <Text style={styles.idText}>#{friend.id}</Text>
        </View>
      </View>
      {children}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    userImageContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 10,
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 25,
    },
    nicknameContainer: {
      gap: 3,
    },
    nicknameText: {
      color: colors[theme].BLACK,
    },
    idText: {
      color: colors[theme].GRAY_500,
    },
  });

export default FriendCard;
