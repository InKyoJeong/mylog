import {useEffect} from 'react';

import useLegendStore from '@/store/useLegendStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils';
import {storageKeys} from '@/constants';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (flag: boolean) => {
    await setAsyncStorage(storageKeys.SHOW_LEGEND, flag);
    setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getAsyncStorage(storageKeys.SHOW_LEGEND)) ?? false;
      setIsVisible(storedData);
    })();
  }, [setIsVisible]);

  return {set, isVisible};
}

export default useLegendStorage;
