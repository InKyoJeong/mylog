import React, {useRef} from 'react';
import {View, TextInput, SafeAreaView, StyleSheet} from 'react-native';

import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import KeyboardPersistView from '@/components/keyboard/KeyboardPersistView';
import CustomKeyboardAvoidingView from '@/components/keyboard/CustomKeyboardAvoidingView';
import useForm from '@/hooks/common/useForm';
import useAuth from '@/hooks/queries/useAuth';
import {validateLogin} from '@/utils/validate';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {username: '', password: ''},
    validate: validateLogin,
  });
  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onSuccess: () => {
        console.log('로그인 완료');
      },
      onError: error =>
        console.log('error.response?.data', error.response?.data),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardPersistView>
        <CustomKeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <InputField
              autoFocus
              {...login.getTextInputProps('username')}
              error={login.errors.username}
              touched={login.touched.username}
              placeholder="아이디"
              maxLength={20}
              inputMode="email"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
            <InputField
              {...login.getTextInputProps('password')}
              error={login.errors.password}
              touched={login.touched.password}
              ref={passwordRef}
              placeholder="비밀번호"
              maxLength={20}
              returnKeyType="join"
              secureTextEntry
              onSubmitEditing={handleSubmit}
            />
          </View>
          <CustomButton
            label="로그인"
            variant="filled"
            size="large"
            isValid={!login.hasErrors}
            onPress={handleSubmit}
          />
        </CustomKeyboardAvoidingView>
      </KeyboardPersistView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 30,
    marginBottom: 40,
  },
});

export default LoginScreen;
