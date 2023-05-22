import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

interface PreviewImageOptionProps extends PressableProps {
  name: string;
  style: StyleProp<ViewStyle>;
}

function PreviewImageOption({name, style, ...props}: PreviewImageOptionProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={[styles.imageButton, style]} {...props}>
      <Ionicons name={name} size={16} color={colors[theme].WHITE} />
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imageButton: {
      position: 'absolute',
      backgroundColor: colors[theme].BLACK,
      zIndex: 1,
    },
  });

export default PreviewImageOption;
