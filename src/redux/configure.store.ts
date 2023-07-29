import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slices/news.slice';
import rootReducer from "./slices/root.slice";
import authReducer from "./slices/auth.slice";
import preferencesReducer from "./slices/preferences.slice";

export default configureStore({
  reducer: {
    news: newsReducer,
    root: rootReducer,
    auth: authReducer,
    preferences: preferencesReducer
  }
})
