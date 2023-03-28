const colors = {
  WIHTE: '#FFF',
  PINK_200: '#FAE2E9',
  BLACK: '#000',
} as const;

const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
} as const;

const authNavigations = {
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
