import React, {PropsWithChildren} from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';

import {colors} from '@/constants/colors';

function MapButton({children, ...props}: PropsWithChildren<PressableProps>) {
  return (
    <Pressable style={styles.container} {...props}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: colors.PINK_600,
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapButton;
