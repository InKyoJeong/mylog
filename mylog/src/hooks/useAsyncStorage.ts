import {useEffect, useState} from 'react';

import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';

function useAsyncStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState(initialValue);

  const set = async (newData: T) => {
    await setAsyncStorage(key, newData);
    setData(newData);
  };

  const clear = async () => {
    await setAsyncStorage(key, initialValue);
    setData(initialValue);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage(key)) ?? initialValue;
      setData(storedData);
    })();
  }, [initialValue, key]);

  return {data, set, clear};
}

export default useAsyncStorage;
