import React from 'react';
import {
  StyleSheet,
  View,
  PressableProps,
  Pressable,
  Text,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

type Variant = 'standard' | 'outlined' | 'filled';
type Size = 'small' | 'medium' | 'large';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  hasError?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'standard',
  size = 'small',
  style = null,
  hasError = false,
  ...props
}: CustomButtonProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      disabled={hasError}
      style={({pressed}) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles.container,
        styles[`${size}Container`],
        hasError && styles.inValidContainer,
      ]}
      {...props}>
      <View style={[styles[size], style]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 3,
    },
    smallContainer: {},
    mediumContainer: {
      width: '50%',
    },
    largeContainer: {
      width: '100%',
    },
    inValidContainer: {
      opacity: 0.5,
    },
    small: {
      alignItems: 'center',
      paddingVertical: deviceHeight > 640 ? 10 : 6,
      paddingHorizontal: deviceHeight > 640 ? 15 : 10,
    },
    medium: {
      alignItems: 'center',
      paddingVertical: deviceHeight > 640 ? 12 : 8,
    },
    large: {
      alignItems: 'center',
      paddingVertical: deviceHeight > 640 ? 15 : 10,
      width: '100%',
    },
    filled: {
      backgroundColor: colors[theme].PINK_700,
    },
    outlined: {
      borderColor: colors[theme].PINK_700,
      borderWidth: 1,
    },
    standard: {},
    filledPressed: {
      backgroundColor: colors[theme].PINK_500,
    },
    outlinedPressed: {
      borderColor: colors[theme].PINK_700,
      borderWidth: 1,
      opacity: 0.5,
    },
    standardPressed: {
      opacity: 0.5,
    },
    text: {
      color: colors[theme].WHITE,
      fontSize: 16,
      fontWeight: '700',
    },
    filledText: {
      color: colors[theme].WHITE,
    },
    outlinedText: {
      color: colors[theme].PINK_700,
    },
    standardText: {
      color: colors[theme].PINK_700,
    },
  });

export default CustomButton;
