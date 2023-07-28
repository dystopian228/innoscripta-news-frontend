import {Action, createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers} from '@reduxjs/toolkit'
import {Dispatch} from "react";
import {ApiResponseEnum} from "../../api/api.response.enum";
import {getNewsFeed} from "../../api/news";
import {useSelector} from "react-redux";
import Article from "../../api/types/data.article.type";
import exp from "constants";
import {CancelTokenSource} from "axios";

export interface NewsState {
    articles: Article[];
    nextPage: number|null;
    category: string|null;
    error: string | undefined | null;
    status: ApiResponseEnum;
}

export const initialState: NewsState = {
    articles: [],
    nextPage: null,
    category: null,
    error: null,
    status: ApiResponseEnum.IDLE
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<string|null>) => {
            state.category = action.payload;
            state.status = ApiResponseEnum.IDLE;
            state.articles = [];
        },
        emptyArticles: (state) => {
            state.articles = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNews.pending, (state, action) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS
                // Add any fetched posts to the array
                console.log(state.nextPage);
                state.articles = state.articles.concat(action.payload.data.data);
                state.nextPage = action.payload.data.links.next && action.payload.data.meta.current_page ? action.payload.data.meta.current_page + 1 : null;
                console.log(state.nextPage);
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                state.error = action.error.message
            })
    }
})

// Action creators are generated for each case reducer function
export const fetchNews = createAsyncThunk('news/fetchNews', async (payload: {page: number, category: string|null, cancelToken: CancelTokenSource}) => {
    return getNewsFeed(payload.page, payload.category, payload.cancelToken);
})

export {}

export const selectAllArticles = (state: any) => state.news.articles;
export const selectCategory = (state: any) => state.news.category;
export const selectStatus = (state: any) => state.news.status;
export const selectError = (state: any) => state.news.error;
export const selectNextPage = (state: any) => state.news.nextPage;
export const { changeCategory, emptyArticles } = newsSlice.actions
export default newsSlice.reducer;