import {CancelTokenSource} from "axios";
import ApiResponse from "./types/responses/api.response.type";
import axios, {METHODS} from "../util/axios";
import {COOKIE_ENDPOINT, LOGIN_ENDPOINT, REGISTER_ENDPOINT} from "./endpoints";
import User from "./types/responses/data.user.type";
import SignupRequest from "./types/requests/signup.request.type";
import LoginRequest from "./types/requests/login.request.type";
import SignInResponse from "./types/responses/signin.response.type";

export const signup = async (request: SignupRequest, cancelToken: CancelTokenSource): Promise<ApiResponse<{
    user: User
}>> => {
    return axios(METHODS.GET, COOKIE_ENDPOINT, {}, {}, {}, cancelToken).then(() => {
        return axios<{
            user: User
        }>(METHODS.POST, REGISTER_ENDPOINT, {name: request.name, email: request.email, password: request.password, password_confirmation: request.passwordConfirmation}, {}, {}, cancelToken)
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
    });
};

export const login = async (request: LoginRequest, cancelToken: CancelTokenSource) => {
    return axios(METHODS.GET, COOKIE_ENDPOINT, {}, {}, {}, cancelToken).then(() => {
        return axios<SignInResponse>(METHODS.POST, LOGIN_ENDPOINT, {email: request.email, password: request.password}, {}, {}, cancelToken)
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
    });
};