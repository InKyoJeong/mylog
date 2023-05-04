import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';

import useSnackbarStore from '@/store/useSnackbarStore';
import {colors} from '@/constants/colors';

function Snackbar() {
  const snackbar = useSnackbarStore();
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
      }
    };
  }, [position, snackbar.hide, snackbar.info]);

  return (
    <>
      {snackbar.isVisible && (
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateY: position}],
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
    bottom: 0,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: colors.GRAY_700,
    borderRadius: 10,
    padding: 15,
  },
  message: {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Snackbar;
