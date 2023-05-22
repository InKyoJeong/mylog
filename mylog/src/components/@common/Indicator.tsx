import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

function Indicator({
  children,
  size = 'small',
  color = colors.light.GRAY_500,
  ...props
}: PropsWithChildren<ActivityIndicatorProps>) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.indicator}
        {...props}
      />
      {children}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].GRAY_200,
    },
    indicator: {
      marginBottom: 20,
    },
  });

export default Indicator;
