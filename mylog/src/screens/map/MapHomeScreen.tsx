import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  LongPressEvent,
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
import CustomMarker from '@/components/common/CustomMarker';
import usePermissions from '@/hooks/common/usePermission';
import useUserLocation from '@/hooks/common/useUserLocation';
import useMoveMapView from '@/hooks/common/useMoveMapView';
import {useGetMarkerLocations} from '@/hooks/queries/useMarker';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import getMapStyle from '@/style/mapStyle';
import useModalStore from '@/store/useModalStore';
import MarkerModal from '@/components/MarkerModal';

type MapHomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function MapHomeScreen({navigation}: MapHomeScreenProps) {
  const {mapRef, moveMapView, handleChangeDelta, setSelectedMarker} =
    useMoveMapView({
      latitudeDelta: numbers.INITIAL_LATITUDE_DELTA,
      longitudeDelta: numbers.INITIAL_LONGITUDE_DELTA,
    });
  const {userLocation, isUserLocationError} = useUserLocation({
    latitude: numbers.INITIAL_LATITUDE,
    longitude: numbers.INITIAL_LONGITUDE,
  });
  const [selectedMapView, setSelectedMapView] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkerLocations();
  const {showModal} = useModalStore();
  usePermissions();

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectedMapView(nativeEvent.coordinate);
  };

  const handlePressAddLocation = () => {
    if (!selectedMapView) {
      return Alert.alert(
        '위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
    }

    navigation.navigate(homeNavigations.ADD_LOCATION, {
      location: selectedMapView,
    });
    setSelectedMapView(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      console.log('위치 권한을 허용해주세요.');
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    showModal(id);
    setSelectedMarker(coordinate);
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
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: numbers.INITIAL_LATITUDE_DELTA,
          longitudeDelta: numbers.INITIAL_LONGITUDE_DELTA,
        }}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}>
        {markers.map(({id, color, latitude, longitude}) => (
          <CustomMarker
            key={id}
            coordinate={{latitude, longitude}}
            color={color}
            onPress={() => handlePressMarker(id, {latitude, longitude})}
          />
        ))}
        {selectedMapView && <CustomMarker coordinate={selectedMapView} />}
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

      <MarkerModal />
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
    top: 60,
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
