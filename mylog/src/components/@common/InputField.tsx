import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import {mergeRefs} from '@/utils';
import type {ThemeMode} from '@/types';

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
    const {theme} = useThemeStore();
    const styles = styling(theme);
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    useEffect(() => {
      if (touched && error) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      }
    }, [error, touched]);

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            props.multiline && styles.multiLine,
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
              placeholderTextColor={colors[theme].GRAY_500}
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      paddingVertical: deviceHeight > 640 ? 15 : 10,
      paddingHorizontal: deviceHeight > 640 ? 15 : 10,
    },
    multiLine: {
      paddingBottom: deviceHeight > 640 ? 45 : 30,
    },
    input: {
      fontSize: 16,
      paddingVertical: 0,
      paddingLeft: 0,
      color: colors[theme].BLACK,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
      paddingLeft: 0,
    },
  });

export default InputField;
