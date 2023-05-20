const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  POST: 'post',
  GET_MARKERS: 'getMarkers',
  GET_POSTS: 'getPosts',
  GET_SEARCH_POSTS: 'getSearchPosts',
  GET_POST: 'getPost',
  FAVORITE: 'favorite',
  GET_FAVORITE_POSTS: 'getFavoritePosts',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  SEARCH_LOCATION: 'searchLocation',
  SHOW_LEGEND: 'showLegend',
} as const;

export {queryKeys, storageKeys};
