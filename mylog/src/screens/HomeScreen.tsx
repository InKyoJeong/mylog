import React, {useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';

import type {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
import getMapStyle from '@/style/mapStyle';
import {colors} from '@/constants/colors';

type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

const markers: (LatLng & {id: number})[] = [
  {
    id: 1,
    latitude: 37.3851,
    longitude: 127.115,
  },
  {
    id: 2,
    latitude: 37.385278905375554,
    longitude: 127.12102600461246,
  },
];

function HomeScreen({navigation}: HomeScreenProps) {
  const {logoutMutate} = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const handleLogout = () => {
    logoutMutate.mutate(null);
  };

  const handleSelectLocation = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const handleMoveAddLocation = () => {
    if (!selectedLocation) {
      return Alert.alert(
        '위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
    }
    navigation.navigate(homeNavigations.ADD_LOCATION, {
      location: selectedLocation,
    });
    setSelectedLocation(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        customMapStyle={getMapStyle('light')}
        initialRegion={{
          latitude: 37.3814,
          longitude: 127.1191,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={handleSelectLocation}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <View style={styles.marker} />
          </Marker>
        ))}
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <View style={styles.selectedMarker} />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttons}>
        <Button title="로그아웃" onPress={handleLogout} />
        <Button title="+" onPress={handleMoveAddLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: colors.PINK_600,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderBottomRightRadius: 3,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  selectedMarker: {
    backgroundColor: colors.WHITE,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderBottomRightRadius: 3,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  buttons: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: colors.PINK_600,
  },
});

export default HomeScreen;
