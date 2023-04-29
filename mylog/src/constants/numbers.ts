const numbers = {
  MIN_USERNAME_LENGTH: 4,
  MAX_USERNAME_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  MIN_TITLE_LENGTH: 1,
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_LATITUDE: 37.5516032365118,
  INITIAL_LONGITUDE: 126.98989626020192,
  INITIAL_LATITUDE_DELTA: 0.0922,
  INITIAL_LONGITUDE_DELTA: 0.0421,
  KEYBOARD_VERTICAL_OFFSET: {
    ANDROID: -1000,
  },
} as const;

const zIndex = {
  SAVED_MARKER: -1,
  NEW_MARKER: 100,
} as const;

const months: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
} as const;

export {numbers, zIndex, months};
