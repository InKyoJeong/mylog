import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';

import {colors} from '@/constants/colors';

function Indicator({
  children,
  size = 'small',
  color = colors.GRAY_500,
  ...props
}: PropsWithChildren<ActivityIndicatorProps>) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY_200,
  },
  indicator: {
    marginBottom: 20,
  },
});

export default Indicator;
