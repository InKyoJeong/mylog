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
import {validateLogin} from '@/utils/validate';
import {numbers} from '@/constants/numbers';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {username: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    if (login.hasErrors) {
      return;
    }

    loginMutation.mutate(login.values, {
      onError: error =>
        console.log('error.response?.data', error.response?.data.message),
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
              {...login.getTextInputProps('username')}
              error={login.errors.username}
              touched={login.touched.username}
              placeholder="아이디"
              maxLength={numbers.MAX_USERNAME_LENGTH}
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
