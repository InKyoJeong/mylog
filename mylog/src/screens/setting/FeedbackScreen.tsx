import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import CustomKeyboardAvoidingView from '@/components/@common/CustomKeyboardAvoidingView';
import useForm from '@/hooks/useForm';
import useMutateFeedback from '@/hooks/queries/useMutateFeedback';
import useAuth from '@/hooks/queries/useAuth';
import useSnackbarStore from '@/store/useSnackbarStore';
import {isValidEmailFormat, validateAddFeedback} from '@/utils';
import {numbers, successMessages} from '@/constants';

type FeedbackScreenProps = StackScreenProps<SettingStackParamList>;

function FeedbackScreen({navigation}: FeedbackScreenProps) {
  const titleRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const snackbar = useSnackbarStore();
  const feedback = useMutateFeedback();
  const {getProfileQuery} = useAuth();
  const {email} = getProfileQuery.data || {};
  const addFeedback = useForm({
    initialValue: {
      email: email && isValidEmailFormat(email) ? email : '',
      title: '',
      description: '',
    },
    validate: validateAddFeedback,
  });

  const handleSubmit = () => {
    if (addFeedback.hasErrors) {
      return;
    }

    feedback.mutate(addFeedback.values, {
      onSuccess: () => {
        navigation.goBack();
        snackbar.show(successMessages.SUCCESS_SUBMIT_FEEDBACK);
      },
      onError: error =>
        console.log('error.response?.data', error.response?.data.message),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <View style={styles.inputContainer}>
            <InputField
              {...addFeedback.getTextInputProps('email')}
              error={addFeedback.errors.email}
              touched={addFeedback.touched.email}
              placeholder="이메일을 입력해주세요."
              maxLength={numbers.MAX_EMAIL_LENGTH}
              inputMode="email"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                titleRef.current?.focus();
              }}
            />
            <InputField
              {...addFeedback.getTextInputProps('title')}
              error={addFeedback.errors.title}
              touched={addFeedback.touched.title}
              ref={titleRef}
              placeholder="제목을 입력해주세요."
              maxLength={numbers.MAX_FEEDBACK_TITLE_LENGTH}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
            />
            <InputField
              {...addFeedback.getTextInputProps('description')}
              error={addFeedback.errors.description}
              touched={addFeedback.touched.description}
              ref={descriptionRef}
              placeholder="자유롭게 의견을 입력해주세요."
              multiline
              maxLength={numbers.MAX_FEEDBACK_DESCRIPTION_LENGTH}
            />
            <CustomButton
              label="제출"
              variant="filled"
              size="large"
              hasError={addFeedback.hasErrors}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default FeedbackScreen;
