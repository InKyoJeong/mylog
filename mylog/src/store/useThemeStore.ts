import {ThemeMode} from '@/types';
import {create} from 'zustand';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  setTheme: (theme: ThemeMode) => {
    set({theme});
  },
}));

export default useThemeStore;
