import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/common/useForm';
import InputField from '@/components/InputField';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <InputField
            {...signup.getTextInputProps('username')}
            error={signup.errors.username}
            touched={signup.touched.username}
            placeholder="아이디"
            maxLength={20}
            inputMode="email"
            clearButtonMode="always"
            autoCapitalize="none"
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
            maxLength={20}
            clearButtonMode="always"
            secureTextEntry
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
            clearButtonMode="always"
            secureTextEntry
            onSubmitEditing={handleSubmit}
          />
        </View>
        <CustomButton
          label="회원가입"
          variant="filled"
          size="large"
          isValid={!signup.hasErrors}
        />
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
