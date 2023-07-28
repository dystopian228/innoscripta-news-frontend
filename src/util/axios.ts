import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {BASE_ENDPOINT} from '../api/endpoints';
import qs from 'qs';
import ApiResponse from "../api/types/api.response.type";

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
        return qs.stringify(params, {allowDots: true});
    },
});

const axiosDispatcher = <T> (
    method: string,
    endpoint: string,
    data: any,
    params: any,
    headers: any,
    cancelToken: { token: any; },
) => {
    const requestHeaders = {
        ...headers,
    };
    //TODO: HANDLE ACCESS TOKEN
    if ('accessToken') {
        // requestHeaders['Authorization'] = `Bearer ${cookies.get('accessToken')}`;
    }

    return axiosInstance({
        method,
        url: endpoint,
        data,
        params,
        headers: requestHeaders,
        cancelToken: cancelToken?.token,
    })
        .then((response: AxiosResponse<ApiResponse<T>>) => {
            return response;
        })
        .catch((error: any) => {
            let status = undefined;
            if (error.response) {
                status = error.response.status;
                if (error.response.status === 401) {
                    // logOut(cancelToken);
                    // toast.error("You've been unauthenticated, please sign in again.");
                }
                if (error.response.data.error)
                    error = error.response.data.error;
            }
            return Promise.reject({code: status, error: error});
        });
};

export default axiosDispatcher;
