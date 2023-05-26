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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import CustomMarker from '@/components/@common/CustomMarker';
import MapButton from '@/components/map/MapButton';
import MarkerModal from '@/components/map/MarkerModal';
import MapLegend from '@/components/map/MapLegend';
import Conditional from '@/components/@common/Conditional';
import MarkerFilterOption from '@/components/map/MarkerFilterOption';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import useMoveMapView from '@/hooks/useMoveMapView';
import useLegendStorage from '@/hooks/useLegendStorage';
import useModal from '@/hooks/useModal';
import useMarkerStore from '@/store/useMarkerStore';
import useSnackbarStore from '@/store/useSnackbarStore';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemeStore';
import getMapStyle from '@/style/mapStyle';
import {
  colors,
  numbers,
  zIndex,
  alerts,
  mapNavigations,
  mainNavigations,
  errorMessages,
  categoryList,
  scoreList,
} from '@/constants';
import type {ThemeMode} from '@/types';

type MapHomeScreenProps = CompositeScreenProps<
  StackScreenProps<MapStackParamList, typeof mapNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function MapHomeScreen({navigation}: MapHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const [filteredMarkers, setFilteredMarkers] = useState([
    ...categoryList,
    ...scoreList,
  ]);
  const {data: markers = []} = useGetMarkers({
    select: existingMarkers =>
      existingMarkers.filter(marker => {
        return (
          filteredMarkers.includes(marker.color) &&
          filteredMarkers.includes(String(marker.score))
        );
      }),
  });

  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const legend = useLegendStorage();
  const {showModal} = useMarkerStore();
  const snackbar = useSnackbarStore();
  const filterOption = useModal();
  usePermission('LOCATION');

  const handleFilterMarkers = (array: string[]) => {
    setFilteredMarkers(array);
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
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

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
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
        toolbarEnabled={false}
        customMapStyle={getMapStyle(theme)}
        clusterColor={colors[theme].PINK_700}
        region={{...userLocation, ...numbers.INITIAL_DELTA}}
        onLongPress={handleLongPressMapView}
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
              pinColor={colors[theme].RED_500}
              style={{zIndex: zIndex.NEW_MARKER}}
              coordinate={selectLocation}
            />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: insets.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons
          name={'md-menu-sharp'}
          color={colors[theme].WHITE}
          size={30}
        />
      </Pressable>

      <Conditional condition={legend.isVisible}>
        <MapLegend />
      </Conditional>

      <View style={styles.buttonList}>
        <MapButton onPress={handlePressAddPost}>
          <MaterialIcons name={'add'} color={colors[theme].WHITE} size={25} />
        </MapButton>
        <MapButton onPress={handlePressSearch}>
          <Ionicons name={'search'} color={colors[theme].WHITE} size={25} />
        </MapButton>
        <MapButton onPress={filterOption.show}>
          <Ionicons
            name={'options-outline'}
            color={colors[theme].WHITE}
            size={25}
          />
        </MapButton>
        <MapButton onPress={handlePressUserLocation}>
          <MaterialIcons
            name={'my-location'}
            color={colors[theme].WHITE}
            size={25}
          />
        </MapButton>
      </View>

      <MarkerModal />
      <MarkerFilterOption
        isVisible={filterOption.isVisible}
        hideOption={filterOption.hide}
        onFilter={handleFilterMarkers}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      left: 0,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: colors[theme].PINK_700,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      elevation: 4,
    },
    buttonList: {
      position: 'absolute',
      bottom: 50,
      right: 15,
    },
  });

export default MapHomeScreen;
