import {useEffect} from 'react';

import useMarkerFilterStore from '@/store/useMarkerFilterStore';
import {getAsyncStorage, getObjectWithValue, setAsyncStorage} from '@/utils';
import {categoryList, scoreList, storageKeys} from '@/constants';
import type {Marker} from '@/types';

function useMarkerFilterStorage() {
  const {filterItems, setFilterItems} = useMarkerFilterStore();

  const set = async (items: Record<string, boolean>) => {
    await setAsyncStorage(storageKeys.MARKER_FILTER, items);
    setFilterItems(items);
  };

  const transformFilteredMarker = (markers: Marker[]) => {
    return markers.filter(marker => {
      return (
        filterItems[marker.color] === true &&
        filterItems[String(marker.score)] === true
      );
    });
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage(storageKeys.MARKER_FILTER)) ?? {
        ...getObjectWithValue(categoryList, true),
        ...getObjectWithValue(scoreList, true),
      };
      setFilterItems(storedData);
    })();
  }, [setFilterItems]);

  return {set, items: filterItems, transformFilteredMarker};
}

export default useMarkerFilterStorage;
