import {colors} from '@/constants/colors';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function CustomBottomTab({children}: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
  },
});

export default CustomBottomTab;
