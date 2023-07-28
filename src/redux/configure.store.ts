import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slices/news.slice';
import rootReducer from "./slices/root.slice";

export default configureStore({
  reducer: {
    news: newsReducer,
    root: rootReducer
  }
})
