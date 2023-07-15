import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import CustomMarker from './CustomMarker';
import CustomButton from './CustomButton';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface InfoMessageProps {
  message: string;
  buttonLabel?: string;
  onPress?: () => void;
}

function InfoMessage({message, buttonLabel, onPress}: InfoMessageProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <CustomMarker
        size="medium"
        borderColor={colors[theme].GRAY_200}
        innerColor={colors[theme].WHITE}
      />
      <Text style={styles.message}>{message}</Text>
      {buttonLabel && (
        <CustomButton
          size="medium"
          label={buttonLabel}
          variant="outlined"
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('screen').height / 2,
      gap: 30,
      margin: 20,
    },
    message: {
      fontSize: 18,
      color: colors[theme].GRAY_500,
      textAlign: 'center',
    },
  });

export default InfoMessage;
