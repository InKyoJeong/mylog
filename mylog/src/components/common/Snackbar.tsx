import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

import {colors} from '@/constants/colors';

interface SnackbarProps {
  message: string;
  onHide: () => void;
}

function Snackbar({message, onHide}: SnackbarProps) {
  const [position] = useState(new Animated.Value(-50));
  const timeoutId = useRef<number | null>(null);
  const panResponder = React.useRef<PanResponderInstance>(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: position}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dy > 0) {
          hideSnackbar();
        }
      },
    }),
  ).current;

  const hideSnackbar = () => {
    Animated.timing(position, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };

  useEffect(() => {
    Animated.timing(position, {
      toValue: -50,
      duration: 200,
      useNativeDriver: true,
    }).start();

    timeoutId.current = setTimeout(() => {
      hideSnackbar();
    }, 2500);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: position}]}]}
      {...panResponder.panHandlers}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    padding: 10,
    backgroundColor: colors.GRAY_700,
    borderRadius: 10,
  },
  message: {
    color: colors.WHITE,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Snackbar;
