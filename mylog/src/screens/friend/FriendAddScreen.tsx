import React from 'react';
import {StyleSheet, View} from 'react-native';

import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import {useSendFriendRequest} from '@/hooks/queries/useMutateFriendRequest';
import useForm from '@/hooks/useForm';
import useSnackbarStore from '@/store/useSnackbarStore';
import {validateFriendId} from '@/utils';
import {errorMessages, numbers, successMessages} from '@/constants';

function FriendAddScreen() {
  const snackbar = useSnackbarStore();
  const sendFriendMutation = useSendFriendRequest();
  const addFriend = useForm({
    initialValue: {friendId: ''},
    validate: validateFriendId,
  });

  const handleSubmit = () => {
    if (addFriend.hasErrors) {
      return;
    }

    sendFriendMutation.mutate(addFriend.values.friendId, {
      onSuccess: () => snackbar.show(successMessages.SUCCESS_REQUEST_FRIEND),
      onError: error =>
        snackbar.show(
          error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        ),
    });
  };

  return (
    <View style={styles.container}>
      <InputField
        {...addFriend.getTextInputProps('friendId')}
        placeholder="친구의 ID 번호를 입력해주세요."
        keyboardType="number-pad"
        maxLength={numbers.MAX_FRIEND_ID_LENGTH}
      />
      <CustomButton
        label="친구 요청하기"
        variant="filled"
        size="large"
        onPress={handleSubmit}
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
