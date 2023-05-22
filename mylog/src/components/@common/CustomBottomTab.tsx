import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

function CustomBottomTab({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {children}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'flex-end',
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
  });

export default CustomBottomTab;
