import Article from "./types/responses/data.article.type";
import axios, {METHODS} from "../util/axios";
import {CancelTokenSource} from "axios";
import {NEWS_CATEGORIES, NEWS_INDEX, NEWS_SOURCES} from "./endpoints";
import ApiResponse from "./types/responses/api.response.type";
import Source from "./types/responses/data.source.type";
import FilterObject from "./types/requests/filter.object.type";
import filterObjectType from "./types/requests/filter.object.type";

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
}
export const getNewsFeed = async (page: number, category: string|null, filterObject: FilterObject|null ,cancelToken: CancelTokenSource): Promise<ApiResponse<ArticlePagination>> => {
    let params: Record<string, any> = {page: page};
    if (category !== null) {
        params['category'] = category;
    }
    if (filterObject !== null) {
        params['filter'] = filterObject;
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

export const getSources = async (cancelToken: CancelTokenSource): Promise<ApiResponse<Source[]>> => {
    return axios<Source[]>(METHODS.GET, NEWS_SOURCES, {}, {}, {}, cancelToken)
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