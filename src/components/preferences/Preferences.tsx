import NewsyForm, {FieldGroup} from "../common/formik/Form";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import axios from "axios";
import {getPreferences, selectCategories, selectSources, updatePreferences, selectStatus} from "../../redux/slices/preferences.slice";
import {PreferenceItem} from "../../api/preferences";

const Preferences: React.FC = () => {


    const dispatch = useDispatch();
    const status: ApiResponseEnum = useSelector(selectStatus);
    const sources: PreferenceItem[] = useSelector(selectSources) ?? [];
    const categories: PreferenceItem[] = useSelector(selectCategories) ?? [];

    const cancelToken = axios.CancelToken;
    const tokenSource = cancelToken.source();

    useEffect(() => {
        // @ts-ignore
        dispatch(getPreferences({cancelToken: tokenSource}));


    }, [dispatch])

    const handleSubmit = (
        values: {
            categories: any;
            sources: any;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _formikApi: any,
    ): void => {
        let {categories, sources} = values;
        categories = Object.keys(categories).filter(key => categories[key]);
        sources = Object.keys(sources).filter(key => sources[key]);
        // @ts-ignore
        dispatch(updatePreferences({
            preferences: {
                categories, sources
            }
            ,
            cancelToken: tokenSource
        }));
    };

    const fieldGroups: FieldGroup[] = [
        {
            title: 'Preferred Categories',
            className: 'flex flex-row gap-4 flex-wrap',
            fields: categories.map(category => ({
                id: 'categories.' + category.symbol,
                name: 'categories.' + category.symbol,
                label: '#' + category.text.toUpperCase(),
                placeholder: '',
                required: false,
                type: '',
                componentType: 'checkbox'
            }))
        },
        {
            title: 'Preferred Sources',
            className: 'flex flex-row gap-4 flex-wrap',
            fields: sources.map(source => ({
                id: 'sources.' + source.symbol,
                name: 'sources.' + source.symbol,
                label: source.text,
                placeholder: '',
                required: false,
                type: '',
                componentType: 'checkbox'
            }))
        }
    ];

    let initialValues = {
        sources: sources.reduce((acc: Record<string, boolean>, cur) => {
            acc[cur.symbol] = cur.checked;
            return acc;
        }, {}),
        categories: categories.reduce((acc: Record<string, boolean>, cur) => {
            acc[cur.symbol] = cur.checked;
            return acc;
        }, {}),
    };

    return <div className="md:container my-12 md:mx-auto items-center justify-center bg-cover">
        {categories.length !== 0 && sources.length !== 0 &&
            <NewsyForm className="flex flex-col gap-4" initialValues={initialValues} validationSchema={null}
                       handleSubmit={handleSubmit} fieldGroups={fieldGroups} tokenSource={tokenSource} error={null} loading={status === ApiResponseEnum.LOADING}/>
        }
    </div>;

}

export default Preferences;