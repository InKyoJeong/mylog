import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

import SearchInput from '@/components/@common/SearchInput';
import Pagination from '@/components/@common/Pagination';
import SearchHistoryList from '@/components/map/SearchHistoryList';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import useSearchStore from '@/store/useSearchStore';
import {numbers, storageKeys} from '@/constants';

function SearchLocationScreen() {
  const {keyword, setKeyword} = useSearchStore();
  const {userLocation} = useUserLocation();
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
        onSubmit={() => Keyboard.dismiss()}
      />
      <SearchHistoryList storageKey={storageKeys.SEARCH_LOCATION} />
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        fetchPrevPage={fetchPrevPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        totalLength={regionInfo.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
