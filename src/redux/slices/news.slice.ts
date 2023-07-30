import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import {getCategories, getNewsFeed, getSources} from "../../api/news";
import Article from "../../api/types/responses/data.article.type";
import {CancelTokenSource} from "axios";
import Source from "../../api/types/responses/data.source.type";
import FilterObjectType from "../../api/types/requests/filter.object.type";

export interface NewsState {
    articles: Article[];
    nextPage: number | null;
    category: string | null;
    error: string | undefined | null;
    status: ApiResponseEnum;
    searchSources: Source[] | null;
    filter: FilterObjectType | null;
}

export const initialState: NewsState = {
    articles: [],
    nextPage: null,
    category: null,
    error: null,
    status: ApiResponseEnum.IDLE,
    searchSources: null,
    filter: null
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<string | null>) => {
            state.category = action.payload;
            state.status = ApiResponseEnum.IDLE;
            state.articles = [];
            state.filter = null;
        },
        emptyArticles: (state) => {
            state.articles = [];
            state.nextPage = null;
            state.filter = null;
        },
        setFilter: (state, action: PayloadAction<FilterObjectType | null>) => {
            state.filter = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS
                // Add any fetched posts to the array
                state.articles = state.articles.concat(action.payload.data.data);
                state.nextPage = action.payload.data.links.next && action.payload.data.meta.current_page ? action.payload.data.meta.current_page + 1 : null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                state.error = action.error.message
            })
            //Sources
            .addCase(fetchSources.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(fetchSources.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS
                // Add any fetched posts to the array
                state.searchSources = action.payload.data;
            })
            .addCase(fetchSources.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                state.error = action.error.message
            })
    }
})

// Action creators are generated for each case reducer function
export const fetchNews = createAsyncThunk('news/fetchNews', async (payload: { page: number, category: string | null, filterObject: FilterObjectType | null, cancelToken: CancelTokenSource, clearNews: boolean, withFilter: boolean }, thunkAPI) => {
    if (payload.clearNews) {
        thunkAPI.dispatch(emptyArticles());
    }
    if (payload.filterObject && payload.withFilter) {
        thunkAPI.dispatch(setFilter(payload.filterObject));
    } else if (!payload.withFilter) {
        thunkAPI.dispatch(setFilter(null));
    }
    return getNewsFeed(payload.page, payload.category, (thunkAPI.getState() as any).news.filter, payload.cancelToken);
})

export const fetchSources = createAsyncThunk('news/sources', async (payload: { cancelToken: CancelTokenSource }) => {
    return getSources(payload.cancelToken);
});

export {}

export const selectAllArticles = (state: any) => state.news.articles;
export const selectCategory = (state: any) => state.news.category;
export const selectStatus = (state: any) => state.news.status;
export const selectError = (state: any) => state.news.error;
export const selectNextPage = (state: any) => state.news.nextPage;
export const selectSearchWord = (state: any) => state.news.searchWord;
export const selectSearchCategories = (state: any) => state.news.searchCategories;
export const selectSearchSources = (state: any) => state.news.searchSources;
export const {changeCategory, emptyArticles, setFilter} = newsSlice.actions
export default newsSlice.reducer;