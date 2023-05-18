import React, {useCallback, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {StackScreenProps} from '@react-navigation/stack';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import InputField from '@/components/@common/InputField';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import {validateEditProfile} from '@/utils/validate';
import {colors} from '@/constants/colors';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {getProfileQuery, profileMutation} = useAuth();
  const {nickname, imageUri} = getProfileQuery.data || {};
  const editProfile = useForm({
    initialValue: {
      nickname: nickname ?? '',
      imageUri: '',
    },
    validate: validateEditProfile,
  });

  const handleSubmit = useCallback(() => {
    if (editProfile.hasErrors) {
      return;
    }

    profileMutation.mutate(editProfile.values, {
      onSuccess: () => navigation.goBack(),
    });
  }, [editProfile.hasErrors, editProfile.values, navigation, profileMutation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        EditProfileHeaderRight(handleSubmit, editProfile.hasErrors),
    });
  }, [editProfile.hasErrors, handleSubmit, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
          <Ionicons name="camera-outline" size={30} color={colors.GRAY_500} />
        </View>
      </View>
      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
        maxLength={20}
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
});

export default EditProfileScreen;
