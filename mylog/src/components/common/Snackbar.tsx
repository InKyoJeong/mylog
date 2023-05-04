import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';

import useSnackbarStore from '@/store/useSnackbarStore';
import useKeyboardStatus from '@/hooks/common/useKeyboardStatus';
import {colors} from '@/constants/colors';

function Snackbar() {
  const snackbar = useSnackbarStore();
  const {keyboardHeight} = useKeyboardStatus();
  const [position] = useState(new Animated.Value(-50));
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    Animated.timing(position, {
      toValue: -50,
      useNativeDriver: true,
    }).start();

    timeoutIdRef.current = setTimeout(() => {
      Animated.timing(position, {
        toValue: 100,
        useNativeDriver: true,
      }).start(snackbar.hide);
    }, 2500);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [position, snackbar.hide, snackbar.info.message]);

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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '70%',
    alignSelf: 'center',
    backgroundColor: colors.GRAY_700,
    borderRadius: 10,
    padding: 15,
  },
  message: {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Snackbar;
