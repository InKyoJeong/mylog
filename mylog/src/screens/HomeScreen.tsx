import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Indicator from '@/components/common/Indicator';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import usePermissions from '@/hooks/common/usePermission';
import useCurrentLocation from '@/hooks/common/useCurrentLocation';
import getMapStyle from '@/style/mapStyle';
import MapButton from '@/components/MapButton';

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
  const mapRef = useRef<MapView | null>(null);
  const {logoutMutate} = useAuth();
  const {currentLocation} = useCurrentLocation();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  usePermissions();

  if (!currentLocation) {
    return (
      <Indicator>
        <Text>내 위치를 로딩 중입니다.</Text>
        <Text>권한을 허용했는지 확인해주세요.</Text>
      </Indicator>
    );
  }

  const handleLogout = () => {
    logoutMutate.mutate(null);
  };

  const handleMoveCurrentLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
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
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        customMapStyle={getMapStyle('light')}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
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
            <View style={[styles.marker, styles.savedMarker]} />
          </Marker>
        ))}
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <View style={[styles.marker, styles.selectedMarker]} />
          </Marker>
        )}
      </MapView>

      <Pressable
        style={styles.drawerButton}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name={'md-menu-sharp'} color={colors.WHITE} size={30} />
      </Pressable>

      <View style={styles.buttons}>
        <MapButton onPress={handleMoveAddLocation}>
          <MaterialIcons name={'add'} color={colors.WHITE} size={25} />
        </MapButton>

        <MapButton onPress={handleMoveCurrentLocation}>
          <MaterialIcons name={'my-location'} color={colors.WHITE} size={25} />
        </MapButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderBottomRightRadius: 1,
  },
  savedMarker: {
    backgroundColor: '#EC87A5',
    borderColor: '#5A5A5A', // lightMode
    borderWidth: 1,
  },
  selectedMarker: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_500,
    borderWidth: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 60,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: colors.PINK_600,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  buttons: {
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
});

export default HomeScreen;
