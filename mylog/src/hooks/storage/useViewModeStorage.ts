import {useEffect} from 'react';

import useViewModeStore, {ViewMode} from '@/store/useViewModeStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils';

function useViewModeStorage() {
  const {mode, setMode} = useViewModeStore();

  const set = async (viewMode: ViewMode) => {
    await setAsyncStorage('viewMode', viewMode);
    setMode(viewMode);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getAsyncStorage('viewMode')) ?? 'album';
      setMode(storedData);
    })();
  }, [setMode]);

  return {set, mode};
}

export default useViewModeStorage;
