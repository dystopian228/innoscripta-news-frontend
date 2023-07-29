import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import {CancelTokenSource} from "axios";
import {login, signup} from "../../api/auth";
import SignupRequest from "../../api/types/requests/signup.request.type";
import LoginRequest from "../../api/types/requests/login.request.type";
import User from "../../api/types/responses/data.user.type";
import {logout} from "../../util/axios";

export interface AuthState {
    status: ApiResponseEnum;
    user: User|null;
    token: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    status: ApiResponseEnum.IDLE,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user") || "" )as User : null,
    token: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        nullifyState: (state) => {
            state.error = null;
            state.status = ApiResponseEnum.IDLE;
        },
    },
    extraReducers(builder) {
        builder
            //Sign up
            .addCase(signUpUser.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.user = action.payload.data.user;
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
                state.token = action.payload.data.user.token;
                // @ts-ignore
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                // @ts-ignore
                state.error = action.payload;
            })
            //Login
            .addCase(signInUser.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.user = action.payload.data.user;
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
                state.token = action.payload.data.accessToken;
                // @ts-ignore
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                // @ts-ignore
                state.error = action.payload;
            })
            //Logout
            .addCase(signOutUser.pending, (state) => {
                state.status = ApiResponseEnum.LOADING;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.status = ApiResponseEnum.SUCCESS;
                state.user = null;
                localStorage.removeItem('user');
                state.token = null;
                // @ts-ignore
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.status = ApiResponseEnum.FAILURE;
                // @ts-ignore
                state.error = action.payload;
            })
    }
});
export const signUpUser = createAsyncThunk('auth/signup', async (payload: {
    signUpRequest: SignupRequest,
    cancelToken: CancelTokenSource
}, thunkAPI) => {
    try {

        const value = await signup(payload.signUpRequest, payload.cancelToken);
        return thunkAPI.fulfillWithValue(value);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const signInUser = createAsyncThunk('auth/signin', async (payload: {
    loginRequest: LoginRequest,
    cancelToken: CancelTokenSource
}, thunkAPI) => {
    try {
        const value = await login(payload.loginRequest, payload.cancelToken);
        return thunkAPI.fulfillWithValue(value);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const signOutUser = createAsyncThunk('auth/signout', async (payload: {
    cancelToken: CancelTokenSource
}, thunkAPI) => {
    try {
        const value = await logout(payload.cancelToken);
        return thunkAPI.fulfillWithValue(value);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const selectStatus = (state: any) => state.auth.status;
export const selectUser = (state: any) => state.auth.user;
export const selectError = (state: any) => state.auth.error;

export const {nullifyState} = authSlice.actions
export default authSlice.reducer;