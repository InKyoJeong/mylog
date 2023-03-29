import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/common/useForm';

const validateLogin = () => ({
  id: '',
  password: '',
});

function LoginScreen() {
  const login = useForm({
    initialValue: {
      id: '',
      password: '',
    },
    validate: validateLogin,
  });

  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <InputField
            {...login.getTextInputProps('id')}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            placeholder="아이디"
            importantForAutofill="yes"
            returnKeyType="next"
            clearButtonMode="always"
            autoCapitalize="none"
            inputMode="email"
            maxLength={20}
            blurOnSubmit={false}
          />
          <InputField
            {...login.getTextInputProps('password')}
            ref={passwordRef}
            placeholder="비밀번호"
            maxLength={20}
            secureTextEntry
            onSubmitEditing={handleSubmit}
          />
        </View>
        <CustomButton label="로그인" variant="filled" />
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
