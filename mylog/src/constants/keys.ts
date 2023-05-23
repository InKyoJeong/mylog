const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  POST: 'post',
  GET_MARKERS: 'getMarkers',
  GET_POSTS: 'getPosts',
  GET_POST: 'getPost',
  FAVORITE: 'favorite',
  GET_SEARCH_POSTS: 'getSearchPosts',
  GET_FAVORITE_POSTS: 'getFavoritePosts',
  GET_CALENDAR_POSTS: 'getCalendarPosts',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  SEARCH_LOCATION: 'searchLocation',
  SHOW_LEGEND: 'showLegend',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
} as const;

export {queryKeys, storageKeys};
