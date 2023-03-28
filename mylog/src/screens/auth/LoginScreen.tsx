import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';

function LoginScreen() {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeId = (text: string) => {
    setValue(text);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <InputField
            value={value}
            onChangeText={handleChangeId}
            placeholder="아이디"
            importantForAutofill="yes"
            returnKeyType="next"
            clearButtonMode="always"
            autoCapitalize="none"
            inputMode="email"
            blurOnSubmit={false}
            maxLength={20}
          />
          <InputField
            value={password}
            onChangeText={handleChangePassword}
            placeholder="비밀번호"
            maxLength={20}
            secureTextEntry
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
