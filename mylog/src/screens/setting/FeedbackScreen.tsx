import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import CustomKeyboardAvoidingView from '@/components/@keyboard/CustomKeyboardAvoidingView';
import useForm from '@/hooks/useForm';
import {useFeedback} from '@/hooks/queries/useFeedback';
import useSnackbarStore from '@/store/useSnackbarStore';
import {validateAddFeedback} from '@/utils/validate';

type FeedbackScreenProps = StackScreenProps<SettingStackParamList>;

function FeedbackScreen({navigation}: FeedbackScreenProps) {
  const snackbar = useSnackbarStore();
  const feedbackMutation = useFeedback();
  const titleRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const addFeedback = useForm({
    initialValue: {
      email: '',
      title: '',
      description: '',
    },
    validate: validateAddFeedback,
  });

  const handleSubmit = () => {
    if (addFeedback.hasErrors) {
      return;
    }

    feedbackMutation.mutate(addFeedback.values, {
      onSuccess: () => {
        navigation.goBack();
        snackbar.show('제출되었습니다.');
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
              maxLength={100}
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
              maxLength={100}
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
              maxLength={3000}
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
