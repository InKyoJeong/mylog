import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {homeNavigations} from '@/constants';

type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  typeof homeNavigations.MAP_HOME
>;

function HomeScreen({navigation}: HomeScreenProps) {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>Home</Text>
          <Button
            title="AddLocation 페이지로 이동"
            onPress={() => navigation.navigate(homeNavigations.ADD_LOCATION)}
          />
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

export default HomeScreen;
