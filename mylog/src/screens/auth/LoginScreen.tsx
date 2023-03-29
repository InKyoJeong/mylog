import React, {useRef} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/common/useForm';
import {validateLogin} from '@/utils/validate';

function LoginScreen() {
  const login = useForm({
    initialValue: {username: '', password: ''},
    validate: validateLogin,
  });

  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <InputField
            {...login.getTextInputProps('username')}
            error={login.errors.username}
            touched={login.touched.username}
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
            {...login.getTextInputProps('password')}
            error={login.errors.password}
            touched={login.touched.password}
            ref={passwordRef}
            placeholder="비밀번호"
            maxLength={20}
            clearButtonMode="always"
            secureTextEntry
            onSubmitEditing={handleSubmit}
          />
        </View>
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          isValid={!login.hasErrors}
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

export default LoginScreen;
