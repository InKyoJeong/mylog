import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useKeyboardStatus from '@/hooks/useKeyboardStatus';
import useSnackbarStore from '@/store/useSnackbarStore';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import type {ThemeMode} from '@/types';

function Snackbar() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const snackbar = useSnackbarStore();
  const {keyboardHeight} = useKeyboardStatus();
  const [position] = useState(new Animated.Value(-(insets.bottom || 10)));
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    Animated.timing(position, {
      toValue: -(insets.bottom || 10),
      useNativeDriver: true,
    }).start();

    timeoutIdRef.current = setTimeout(() => {
      Animated.timing(position, {
        toValue: 100,
        useNativeDriver: true,
      }).start(snackbar.hide);
    }, numbers.SNAKBAR_DISPLAY_TIME);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [insets.bottom, position, snackbar.hide, snackbar.info.message]);

  return (
    <>
      {snackbar.isVisible && (
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateY: position}],
              bottom: keyboardHeight,
            },
          ]}>
          <Text style={styles.message}>{snackbar.info.message}</Text>
        </Animated.View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '70%',
      alignSelf: 'center',
      backgroundColor:
        theme === 'light' ? colors[theme].GRAY_700 : colors[theme].GRAY_500,
      borderRadius: 10,
      padding: 15,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.6,
      elevation: 1,
    },
    message: {
      textAlign: 'center',
      color: colors[theme].UNCHANGE_WHITE,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default Snackbar;
