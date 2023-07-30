import axios, {AxiosInstance, AxiosResponse, CancelTokenSource} from 'axios';
import {BASE_ENDPOINT, LOGOUT_ENDPOINT} from '../api/endpoints';
import qs from 'qs';
import ApiResponse from "../api/types/responses/api.response.type";
import SignInResponse from "../api/types/responses/signin.response.type";

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_ENDPOINT,
    timeout: 30000,
    responseType: 'json',
    paramsSerializer: (params: any) => {
        return qs.stringify(params, {allowDots: false, arrayFormat: 'indices', encode: false});
    },
});

const axiosDispatcher = <T>(
    method: string,
    endpoint: string,
    data: any,
    params: any,
    headers: any,
    cancelToken: {
        token: any;
    },
) => {
    const requestHeaders = {
        common: {
            "Accept": "application/json",
        },
        ...headers,
    };

    return axiosInstance({
        method,
        url: endpoint,
        data,
        params,
        headers: requestHeaders,
        cancelToken: cancelToken?.token,
        withCredentials: true,
    })
        .then((response: AxiosResponse<ApiResponse<T>>) => {
            return response;
        })
        .catch((error: any) => {
            let status = undefined;
            if (error.response) {
                status = error.response.status;
                if (error.response.status === 401) {
                    localStorage.removeItem('user');
                    // @ts-ignore
                    logout(cancelToken);
                    // toast.error("You've been unauthenticated, please sign in again.");
                }
                if (error.response.data.error)
                    error = error.response.data.error;
            }
            return Promise.reject({code: status, error: error});
        });
};

export const logout = async (cancelToken: CancelTokenSource) => {
    return axiosDispatcher<SignInResponse>(METHODS.POST, LOGOUT_ENDPOINT, {}, {}, {}, cancelToken)
        .then(async (response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            if (error.code === 0)
                return Promise.reject(
                    'Something went wrong. Make sure you are connected to the internet.',
                );
            else if (error.error) return Promise.reject(error.error);
            else return Promise.reject('Something went wrong.');
        });
};

export default axiosDispatcher;
