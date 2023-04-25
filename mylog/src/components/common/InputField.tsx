import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {colors} from '@/constants/colors';
import {mergeRefs} from '@/utils';

interface InputFieldProps extends TextInputProps {
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {touched, error, disabled = false, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && !!error && styles.inputError,
          ]}>
          <View style={!!icon && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              style={[styles.input, disabled && styles.disabled]}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholderTextColor={colors.GRAY_500}
              editable={!disabled}
              autoCorrect={false}
              spellCheck={false}
              {...props}
            />
          </View>
          {touched && error && <Text style={styles.error}>{error}</Text>}
        </View>
      </Pressable>
    );
  },
);

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
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 0,
  },
});

export default InputField;
