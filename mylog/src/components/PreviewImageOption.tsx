import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants/colors';

interface PreviewImageOptionProps extends PressableProps {
  name: string;
  style: StyleProp<ViewStyle>;
}

function PreviewImageOption({name, style, ...props}: PreviewImageOptionProps) {
  return (
    <Pressable style={[styles.imageButton, style]} {...props}>
      <Ionicons name={name} size={16} color={colors.WHITE} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
});

export default PreviewImageOption;
