import {useEffect} from 'react';

import useViewModeStore, {ViewMode} from '@/store/useViewModeStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils';
import {storageKeys} from '@/constants';

function useViewModeStorage() {
  const {mode, setMode} = useViewModeStore();

  const set = async (viewMode: ViewMode) => {
    await setAsyncStorage(storageKeys.VIEW_MODE, viewMode);
    setMode(viewMode);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getAsyncStorage(storageKeys.VIEW_MODE)) ?? 'album';
      setMode(storedData);
    })();
  }, [setMode]);

  return {set, mode};
}

export default useViewModeStorage;
