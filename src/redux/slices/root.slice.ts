import {Action, createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers} from '@reduxjs/toolkit'
import {Dispatch} from "react";
import {ApiResponseEnum} from "../../api/api.response.enum";
import {getCategories, getNewsFeed} from "../../api/news";
import {useSelector} from "react-redux";
import Article from "../../api/types/data.article.type";
import exp from "constants";
import {CancelTokenSource} from "axios";
import {newsSlice} from "./news.slice";

export interface RootState {
    globalLoading: boolean;
    status: ApiResponseEnum;
    categories: string[];
}

export const initialState: RootState = {
    globalLoading: false,
    status: ApiResponseEnum.IDLE,
    categories: []
}

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        changeGlobalLoading: (state, action: PayloadAction<boolean>) => {
            state.globalLoading = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.categories = action.payload.data;
                state.globalLoading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                state.globalLoading = false;
            })
    }
})

export const fetchCategories = createAsyncThunk('root/categories', async (payload: {cancelToken: CancelTokenSource}) => {
    return getCategories(payload.cancelToken);
});

export const { changeGlobalLoading} = rootSlice.actions

export const selectCategories = (state: any) => state.root.categories;
export const selectStatus = (state: any) => state.root.status;
export const selectGlobalLoading = (state: any) => state.root.globalLoading;
export default rootSlice.reducer;