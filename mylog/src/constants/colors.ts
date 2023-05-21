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
};

const colors = {
  dark: {
    WHITE: '#161616',
    GRAY_100: '#313131',
    GRAY_200: '#575757',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#E3E8EE',
    GRAY_700: '#F8F8F8',
    BLACK: '#fff',
    ...common,
  },
  light: {
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E3E8EE',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#000',
    ...common,
  },
} as const;

const colorHex = {
  RED: colors.light.PINK_400,
  BLUE: colors.light.BLUE_400,
  GREEN: colors.light.GREEN_400,
  YELLOW: colors.light.YELLOW_400,
  PURPLE: colors.light.PURPLE_400,
  GRAY: colors.light.GRAY_200,
  PINK: colors.light.PINK_700,
};

export {colors, colorHex};
