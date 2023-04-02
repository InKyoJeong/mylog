import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import KeyboardPersistView from '@/components/KeyboardPersistView';
import CustomKeyboardAvoidingView from '@/components/CustomKeyboardAvoidingView';
import useForm from '@/hooks/common/useForm';
import {validateSignup} from '@/utils/validate';

function SignupScreen() {
  const signup = useForm({
    initialValue: {username: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardPersistView>
        <CustomKeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <InputField
              {...signup.getTextInputProps('username')}
              error={signup.errors.username}
              touched={signup.touched.username}
              placeholder="아이디"
              maxLength={20}
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
              textContentType="newPassword"
              maxLength={20}
              secureTextEntry
              returnKeyType="next"
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
              maxLength={20}
              secureTextEntry
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
            />
          </View>
          <CustomButton
            label="회원가입"
            variant="filled"
            size="large"
            isValid={!signup.hasErrors}
          />
        </CustomKeyboardAvoidingView>
      </KeyboardPersistView>
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
