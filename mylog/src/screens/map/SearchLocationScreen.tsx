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
import type {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import SearchInput from '@/components/@common/SearchInput';
import Conditional from '@/components/@common/Conditional';
import RecentSearchedList from '@/components/map/RecentSearchedList';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import useLocationStore from '@/store/useLocationStore';
import useSearchStore from '@/store/useSearchStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import {convertMeterToKilometer} from '@/utils';
import {mapNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import {storageKeys} from '@/constants/keys';

type SearchLocationScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.SEARCH_LOCATION
>;

function SearchLocationScreen({navigation}: SearchLocationScreenProps) {
  const {keyword, setKeyword} = useSearchStore();
  const {userLocation} = useUserLocation();
  const {setMoveLocation, setSelectLocation} = useLocationStore();
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

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
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력하세요."
        maxLength={numbers.MAX_SEARCH_LOCATION_LENGTH}
        onSubmit={() => Keyboard.dismiss()}
      />
      <RecentSearchedList storageKey={storageKeys.SEARCH_LOCATION} />

      <View style={styles.resultContainer}>
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
                <Octicons name="location" size={15} color={colors.PINK_700} />
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

      <View style={styles.pageButtonContainer}>
        <Pressable
          onPress={fetchPrevPage}
          style={styles.pageButton}
          disabled={pageParam <= 1}>
          <Octicons
            name="arrow-left"
            size={15}
            color={pageParam > 1 ? colors.BLACK : colors.GRAY_300}
            onPress={fetchPrevPage}
            disabled={pageParam <= 1}
          />
          <Text
            style={pageParam > 1 ? styles.pageText : styles.disabledPageText}>
            이전페이지
          </Text>
        </Pressable>
        <Pressable
          onPress={fetchNextPage}
          style={styles.pageButton}
          disabled={regionInfo.length === 0 || !hasNextPage}>
          <Text
            style={
              regionInfo.length > 0 && hasNextPage
                ? styles.pageText
                : styles.disabledPageText
            }>
            다음페이지
          </Text>
          <Octicons
            name="arrow-right"
            size={15}
            color={
              regionInfo.length > 0 && hasNextPage
                ? colors.BLACK
                : colors.GRAY_300
            }
            onPress={fetchNextPage}
            disabled={regionInfo.length === 0 || !hasNextPage}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
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
    color: colors.BLACK,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors.BLACK,
  },
  subInfoText: {
    flexShrink: 1,
    color: colors.GRAY_500,
  },
  itemBorder: {
    marginHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors.GRAY_300,
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
    color: colors.GRAY_500,
    fontSize: 16,
  },
  pageButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 5,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 25,
  },
  pageText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  disabledPageText: {
    fontSize: 15,
    color: colors.GRAY_300,
  },
});

export default SearchLocationScreen;
