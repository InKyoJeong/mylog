import {useEffect} from 'react';

import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import useLegendStore from '@/store/useLegendStore';
import {storageKeys} from '@/constants/keys';

function useLegendStorage() {
  const legend = useLegendStore();

  const set = async (flag: boolean) => {
    await setAsyncStorage(storageKeys.SHOW_LEGEND, flag);
    legend.setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getAsyncStorage(storageKeys.SHOW_LEGEND)) ?? false;
      legend.setIsVisible(storedData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKeys.SHOW_LEGEND]);

  return {set, isVisible: legend.isVisible};
}

export default useLegendStorage;
