import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import SearchInput from '@/components/@common/SearchInput';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';

function SearchLocationScreen() {
  const {userLocation} = useUserLocation();
  const [keyword, setKeyword] = useState('');
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력하세요."
        maxLength={numbers.MAX_SEARCH_LOCATION_LENGTH}
        onPress={() => Keyboard.dismiss()}
      />
      <View style={styles.resultContainer}>
        <ScrollView
          onTouchStart={() => Keyboard.dismiss()}
          showsVerticalScrollIndicator
          indicatorStyle="black"
          contentContainerStyle={styles.scrollContainer}>
          {regionInfo.map((info, index) => (
            <View
              key={info.id}
              style={[
                styles.itemBorder,
                index === regionInfo.length - 1 && styles.noItemBorder,
              ]}>
              <Text style={styles.placeText}>{info.place_name}</Text>
              <View style={styles.categoryContainer}>
                <Text>{info.distance}</Text>
                <Text style={styles.subInfoText}>{info.category_name}</Text>
              </View>
              <Text style={styles.subInfoText}>{info.road_address_name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.pageButtonContainer}>
        <Pressable onPress={fetchPrevPage} style={styles.pageButton}>
          <Octicons
            name="arrow-left"
            size={15}
            color={pageParam > 1 ? colors.BLACK : colors.GRAY_300}
            onPress={fetchPrevPage}
          />
          <Text
            style={pageParam > 1 ? styles.pageText : styles.disabledPageText}>
            이전페이지
          </Text>
        </Pressable>
        <Pressable onPress={fetchNextPage} style={styles.pageButton}>
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
  placeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
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
