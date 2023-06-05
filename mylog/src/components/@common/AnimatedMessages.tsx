import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  Keyframe,
  StretchInY,
} from 'react-native-reanimated';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface AnimatedMessagesProps {
  messages: string[];
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe;
}

function AnimatedMessages({
  messages,
  entering = StretchInY,
}: AnimatedMessagesProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Animated.View entering={entering} style={styles.infoContainer}>
      {messages.map((message, i) => (
        <Text key={message + i} style={styles.infoText}>
          {message}
        </Text>
      ))}
    </Animated.View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    infoContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors[theme].PINK_700,
      borderRadius: 3,
      padding: 10,
      gap: 10,
    },
    infoText: {
      color: colors[theme].PINK_700,
      fontSize: 15,
      fontWeight: '600',
    },
  });

export default AnimatedMessages;
