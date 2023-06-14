import React from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {LatLng} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

import Conditional from '@/components/@common/Conditional';
import {RegionInfo} from '@/hooks/useSearchLocation';
import useLocationStore from '@/store/useLocationStore';
import useSearchStore from '@/store/useSearchStore';
import useThemeStore from '@/store/useThemeStore';
import {
  convertMeterToKilometer,
  getAsyncStorage,
  setAsyncStorage,
} from '@/utils';
import {colors, storageKeys} from '@/constants';
import type {ThemeMode} from '@/types';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({regionInfo}: SearchRegionResultProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {keyword, setKeyword} = useSearchStore();
  const {setMoveLocation, setSelectLocation} = useLocationStore();

  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
    saveRecentSearchedList(keyword);
  };

  const moveToMapScreen = (regionLocation: LatLng) => {
    navigation.goBack();
    setMoveLocation(regionLocation);
    setSelectLocation(regionLocation);
  };

  const saveRecentSearchedList = async (searchKeyword: string) => {
    const storedData =
      (await getAsyncStorage(storageKeys.SEARCH_LOCATION)) ?? [];
    await setAsyncStorage(storageKeys.SEARCH_LOCATION, [
      searchKeyword,
      ...storedData,
    ]);

    setKeyword('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onTouchStart={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={styles.scrollContainer}>
        {regionInfo.map((info, index) => (
          <Pressable
            key={info.id}
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder,
            ]}
            onPress={() => handlePressRegionInfo(info.y, info.x)}>
            <View style={styles.placeNameContainer}>
              <Octicons
                name="location"
                size={15}
                color={colors[theme].PINK_700}
              />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {convertMeterToKilometer(info.distance)}km
              </Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        <Conditional condition={regionInfo.length === 0}>
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          </View>
        </Conditional>
      </ScrollView>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
      height: Dimensions.get('screen').height / 2,
      marginVertical: 5,
      width: '100%',
    },
    scrollContainer: {
      padding: 10,
    },
    placeNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    placeText: {
      color: colors[theme].BLACK,
      flexShrink: 1,
      fontSize: 16,
      fontWeight: '600',
    },
    categoryContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    distanceText: {
      color: colors[theme].BLACK,
    },
    subInfoText: {
      flexShrink: 1,
      color: colors[theme].GRAY_500,
    },
    itemBorder: {
      marginHorizontal: 5,
      paddingVertical: 10,
      borderBottomColor: colors[theme].GRAY_300,
      borderBottomWidth: StyleSheet.hairlineWidth,
      gap: 3,
    },
    noItemBorder: {
      borderBottomWidth: 0,
    },
    noResultContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50,
    },
    noResultText: {
      color: colors[theme].GRAY_500,
      fontSize: 16,
    },
  });

export default SearchRegionResult;
