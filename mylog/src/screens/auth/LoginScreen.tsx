import React, {useRef} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';

import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import CustomKeyboardAvoidingView from '@/components/@common/CustomKeyboardAvoidingView';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import useSnackbarStore from '@/store/useSnackbarStore';
import {validateLogin} from '@/utils';
import {errorMessages, numbers} from '@/constants';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const snackbar = useSnackbarStore();
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    if (login.hasErrors) {
      return;
    }

    loginMutation.mutate(login.values, {
      onError: error =>
        snackbar.show(
          error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        ),
    });
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
              autoFocus
              {...login.getTextInputProps('email')}
              error={login.errors.email}
              touched={login.touched.email}
              placeholder="이메일"
              maxLength={numbers.MAX_EMAIL_LENGTH}
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
              maxLength={numbers.MAX_PASSWORD_LENGTH}
              returnKeyType="join"
              secureTextEntry
              onSubmitEditing={handleSubmit}
            />
          </View>
          <CustomButton
            label="로그인"
            variant="filled"
            size="large"
            hasError={login.hasErrors}
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
    margin: 30,
  },
  inputContainer: {
    gap: 30,
    marginBottom: 40,
  },
});

export default LoginScreen;
