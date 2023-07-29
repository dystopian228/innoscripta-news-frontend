import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import {getCategories} from "../../api/news";
import {CancelTokenSource} from "axios";
import {signOutUser} from "./auth.slice";

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
            .addCase(fetchCategories.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.categories = action.payload.data;
                state.globalLoading = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = ApiResponseEnum.FAILURE;
                state.globalLoading = false;
            })
            .addCase(signOutUser.pending, (state) => {
                state.globalLoading = true;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.globalLoading = false;
            })
            .addCase(signOutUser.rejected, (state) => {
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