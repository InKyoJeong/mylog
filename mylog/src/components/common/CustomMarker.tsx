import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import {colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/api';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color?: MarkerColor | 'WHITE';
}

const colorHex = {
  WHITE: colors.WHITE,
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
};

function CustomMarker({
  coordinate,
  color = 'WHITE',
  ...props
}: CustomMarkerProps) {
  return (
    <>
      {coordinate ? (
        <Marker coordinate={coordinate} {...props}>
          <View style={[styles.marker, {backgroundColor: colorHex[color]}]} />
        </Marker>
      ) : (
        <View style={[styles.marker, {backgroundColor: colorHex[color]}]} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 28,
    height: 28,
    borderRadius: 28,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.GRAY_700,
  },
});

export default CustomMarker;
