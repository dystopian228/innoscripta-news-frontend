import {CancelTokenSource} from "axios";
import ApiResponse from "./types/responses/api.response.type";
import axios, {METHODS} from "../util/axios";
import {NEWS_CATEGORIES, PREFERENCES_INDEX, PREFERENCES_UPDATE} from "./endpoints";

export interface PreferenceItem {
    symbol: string;
    text: string;
    checked: boolean;
}

export interface Preferences {
    categories: PreferenceItem[];
    sources: PreferenceItem[]
}

export const getPreferences = async (cancelToken: CancelTokenSource): Promise<ApiResponse<Preferences>> => {
    return axios<Preferences>(METHODS.GET, PREFERENCES_INDEX, {}, {}, {}, cancelToken)
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

export const updatePreferences = async ({categories, sources}: {
                                            categories: string[],
                                            sources: string[]
                                        },
                                        cancelToken: CancelTokenSource
    ) : Promise<ApiResponse<Preferences>> => {
        return axios<Preferences>(METHODS.PUT, PREFERENCES_UPDATE, {categories, sources}, {}, {}, cancelToken)
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
    }
;