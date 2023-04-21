const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_LOCATION: 'AddLocation',
} as const;

const feedNavigations = {
  LOCATION_FEED: 'LocationFeed',
  LOCATION_DETAIL: 'LocationDetail',
} as const;

export {mainNavigations, authNavigations, mapNavigations, feedNavigations};
