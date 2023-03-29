import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import CustomButton from '@/components/CustomButton';

function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomButton label="회원가입" variant="filled" size="large" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
  },
});

export default SignupScreen;
