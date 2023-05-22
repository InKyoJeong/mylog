import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import Conditional from './Conditional';
import {colorHex, colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/domain';
import type {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

type Size = 'small' | 'medium' | 'large';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color?: MarkerColor | 'GRAY' | 'PINK';
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
  borderColor = colors.light.BLACK,
  innerColor = colors.light.BLACK,
  ...props
}: CustomMarkerProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <>
      {coordinate ? (
        <Marker coordinate={coordinate} {...props}>
          <View style={styles.container}>
            <View
              style={[
                styles.marker,
                styles.smallMarker,
                {backgroundColor: colorHex(theme)[color], borderColor},
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
          </View>
        </Marker>
      ) : (
        <View
          style={[
            styles.marker,
            styles[`${size}Marker`],
            {backgroundColor: colorHex(theme)[color], borderColor},
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
                {borderLeftColor: innerColor},
              ]}
            />
          </Conditional>
        </View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      height: 35,
      width: 32,
    },
    marker: {
      transform: [{rotate: '45deg'}],
    },
    smallMarker: {
      width: 27,
      height: 27,
      borderRadius: 27,
      borderBottomRightRadius: 1,
      borderWidth: 1,
    },
    mediumMarker: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderBottomRightRadius: 3,
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
      top: 21,
      left: 9,
    },
    mediumRightEye: {
      top: 9,
      left: 21,
    },
    largeLeftEye: {
      //
    },
    largeRightEye: {
      //
    },
    mouth: {
      transform: [{rotate: '45deg'}],
      borderBottomColor: 'rgba(255,255,255 / 0.01)',
      borderTopColor: 'rgba(255,255,255 / 0.01)',
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
      transform: [{rotate: '225deg'}],
      marginLeft: 5,
      marginTop: 5,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
    },
    mediumGood: {
      transform: [{rotate: '225deg'}],
      marginLeft: 10,
      marginTop: 10,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
      borderLeftColor: colors[theme].BLACK,
    },
    largeGood: {},
    soso: {
      marginLeft: 13,
      marginTop: 13,
      width: 8,
      height: 8,
      borderColor: colors[theme].UNCHANGE_BLACK,
      borderLeftWidth: 1,
      transform: [{rotate: '45deg'}],
    },
    smallBad: {
      marginLeft: 12,
      marginTop: 12,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
    },
    mediumBad: {
      marginLeft: 20,
      marginTop: 20,
      borderRightColor: 'rgba(255,255,255 / 0.01)',
      borderLeftColor: colors[theme].BLACK,
    },
    largeBad: {
      //
    },
  });

export default CustomMarker;
