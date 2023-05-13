import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import Conditional from './Conditional';
import {colorHex, colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/domain';

type Size = 'small' | 'medium' | 'large';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color?: MarkerColor;
  score?: number;
  showFeel?: boolean;
  size?: Size;
  borderColor?: string;
  innerColor?: string;
}

function CustomMarker({
  coordinate,
  color = 'GRAY',
  score = 5,
  showFeel = true,
  size = 'small',
  borderColor = colors.GRAY_700,
  innerColor = colors.BLACK,
  ...props
}: CustomMarkerProps) {
  return (
    <>
      {coordinate ? (
        <Marker coordinate={coordinate} {...props}>
          <View
            style={[
              styles.marker,
              styles.smallMarker,
              {backgroundColor: colorHex[color], borderColor},
            ]}>
            <View
              style={[
                styles.eye,
                styles.smallEye,
                styles.smallLeftEye,
                {backgroundColor: innerColor},
              ]}
            />
            <View
              style={[
                styles.eye,
                styles.smallEye,
                styles.smallRightEye,
                {backgroundColor: innerColor},
              ]}
            />
            {score > 3 && (
              <View
                style={[styles.mouth, styles.smallMouth, styles.smallGood]}
              />
            )}
            {score === 3 && <View style={styles.soso} />}
            {score < 3 && (
              <View
                style={[styles.mouth, styles.smallMouth, styles.smallBad]}
              />
            )}
          </View>
        </Marker>
      ) : (
        <View
          style={[
            styles.marker,
            styles[`${size}Marker`],
            {backgroundColor: colorHex[color], borderColor},
          ]}>
          <Conditional condition={showFeel}>
            <View
              style={[
                styles.eye,
                styles[`${size}Eye`],
                styles[`${size}LeftEye`],
                {backgroundColor: innerColor},
              ]}
            />
            <View
              style={[
                styles.eye,
                styles[`${size}Eye`],
                styles[`${size}RightEye`],
                {backgroundColor: innerColor},
              ]}
            />
            <View
              style={[
                styles.mouth,
                styles[`${size}Mouth`],
                styles[`${size}Good`],
                {borderColor: innerColor},
              ]}
            />
          </Conditional>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    transform: [{rotate: '45deg'}],
  },
  smallMarker: {
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1.5,
  },
  mediumMarker: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderBottomRightRadius: 3,
    borderWidth: 3,
  },
  largeMarker: {
    //
  },
  eye: {
    position: 'absolute',
  },
  smallEye: {
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  mediumEye: {
    width: 7,
    height: 7,
    borderRadius: 7,
  },
  largeEye: {
    //
  },
  smallLeftEye: {
    top: 12,
    left: 5,
  },
  smallRightEye: {
    top: 5,
    left: 12,
  },
  mediumLeftEye: {
    top: 20,
    left: 8,
  },
  mediumRightEye: {
    top: 8,
    left: 20,
  },
  largeLeftEye: {
    //
  },
  largeRightEye: {
    //
  },
  mouth: {
    transform: [{rotate: '45deg'}],
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  smallMouth: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderRadius: 13,
  },
  mediumMouth: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 15,
  },
  largeMouth: {
    //
  },
  smallGood: {
    marginLeft: 5,
    marginTop: 5,
    borderLeftColor: 'transparent',
  },
  mediumGood: {
    marginLeft: 10,
    marginTop: 10,
    borderLeftColor: 'transparent',
  },
  largeGood: {},
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderColor: colors.BLACK,
    borderLeftWidth: 1,
    transform: [{rotate: '45deg'}],
  },
  smallBad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'transparent',
  },
  mediumBad: {
    marginLeft: 20,
    marginTop: 20,
    borderRightColor: 'transparent',
  },
  largeBad: {
    //
  },
});

export default CustomMarker;