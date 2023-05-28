import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CustomButton from './CustomButton';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

export interface ErrorFallbackProps {
  reset: () => void;
}

function ErrorFallback({reset}: ErrorFallbackProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>잠시 후 다시 시도해주세요</Text>
      <Text style={styles.descriptionText}>
        요청 사항을 처리하는데 실패했습니다
      </Text>
      <CustomButton
        label="다시 시도"
        size="medium"
        variant="outlined"
        onPress={reset}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors[theme].WHITE,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors[theme].BLACK,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
    },
  });

export default ErrorFallback;
