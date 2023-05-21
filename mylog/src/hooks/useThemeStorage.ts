import {useEffect} from 'react';

import useThemeStore from '@/store/useThemeStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import {storageKeys} from '@/constants/keys';
import type {ThemeMode} from '@/types';

function useThemeStorage() {
  const {theme, setTheme} = useThemeStore();

  const set = async (mode: ThemeMode) => {
    await setAsyncStorage(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getAsyncStorage(storageKeys.THEME_MODE)) ?? 'light';
      setTheme(mode);
    })();
  }, [setTheme]);

  return {set, theme};
}

export default useThemeStorage;
