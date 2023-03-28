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

import {colors} from '@/constants';

type Variant = 'standard' | 'outlined' | 'filled';
type Size = 'default' | 'medium' | 'large';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
}
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'standard',
  size = 'default',
  style = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles.container,
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
    backgroundColor: colors.PINK_600,
  },
  outlined: {
    borderColor: colors.PINK_600,
    borderWidth: 1,
  },
  standard: {},
  filledPressed: {
    backgroundColor: colors.PINK_400,
  },
  outlinedPressed: {
    borderColor: colors.PINK_600,
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
    color: colors.PINK_600,
  },
  standardText: {
    color: colors.PINK_600,
  },
});

export default CustomButton;
