import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import Conditional from '../@common/Conditional';
import {colorHex, colors, categoryList} from '@/constants';
import type {ThemeMode, Category} from '@/types';

function MapLegend() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};

  return (
    <Conditional
      condition={Object.values(categories as Category).join('') !== ''}>
      <View style={[styles.container, {top: insets.top || 20}]}>
        {categoryList.map((color, i) => {
          return (
            <Fragment key={i}>
              <Conditional condition={categories?.[color] !== ''}>
                <View style={styles.colmn}>
                  <View
                    style={[
                      styles.legendColor,
                      {backgroundColor: colorHex(theme)[color]},
                    ]}
                  />
                  <Text style={styles.legendText}>{categories?.[color]}</Text>
                </View>
              </Conditional>
            </Fragment>
          );
        })}
      </View>
    </Conditional>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 15,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      borderRadius: 10,
      gap: 3,
    },
    colmn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    legendText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontWeight: '500',
      fontSize: 13,
    },
  });

export default MapLegend;
