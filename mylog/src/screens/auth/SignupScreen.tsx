import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

import CustomButton from '@/components/@common/CustomButton';
import InputField from '@/components/@common/InputField';
import CustomKeyboardAvoidingView from '@/components/@common/CustomKeyboardAvoidingView';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import {validateSignup} from '@/utils';
import {numbers} from '@/constants';

function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {username: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    if (signup.hasErrors) {
      return;
    }

    const {username, password} = signup.values;
    signupMutation.mutate(
      {username, password},
      {
        onSuccess: () => {
          loginMutation.mutate({username, password});
        },
        onError: error =>
          console.log('error.response?.data', error.response?.data),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        scrollIndicatorInsets={{right: 1}}>
        <CustomKeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <InputField
              {...signup.getTextInputProps('username')}
              error={signup.errors.username}
              touched={signup.touched.username}
              placeholder="아이디"
              maxLength={numbers.MAX_USERNAME_LENGTH}
              autoFocus
              inputMode="email"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
            <InputField
              {...signup.getTextInputProps('password')}
              error={signup.errors.password}
              touched={signup.touched.password}
              ref={passwordRef}
              placeholder="비밀번호"
              textContentType="oneTimeCode"
              maxLength={numbers.MAX_PASSWORD_LENGTH}
              secureTextEntry
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordConfirmRef.current?.focus();
              }}
            />
            <InputField
              {...signup.getTextInputProps('passwordConfirm')}
              error={signup.errors.passwordConfirm}
              touched={signup.touched.passwordConfirm}
              ref={passwordConfirmRef}
              placeholder="비밀번호 확인"
              maxLength={numbers.MAX_PASSWORD_LENGTH}
              secureTextEntry
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
            />
          </View>
          <CustomButton
            label="회원가입"
            variant="filled"
            size="large"
            hasError={signup.hasErrors}
            onPress={handleSubmit}
          />
        </CustomKeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  inputContainer: {
    gap: 30,
    marginBottom: 40,
  },
});

export default SignupScreen;
