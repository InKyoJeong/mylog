import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import {colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/domain';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color?: MarkerColor | 'WHITE';
  score?: number;
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
  score = 5,
  ...props
}: CustomMarkerProps) {
  return (
    <>
      {coordinate ? (
        <Marker coordinate={coordinate} {...props}>
          <View style={[styles.marker, {backgroundColor: colorHex[color]}]}>
            <View style={[styles.eye, styles.leftEye]} />
            <View style={[styles.eye, styles.rightEye]} />

            {score > 3 && <View style={[styles.mouth, styles.good]} />}
            {score === 3 && <View style={styles.soso} />}
            {score < 3 && <View style={[styles.mouth, styles.bad]} />}
          </View>
        </Marker>
      ) : (
        <View style={[styles.marker, {backgroundColor: colorHex[color]}]} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1.5,
    borderColor: colors.GRAY_700,
  },
  eye: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: 'black',
    transform: [{rotate: '45deg'}],
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderLeftColor: 'transparent',
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderColor: 'black',
    borderLeftWidth: 1,
    transform: [{rotate: '45deg'}],
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'transparent',
  },
});

export default CustomMarker;
