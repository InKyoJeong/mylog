import {useEffect, useState} from 'react';

import {getAsyncStorage, setAsyncStorage} from '@/utils';

function useSearchHistoryStorage(storageKey: string) {
  const [searchedList, setSearchedList] = useState([]);

  const clearList = async () => {
    await setAsyncStorage(storageKey, []);
    setSearchedList([]);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage(storageKey)) ?? [];
      setSearchedList(storedData);
    })();
  }, [storageKey]);

  return {searchedList, clearList};
}

export default useSearchHistoryStorage;
