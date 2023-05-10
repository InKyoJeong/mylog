import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import CustomMarker from './CustomMarker';
import CustomButton from './CustomButton';
import {colors} from '@/constants/colors';

interface InfoMessageProps {
  message: string;
  buttonLabel?: string;
  onPress: () => void;
}

function InfoMessage({message, buttonLabel, onPress}: InfoMessageProps) {
  return (
    <View style={styles.container}>
      <CustomMarker
        size="medium"
        borderColor={colors.GRAY_200}
        innerColor={colors.WHITE}
      />
      <Text style={styles.message}>{message}</Text>
      {buttonLabel && (
        <CustomButton
          size="small"
          label={buttonLabel}
          variant="outlined"
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 2,
    gap: 30,
    margin: 20,
  },
  message: {
    fontSize: 18,
    color: colors.GRAY_500,
    textAlign: 'center',
  },
});

export default InfoMessage;
