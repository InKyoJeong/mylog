import React from 'react';
import {StyleSheet, View} from 'react-native';

function SignupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.view}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
  },
});

export default SignupScreen;
