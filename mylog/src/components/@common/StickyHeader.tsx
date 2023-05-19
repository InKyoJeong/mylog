import React, {PropsWithChildren} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Conditional from './Conditional';
import {colors} from '@/constants/colors';

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
      {Platform.select({
        ios: (
          <>
            <Conditional condition={!isScrolled}>
              <View
                style={[
                  styles.container,
                  styles.inner,
                  {marginTop: insets.top},
                ]}>
                {children}
              </View>
            </Conditional>
            <Conditional condition={isScrolled}>
              <SafeAreaView
                style={[styles.container, styles.scrolledContainer]}>
                <View style={styles.inner}>{children}</View>
              </SafeAreaView>
            </Conditional>
          </>
        ),
        android: (
          <SafeAreaView
            style={[
              styles.container,
              isScrolled
                ? styles.scrolledContainer
                : styles.androidUnScrolledContainer,
            ]}>
            <View style={styles.inner}>{children}</View>
          </SafeAreaView>
        ),
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
  },
  androidUnScrolledContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
});

export default StickyHeader;
