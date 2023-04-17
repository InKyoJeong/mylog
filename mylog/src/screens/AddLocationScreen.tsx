import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {homeNavigations} from '@/constants/navigations';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';

type AddLocationScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeNavigations.ADD_LOCATION
>;

function AddLocationScreen({route}: AddLocationScreenProps) {
  const {location} = route.params;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>추가할 위치</Text>
          <Text>{location.latitude}</Text>
          <Text>{location.longitude}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddLocationScreen;
