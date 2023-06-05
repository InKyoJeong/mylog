import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Animated, {StretchInY} from 'react-native-reanimated';

import CustomButton from '@/components/@common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import useSnackbarStore from '@/store/useSnackbarStore';
import {alerts, colors, errorMessages, successMessages} from '@/constants';
import type {ThemeMode} from '@/types';

function DeleteAccountScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const snackbar = useSnackbarStore();
  const {deleteAccountMutation, logoutMutation} = useAuth();

  const handlePressDeleteAccount = () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteAccountMutation.mutate(null, {
              onSuccess: () => {
                logoutMutation.mutate(null);
                snackbar.show(successMessages.SUCCESS_DELETE_ACCOUNT);
              },
              onError: error =>
                snackbar.show(
                  error.response?.data.message || errorMessages.UNEXPECT_ERROR,
                ),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={StretchInY} style={styles.infoContainer}>
        <Text style={styles.infoText}>
          저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.
        </Text>
        <Text style={styles.infoText}>
          피드에 저장된 장소가 남아있다면 삭제해주세요.
        </Text>
      </Animated.View>

      <CustomButton
        label="회원탈퇴"
        variant="filled"
        size="large"
        onPress={handlePressDeleteAccount}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginBottom: 10,
    },
    infoContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors[theme].PINK_700,
      borderRadius: 3,
      padding: 10,
      gap: 10,
    },
    infoText: {
      color: colors[theme].PINK_700,
      fontSize: 15,
      fontWeight: '600',
    },
  });

export default DeleteAccountScreen;
