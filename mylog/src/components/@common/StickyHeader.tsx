import React, {PropsWithChildren} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Conditional from './Conditional';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

interface StickyHeaderProps {
  isScrolled: boolean;
}

function StickyHeader({
  isScrolled,
  children,
}: PropsWithChildren<StickyHeaderProps>) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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
      backgroundColor:
        theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.6)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
    androidUnScrolledContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
    },
  });

export default StickyHeader;
