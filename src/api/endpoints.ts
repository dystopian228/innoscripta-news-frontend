//BASE
export const BASE_ENDPOINT = `${process.env.REACT_APP_BASE_URL}`;

//CSRF-COOKIE
export const COOKIE_ENDPOINT = '/sanctum/csrf-cookie';

//AUTH
export const REGISTER_ENDPOINT = '/api/auth/register';
export const LOGIN_ENDPOINT = '/api/auth/authenticate';
export const LOGOUT_ENDPOINT = '/api/auth/logout';

//NEWS
export const NEWS_INDEX = '/api/news';
export const NEWS_CATEGORIES = '/api/news/categories';
export const NEWS_SOURCES = '/api/news/sources';

//PREFERENCES
export const PREFERENCES_INDEX = '/api/user/preferences';
export const PREFERENCES_UPDATE = '/api/user/preferences/update';