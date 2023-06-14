import React, {PropsWithChildren} from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

function MapButton({children, ...props}: PropsWithChildren<PressableProps>) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} {...props}>
      {children}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      width: 48,
      backgroundColor: colors[theme].PINK_700,
      borderRadius: 30,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.5,
      elevation: 2,
    },
  });

export default MapButton;
