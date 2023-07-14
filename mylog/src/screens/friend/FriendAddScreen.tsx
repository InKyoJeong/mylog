import React from 'react';
import {StyleSheet, View} from 'react-native';

import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import useForm from '@/hooks/useForm';
import {validateFriendId} from '@/utils';

function FriendAddScreen() {
  const addFriend = useForm({
    initialValue: {friendId: ''},
    validate: validateFriendId,
  });

  console.log('friendId', addFriend.values.friendId);

  return (
    <View style={styles.container}>
      <InputField
        {...addFriend.getTextInputProps('friendId')}
        placeholder="친구의 ID번호를 입력해주세요."
        keyboardType="number-pad"
        maxLength={10}
      />
      <CustomButton
        label="친구 요청하기"
        variant="filled"
        size="large"
        hasError={addFriend.hasErrors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default FriendAddScreen;
