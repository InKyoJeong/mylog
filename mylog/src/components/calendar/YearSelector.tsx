import React, {useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Conditional from '../@common/Conditional';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface YearSelectorProps {
  isVisible: boolean;
  currentyear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentyear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (scrollViewRef.current) {
      const yearIndex = currentyear - 1980;
      const currentRow = Math.floor(yearIndex / 4);
      const scrollToY = currentRow * 50;
      setScrollY(scrollToY);
    }
  }, [isVisible, currentyear]);

  return (
    <Conditional condition={isVisible}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentOffset={{x: 0, y: scrollY}}>
          <View style={styles.yearsContainer}>
            {Array.from(
              {length: 2099 - 1980 + 1},
              (_, index) => index + 1980,
            ).map(num => (
              <Pressable
                key={num}
                onPress={() => onChangeYear(num)}
                style={[
                  styles.yearButton,
                  currentyear === num && styles.currentYearButton,
                ]}>
                <Text
                  style={[
                    styles.yearText,
                    currentyear === num && styles.currentYearText,
                  ]}>
                  {num}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Pressable style={styles.closeButton} onPress={hide}>
          <Text style={styles.closeText}>닫기</Text>
          <MaterialIcons
            name="keyboard-arrow-up"
            size={20}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>
    </Conditional>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
    },
    scrollContainer: {
      maxHeight: 200,
      backgroundColor: colors[theme].WHITE,
    },
    yearsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginVertical: 10,
    },
    yearButton: {
      width: 80,
      height: 40,
      padding: 10,
      margin: 5,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_500,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentYearButton: {
      backgroundColor: colors[theme].PINK_700,
      borderColor: colors[theme].PINK_700,
    },
    yearText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].GRAY_700,
    },
    currentYearText: {
      color: colors[theme].WHITE,
      fontWeight: '600',
    },
    closeButton: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors[theme].WHITE,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors[theme].GRAY_500,
    },
    closeText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default YearSelector;
