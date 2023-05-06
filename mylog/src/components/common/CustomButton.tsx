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

import {colors} from '@/constants/colors';

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
  return (
    <Pressable
      disabled={hasError}
      style={({pressed}) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles.container,
        hasError && styles.inValidContainer,
      ]}
      {...props}>
      <View style={[styles[size], style]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 3,
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
    width: '50%',
  },
  large: {
    alignItems: 'center',
    paddingVertical: deviceHeight > 640 ? 15 : 10,
    width: '100%',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  standard: {},
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  standardPressed: {
    opacity: 0.5,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
  standardText: {
    color: colors.PINK_700,
  },
});

export default CustomButton;
