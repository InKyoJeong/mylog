const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  POST: 'post',
  GET_MARKERS: 'getMarkers',
  GET_POSTS: 'getPosts',
  GET_POST: 'getPost',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  SEARCH_LOCATION: 'searchLocation',
} as const;

export {queryKeys, storageKeys};
