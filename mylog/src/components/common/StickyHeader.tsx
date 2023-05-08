import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Conditional from './Conditional';

interface StickyHeaderProps {
  isScrolled: boolean;
}

function StickyHeader({
  isScrolled,
  children,
}: PropsWithChildren<StickyHeaderProps>) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Conditional condition={!isScrolled}>
        <View style={[styles.container, styles.inner, {marginTop: insets.top}]}>
          {children}
        </View>
      </Conditional>

      <Conditional condition={isScrolled}>
        <SafeAreaView style={[styles.container, styles.scrolledContainer]}>
          <View style={styles.inner}>{children}</View>
        </SafeAreaView>
      </Conditional>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: 0,
  },
  inner: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrolledContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default StickyHeader;
