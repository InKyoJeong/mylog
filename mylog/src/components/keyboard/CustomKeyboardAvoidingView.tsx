import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {numbers} from '@/constants/numbers';

interface CustomKeyboardAvoidingViewProps {
  style?: StyleProp<ViewStyle>;
}

function CustomKeyboardAvoidingView({
  children,
  style,
}: PropsWithChildren<CustomKeyboardAvoidingViewProps>) {
  const headerHeight = useHeaderHeight() || 0;

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.select({
        ios: 'padding',
        android: 'height',
      })}
      keyboardVerticalOffset={Platform.select({
        ios: headerHeight,
        android: numbers.KEYBOARD_VERTICAL_OFFSET.ANDROID,
      })}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
