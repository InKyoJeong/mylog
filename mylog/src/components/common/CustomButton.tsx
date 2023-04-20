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
type Size = 'default' | 'medium' | 'large';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  isValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'standard',
  size = 'default',
  style = null,
  isValid = true,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={!isValid}
      style={({pressed}) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles.container,
        !isValid && styles.inValidContainer,
      ]}
      {...props}>
      <View style={[styles.view, styles[size], style]}>
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
  view: {
    alignItems: 'center',
    paddingVertical: deviceHeight > 640 ? 15 : 10,
  },
  default: {
    paddingHorizontal: deviceHeight > 640 ? 15 : 10,
  },
  medium: {
    width: '50%',
  },
  large: {
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
