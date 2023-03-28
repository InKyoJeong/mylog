const colors = {
  WHITE: '#FFF',
  PINK_200: '#FAE2E9',
  PINK_400: '#bf5c79',
  PINK_600: '#C63B64',
  BLACK: '#000',
} as const;

const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const homeNavigations = {
  MAP_HOME: 'MapHome',
  ADD_LOCATION: 'AddLocation',
} as const;

const feedNavigations = {
  LOCATION_FEED: 'LocationFeed',
  LOCATION_DETAIL: 'LocationDetail',
} as const;

export {
  colors,
  mainNavigations,
  authNavigations,
  homeNavigations,
  feedNavigations,
};
