import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';

import type {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';

type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function HomeScreen({navigation}: HomeScreenProps) {
  const {logoutMutate} = useAuth();

  const handleLogout = () => {
    logoutMutate.mutate(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        // showsMyLocationButton={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.buttons}>
        <Button title="로그아웃" onPress={handleLogout} />
        <Button
          title="AddLocation"
          onPress={() => navigation.navigate(homeNavigations.ADD_LOCATION)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
