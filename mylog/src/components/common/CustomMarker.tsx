import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';

import type {MarkerColor} from '@/types/api';
import {colors} from '@/constants/colors';

interface CustomMarkerProps extends ViewProps {
  coordinate: LatLng;
  color?: MarkerColor | 'WHITE';
}

const colorHex = {
  WHITE: colors.WHITE,
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
};

function CustomMarker({
  coordinate,
  color = 'WHITE',
  ...props
}: CustomMarkerProps) {
  const handlePressMarker = () => {
    console.log('coordinate', coordinate);
  };

  return (
    <Marker coordinate={coordinate} onPress={handlePressMarker}>
      <View
        style={[styles.marker, {backgroundColor: colorHex[color]}]}
        {...props}
      />
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.GRAY_700,
  },
});

export default CustomMarker;
