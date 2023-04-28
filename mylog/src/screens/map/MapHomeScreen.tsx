import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {
  Callout,
  LatLng,
  LongPressEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import MapButton from '@/components/MapButton';
import CustomMarker from '@/components/common/CustomMarker';
import usePermissions from '@/hooks/common/usePermission';
import useUserLocation from '@/hooks/common/useUserLocation';
import useMoveMapView from '@/hooks/common/useMoveMapView';
import {useGetMarkerLocations} from '@/hooks/queries/useMarker';
import {mapNavigations, mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import {numbers, zIndex} from '@/constants/numbers';
import useMarkerStore from '@/store/useMarkerStore';
import getMapStyle from '@/style/mapStyle';

type MapHomeScreenProps = CompositeScreenProps<
  StackScreenProps<MapStackParamList, typeof mapNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function MapHomeScreen({navigation}: MapHomeScreenProps) {
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView({
    latitudeDelta: numbers.INITIAL_LATITUDE_DELTA,
    longitudeDelta: numbers.INITIAL_LONGITUDE_DELTA,
  });
  const {userLocation, isUserLocationError} = useUserLocation({
    latitude: numbers.INITIAL_LATITUDE,
    longitude: numbers.INITIAL_LONGITUDE,
  });
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkerLocations();
  const {showModal} = useMarkerStore();
  usePermissions();

  const handleLongPressLocation = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressMarker = (markerId: number, coordinate: LatLng) => {
    showModal(markerId);
    moveMapView(coordinate);
  };

  const handlePressAddLocation = () => {
    if (!selectLocation) {
      return Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
    }

    navigation.navigate(mapNavigations.ADD_LOCATION, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      console.log('위치 권한을 허용해주세요.');
      return;
    }

    moveMapView(userLocation);
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
        clusterColor={colors.PINK_700}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: numbers.INITIAL_LATITUDE_DELTA,
          longitudeDelta: numbers.INITIAL_LONGITUDE_DELTA,
        }}
        onLongPress={handleLongPressLocation}
        onRegionChangeComplete={handleChangeDelta}>
        {markers.map(({id, color, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            style={{zIndex: zIndex.SAVED_MARKER}}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && (
          <Callout>
            <CustomMarker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={styles.drawerButton}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name={'md-menu-sharp'} color={colors.WHITE} size={30} />
      </Pressable>

      <View style={styles.buttonList}>
        <MapButton onPress={handlePressAddLocation}>
          <MaterialIcons name={'add'} color={colors.WHITE} size={25} />
        </MapButton>
        <MapButton onPress={handlePressUserLocation}>
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
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: colors.PINK_700,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  buttonList: {
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
});

export default MapHomeScreen;
