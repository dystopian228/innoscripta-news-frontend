import Article from "./types/data.article.type";
import axios, {METHODS} from "../util/axios";
import {CancelTokenSource} from "axios";
import {NEWS_CATEGORIES, NEWS_INDEX} from "./endpoints";
import ApiResponse from "./types/api.response.type";

interface ArticlePagination {
    data: Article[];
    links: {
        first: string|null,
        last: string|null,
        prev: string|null,
        next: null
    },
    meta: {
        current_page: number|null,
        last_page: number|null,
        total: number
    }
};
export const getNewsFeed = async (page: number, category: string|null, cancelToken: CancelTokenSource): Promise<ApiResponse<ArticlePagination>> => {
    let params: Record<string, any> = {page: page};
    if (category !== null) {
        params['category'] = category;
    }
    return axios<ArticlePagination>(METHODS.GET, NEWS_INDEX, {}, params, {}, cancelToken)
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

export const getCategories = async (cancelToken: CancelTokenSource): Promise<ApiResponse<string[]>> => {
    return axios<string[]>(METHODS.GET, NEWS_CATEGORIES, {}, {}, {}, cancelToken)
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