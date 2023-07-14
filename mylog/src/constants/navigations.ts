const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
  SETTING: 'Setting',
  STATISTICS: 'Statistics',
  FRIEND: 'Friend',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  KAKAO: 'Kakao',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTabNavigations = {
  FEED_HOME: 'FeedTabHome',
  FEED_SEARCH: 'FeedSearch',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

const calendarNavigations = {
  CALENDAR_HOME: 'CalendarHome',
} as const;

const settingNavigations = {
  SETTING_HOME: 'SettingHome',
  EDIT_PROFILE: 'EditProfile',
  EDIT_CATEGORY: 'EditCategory',
  FEED_BACK: 'FeedBack',
  DELETE_ACCOUNT: 'DeleteAccount',
  FAQ: 'Faq',
} as const;

const statisticsNavigations = {
  STATISTICS_HOME: 'StatisticsHome',
} as const;

const friendNavigations = {
  FRIEND_HOME: 'FriendHome',
  FRIEND_ADD: 'FriendAdd',
  FRIEND_FEED: 'FriendFeed',
  FRIEND_FEED_Detail: 'FriendFeedDetail',
  FRIEND_REQUEST: 'FriendRequest',
} as const;

export {
  mainNavigations,
  authNavigations,
  mapNavigations,
  feedNavigations,
  feedTabNavigations,
  calendarNavigations,
  settingNavigations,
  statisticsNavigations,
  friendNavigations,
};
