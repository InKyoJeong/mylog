import React, {useCallback, useLayoutEffect} from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import InputField from '@/components/@common/InputField';
import Conditional from '@/components/@common/Conditional';
import EditProfileImageOption from '@/components/setting/EditProfileImageOption';
import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';
import useAuth from '@/hooks/queries/useAuth';
import useImagePicker from '@/hooks/useImagePicker';
import useSnackbarStore from '@/store/useSnackbarStore';
import useThemeStore from '@/store/useThemeStore';
import {validateEditProfile} from '@/utils';
import {colors, errorMessages, numbers, successMessages} from '@/constants';
import type {ThemeMode} from '@/types';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const snackbar = useSnackbarStore();
  const imageOption = useModal();
  const {getProfileQuery, profileMutation} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri, loginType} =
    getProfileQuery.data || {};
  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: imageOption.hide,
  });
  const editProfile = useForm({
    initialValue: {
      nickname: nickname ?? '',
    },
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleSubmit = useCallback(() => {
    if (editProfile.hasErrors) {
      return;
    }

    profileMutation.mutate(
      {...editProfile.values, imageUri: imagePicker.imageUris[0]?.uri},
      {
        onSuccess: () => snackbar.show(successMessages.SUCCESS_EDIT_PROFILE),
        onError: error =>
          snackbar.show(
            error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          ),
      },
    );
  }, [
    editProfile.hasErrors,
    editProfile.values,
    imagePicker.imageUris,
    profileMutation,
    snackbar,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        EditProfileHeaderRight(handleSubmit, editProfile.hasErrors),
    });
  }, [editProfile.hasErrors, handleSubmit, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          style={[styles.imageContainer, styles.emptyImageContainer]}
          onPress={handlePressImage}>
          <Conditional
            condition={imagePicker.imageUris.length === 0 && !kakaoImageUri}>
            <Ionicons
              name="camera-outline"
              size={30}
              color={colors[theme].GRAY_500}
            />
          </Conditional>

          <Conditional
            condition={imagePicker.imageUris.length === 0 && !!kakaoImageUri}>
            <FastImage
              source={{uri: `${kakaoImageUri}`}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={18} color={colors[theme].WHITE} />
            </View>
          </Conditional>

          <Conditional condition={imagePicker.imageUris.length > 0}>
            <FastImage
              source={{uri: imagePicker.imageUris[0]?.uri}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={18} color={colors[theme].WHITE} />
            </View>
          </Conditional>
        </Pressable>

        <Conditional condition={loginType === 'email'}>
          <View style={styles.idContainer}>
            <View style={styles.idTextContainer}>
              <Text style={styles.nameText}>Email</Text>
            </View>
            <Text style={styles.nameText}>{email}</Text>
          </View>
        </Conditional>
      </View>

      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
        maxLength={numbers.MAX_NICKNAME_LENGTH}
      />

      <Pressable
        onPress={() => navigation.navigate('DeleteAccount')}
        style={styles.deleteAccountContainer}>
        <Ionicons
          name="ios-remove-circle-sharp"
          size={18}
          color={colors[theme].RED_500}
        />
        <Text style={styles.deleteAccountText}>회원탈퇴</Text>
      </Pressable>

      <EditProfileImageOption
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 50,
      borderWidth: 1,
    },
    cameraButton: {
      position: 'absolute',
      bottom: 1,
      right: 1,
      backgroundColor: colors[theme].PINK_700,
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 30,
    },
    idContainer: {
      flexDirection: 'row',
      gap: 7,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    idTextContainer: {
      backgroundColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5,
    },
    nameText: {
      color: colors[theme].BLACK,
      fontWeight: '500',
    },
    deleteAccountContainer: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      right: 20,
      bottom: 70,
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 10,
      padding: 10,
    },
    deleteAccountText: {
      color: colors[theme].RED_500,
      fontSize: 15,
    },
  });

export default EditProfileScreen;
