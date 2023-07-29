import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import {CancelTokenSource} from "axios";
import {
    getPreferences as fetchPreferences,
    updatePreferences as apiUpdatePreferences,
    PreferenceItem
} from "../../api/preferences";

export interface PreferencesState {
    status: ApiResponseEnum;
    sources: PreferenceItem[] | null;
    categories: PreferenceItem[] | null;
    error: string | null;
}

export const initialState: PreferencesState = {
    status: ApiResponseEnum.IDLE,
    sources: null,
    categories: null,
    error: null
}

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            //Fetch Preferences
            .addCase(getPreferences.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(getPreferences.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.categories = action.payload.data.categories;
                state.sources = action.payload.data.sources;
                // @ts-ignore
            })
            .addCase(getPreferences.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                // @ts-ignore
                state.error = action.payload;
            })
            //Fetch Preferences
            .addCase(updatePreferences.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(updatePreferences.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                // @ts-ignore
            })
            .addCase(updatePreferences.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                // @ts-ignore
                state.error = action.payload;
            })
    }
});
export const getPreferences = createAsyncThunk('preferences/index', async (payload: {
    cancelToken: CancelTokenSource
}, thunkAPI) => {
    try {

        const value = await fetchPreferences(payload.cancelToken);
        return thunkAPI.fulfillWithValue(value);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const updatePreferences = createAsyncThunk('preferences/update', async (payload: {
    preferences: { categories: string[], sources: string[] }
    cancelToken: CancelTokenSource
}, thunkAPI) => {
    try {

        const response = await apiUpdatePreferences(payload.preferences, payload.cancelToken);
        return thunkAPI.fulfillWithValue(response);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
export const selectCategories = (state: any) => state.preferences.categories;
export const selectSources = (state: any) => state.preferences.sources;
export const selectStatus = (state: any) => state.preferences.status;
export const selectError = (state: any) => state.auth.error;

export const {} = preferencesSlice.actions
export default preferencesSlice.reducer;