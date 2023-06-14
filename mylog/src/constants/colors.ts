import {ThemeMode} from '@/types';

const common = {
  PINK_200: '#FAE2E9',
  PINK_400: '#EC87A5',
  PINK_500: '#BF5C79',
  PINK_700: '#C63B64',
  BLUE_500: '#0D8AFF',
  RED_500: '#FF5F5F',
  RED_300: '#FFB4B4',
  BLUE_400: '#B4E0FF',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#FFE594',
  YELLOW_500: '#FACC15',
  PURPLE_400: '#C4C4E7',
  UNCHANGE_WHITE: '#FFF',
  UNCHANGE_BLACK: '#000',
};

const colors = {
  light: {
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#161616',
    ...common,
  },
  dark: {
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    BLACK: '#fff',
    ...common,
  },
} as const;

const colorHex = (theme: ThemeMode = 'light') => ({
  RED: colors[theme].PINK_400,
  BLUE: colors[theme].BLUE_400,
  GREEN: colors[theme].GREEN_400,
  YELLOW: colors[theme].YELLOW_400,
  PURPLE: colors[theme].PURPLE_400,
  GRAY: colors[theme].GRAY_200,
  PINK: colors[theme].PINK_700,
});

const countColor: Record<number, string> = {
  1: colors.light.GRAY_300,
  2: colors.light.GRAY_500,
  3: colors.dark.GRAY_300,
  4: colors.dark.GRAY_200,
  5: colors.dark.GRAY_100,
} as const;

export {colors, colorHex, countColor};
