import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import type {ThemeMode} from '@/types';

interface YearSelectorProps {
  currentyear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({currentyear, onChangeYear, hide}: YearSelectorProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={{position: 'absolute'}}>
      <ScrollView
        style={{
          maxHeight: 200,
          backgroundColor: 'white',
        }}
        contentOffset={{x: 0, y: 500}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginVertical: 10,
          }}>
          {Array.from(
            {length: 2099 - 1980 + 1},
            (_, index) => index + 1980,
          ).map(num => (
            <Pressable
              key={num}
              onPress={() => onChangeYear(num)}
              style={[
                {
                  width: 80,
                  height: 40,
                  padding: 10,
                  margin: 5,
                  borderWidth: 1,
                  borderColor: colors.light.BLACK,
                  borderRadius: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                currentyear === num && {
                  backgroundColor: colors.light.PINK_700,
                  borderColor: colors.light.PINK_700,
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.light.BLACK,
                  },
                  currentyear === num && {color: 'white', fontWeight: '600'},
                ]}>
                {num}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={{
          flex: 1,
          backgroundColor: colors.light.WHITE,
          padding: 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'gray',
        }}
        onPress={hide}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          닫기
        </Text>
      </Pressable>
    </View>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({});

export default YearSelector;
