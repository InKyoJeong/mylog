import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
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
import CustomMarker from '@/components/@common/CustomMarker';
import MapButton from '@/components/map/MapButton';
import MarkerModal from '@/components/map/MarkerModal';
import usePermission from '@/hooks/common/usePermission';
import useUserLocation from '@/hooks/common/useUserLocation';
import useMoveMapView from '@/hooks/common/useMoveMapView';
import {useGetMarkers} from '@/hooks/queries/useMarker';
import useMarkerStore from '@/store/useMarkerStore';
import useSnackbarStore from '@/store/useSnackbarStore';
import {mapNavigations, mainNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import {alerts, errorMessages} from '@/constants/messages';
import {numbers, zIndex} from '@/constants/numbers';
import getMapStyle from '@/style/mapStyle';

type MapHomeScreenProps = CompositeScreenProps<
  StackScreenProps<MapStackParamList, typeof mapNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function MapHomeScreen({navigation}: MapHomeScreenProps) {
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkers();
  const {showModal} = useMarkerStore();
  const snackbar = useSnackbarStore();
  usePermission('LOCATION');

  const handleLongPressLocation = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressMarker = (markerId: number, coordinate: LatLng) => {
    showModal(markerId);
    moveMapView(coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      snackbar.show(errorMessages.CANNOT_ACCESS_USER_LOCATION);
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
        region={{...userLocation, ...numbers.INITIAL_DELTA}}
        onLongPress={handleLongPressLocation}
        onRegionChangeComplete={handleChangeDelta}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            style={{zIndex: zIndex.SAVED_MARKER}}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && (
          <Callout>
            <Marker
              pinColor={colors.RED_500}
              style={{zIndex: zIndex.NEW_MARKER}}
              coordinate={selectLocation}
            />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={styles.drawerButton}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name={'md-menu-sharp'} color={colors.WHITE} size={30} />
      </Pressable>

      <View style={styles.buttonList}>
        <MapButton onPress={handlePressAddPost}>
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
    right: 15,
  },
});

export default MapHomeScreen;
