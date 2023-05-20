import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useAuth from '@/hooks/queries/useAuth';
import Conditional from '../@common/Conditional';
import {colorHex, colors} from '@/constants/colors';
import {categoryList} from '@/constants/list';

function MapLegend() {
  const insets = useSafeAreaInsets();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};

  return (
    <View style={[styles.container, {top: insets.top || 20}]}>
      {categoryList.map((color, i) => {
        return (
          <Fragment key={i}>
            <Conditional condition={categories?.[color] !== ''}>
              <View style={styles.colmn}>
                <View
                  style={[
                    styles.legendColor,
                    {backgroundColor: colorHex[color]},
                  ]}
                />
                <Text style={styles.legendText}>{categories?.[color]}</Text>
              </View>
            </Conditional>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
    color: colors.BLACK,
    fontSize: 13,
  },
});

export default MapLegend;
