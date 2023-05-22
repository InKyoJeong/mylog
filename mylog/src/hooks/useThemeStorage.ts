import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {getAsyncStorage, setAsyncStorage} from '@/utils/asyncStorage';
import {storageKeys} from '@/constants';
import type {ThemeMode} from '@/types';

function useThemeStorage() {
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: ThemeMode) => {
    await setAsyncStorage(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await setAsyncStorage(storageKeys.THEME_SYSTEM, flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getAsyncStorage(storageKeys.THEME_MODE)) ?? 'light';
      const systemMode =
        (await getAsyncStorage(storageKeys.THEME_SYSTEM)) ?? false;

      const newMode = systemMode ? systemTheme : mode;
      setTheme(newMode);
      setSystemTheme(systemMode);
    })();
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;
