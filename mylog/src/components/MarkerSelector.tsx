import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  PressableProps,
  ScrollView,
} from 'react-native';

import {MarkerColor} from '@/types/api';
import {colors} from '@/constants/colors';
import CustomMarker from './common/CustomMarker';

interface MarkerSelectorProps extends PressableProps {
  marker: MarkerColor;
  onPressMarker: (name: MarkerColor) => void;
}

const markerColors: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const MarkerSelector = ({marker, onPressMarker}: MarkerSelectorProps) => {
  return (
    <View style={styles.markerInputContainer}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {markerColors.map(color => {
            return (
              <Pressable
                key={color}
                style={[
                  styles.markerBox,
                  marker === color && styles.pressedMarker,
                ]}
                onPress={() => onPressMarker(color)}>
                <CustomMarker color={color} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  markerInputContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 15,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 15,
  },
  markerLabel: {
    marginLeft: 15,
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerSelector;
