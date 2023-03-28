import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {colors} from '@/constants';

interface InputFieldProps extends TextInputProps {
  touched?: boolean;
  error?: string;
}

const deviceHeight = Dimensions.get('screen').height;

function InputField({touched, error, ...props}: InputFieldProps) {
  return (
    <View style={[styles.container, touched && !!error && styles.inputError]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.GRAY_500}
        {...props}
      />
      {touched && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: deviceHeight > 640 ? 15 : 10,
    paddingHorizontal: deviceHeight > 640 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.PINK_300,
  },
  error: {
    color: colors.ORANGE_500,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 0,
  },
});

export default InputField;
