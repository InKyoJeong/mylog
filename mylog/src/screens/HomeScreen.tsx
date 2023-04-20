import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
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
import MapButton from '@/components/MapButton';
import usePermissions from '@/hooks/common/usePermission';
import useCurrentLocation from '@/hooks/common/useCurrentLocation';
import {useGetMarkerLocations} from '@/hooks/queries/useMarker';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import getMapStyle from '@/style/mapStyle';

type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function HomeScreen({navigation}: HomeScreenProps) {
  const mapRef = useRef<MapView | null>(null);
  const {currentLocation} = useCurrentLocation({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkerLocations();
  usePermissions();

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
        region={{
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
