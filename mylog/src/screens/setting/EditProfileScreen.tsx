import React, {useCallback, useLayoutEffect} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import InputField from '@/components/@common/InputField';
import Conditional from '@/components/@common/Conditional';
import EditProfileImageModal from '@/components/setting/EditProfileImageModal';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useImagePicker from '@/hooks/useImagePicker';
import useSnackbarStore from '@/store/useSnackbarStore';
import {validateEditProfile} from '@/utils/validate';
import {colors} from '@/constants/colors';
import {successMessages} from '@/constants/messages';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const snackbar = useSnackbarStore();
  const imageOption = useModal();
  const {getProfileQuery, profileMutation} = useAuth();
  const {username, nickname, imageUri} = getProfileQuery.data || {};
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
        onSuccess: () => {
          navigation.goBack();
          snackbar.show(successMessages.SUCCESS_EDIT_PROFILE);
        },
      },
    );
  }, [
    editProfile.hasErrors,
    editProfile.values,
    imagePicker.imageUris,
    navigation,
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
          <Conditional condition={imagePicker.imageUris.length === 0}>
            <Ionicons name="camera-outline" size={30} color={colors.GRAY_500} />
          </Conditional>

          <Conditional condition={imagePicker.imageUris.length > 0}>
            <Image
              source={{
                uri: `${Config.BASE_URL}/${imagePicker.imageUris[0]?.uri}`,
              }}
              style={styles.image}
            />
            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={18} color={colors.WHITE} />
            </View>
          </Conditional>
        </Pressable>

        <View style={styles.idContainer}>
          <View style={styles.idTextContainer}>
            <Text style={styles.nameText}>ID</Text>
          </View>
          <Text style={styles.nameText}>{username}</Text>
        </View>
      </View>

      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
        maxLength={8}
      />

      <EditProfileImageModal
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    borderWidth: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    backgroundColor: colors.PINK_700,
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
    backgroundColor: colors.GRAY_200,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  nameText: {
    color: colors.BLACK,
  },
});

export default EditProfileScreen;
